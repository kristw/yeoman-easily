const yosay = require('yosay');

import isObject from 'lodash/isObject.js';
import keyBy from 'lodash/keyBy.js';
import last from 'lodash/last.js';
import pick from 'lodash/pick.js';
import template from 'lodash/template.js';

function isNotDefined(value) {
  return value === null || value === undefined;
}

class Easily {
  constructor(generator) {
    this.generator = generator;
    this.knownPrompts = {};
    this._confirmBeforeStart = false;
  }

  //---------------------------------------------------
  // confirmation
  //---------------------------------------------------

  greet(message) {
    if (!this.generator.options.skipGreeting) {
      this.generator.log(yosay(message));
    }
    return this;
  }

  confirmBeforeStart(message) {
    if (arguments.length === 0) {
      return this._confirmBeforeStart;
    }
    this._confirmBeforeStart = Boolean(message);
    this.confirmMessage = message;
    this.confirmField = 'use-' + this.generator.options.namespace;
    return this;
  }

  checkForConfirmation() {
    return this.confirmBeforeStart() ?
      this.generator.props[this.confirmField] : true;
  }

  //---------------------------------------------------
  // composeWith
  //---------------------------------------------------

  composeWithLocal(namespace, options) {
    const lastNamePart = last(namespace.split(':'));
    this.generator.composeWith(namespace, {
      options
    }, {
      local: require.resolve('../' + lastNamePart)
    });
    return this;
  }

  composeWithExternal(packageName, namespace, options) {
    this.generator.composeWith(namespace, {
      options
    }, {
      local: require.resolve(packageName)
    });
    return this;
  }

  //---------------------------------------------------
  // file handling
  //---------------------------------------------------

  readTemplate(filePath, options) {
    return this.generator.fs.read(this.generator.templatePath(filePath), options);
  }

  readDestination(filePath, options) {
    return this.generator.fs.read(this.generator.destinationPath(filePath), options);
  }

  readTemplateJSON(filePath) {
    return this.generator.fs.readJSON(this.generator.templatePath(filePath), {});
  }

  readDestinationJSON(filePath) {
    return this.generator.fs.readJSON(this.generator.destinationPath(filePath), {});
  }

  write(filePath, contents) {
    this.generator.fs.write(this.generator.destinationPath(filePath), contents);
    return this;
  }

  writeJSON(filePath, ...args) {
    this.generator.fs.writeJSON(this.generator.destinationPath(filePath), ...args);
    return this;
  }

  loadTemplate(filePath) {
    return template(this.generator.fs.read(this.generator.templatePath(filePath)));
  }

  extendJSON(filePath, ...args) {
    this.generator.fs.extendJSON(this.generator.destinationPath(filePath), ...args);
    return this;
  }

  extendJSONWithTemplate(filePath, props, ...args) {
    const template = this.loadTemplate(filePath);
    const partial = JSON.parse(template(props));
    return this.extendJSON(filePath, partial, ...args);
  }

  copy(filePath, destPath = null, options) {
    this.generator.fs.copy(
      this.generator.templatePath(filePath),
      this.generator.destinationPath(destPath || filePath),
      options
    );
    return this;
  }

  copyTemplate(filePath, destPath = null, ...args) {
    this.generator.fs.copyTpl(
      this.generator.templatePath(filePath),
      this.generator.destinationPath(destPath || filePath),
      ...args
    );
    return this;
  }

  templateExists(filePath) {
    return this.fs.exists(this.generator.templatePath(filePath));
  }

  destinationExists(filePath) {
    return this.fs.exists(this.generator.destinationPath(filePath));
  }

  // copyFiles(pattern, {ignore, rename, templates}) {
  //   // to implement
  //   return this;
  // }

  //---------------------------------------------------
  // config management
  //---------------------------------------------------

  savePropsToConfig() {
    this.generator.config.set(
      this.generator.options.namespace,
      this.generator.props
    );
    return this;
  }

  //---------------------------------------------------
  // prompts management
  //---------------------------------------------------

  learnPrompts(prompts) {
    this.knownPrompts = Object.assign(this.knownPrompts, keyBy(prompts, p => p.name));
    return this;
  }

  findPrompt(prompt) {
    return isObject(prompt) ? prompt : this.knownPrompts[prompt];
  }

  findPrompts(prompts) {
    return prompts.map(p => this.findPrompt(p));
  }

  prompt(prompts = [], showWhenNoOptionWithTheSameName = true) {
    const generator = this.generator;
    const confirmField = this.confirmField;

    let toPrompts = this.findPrompts(prompts);

    if (showWhenNoOptionWithTheSameName) {
      toPrompts = toPrompts
        .filter(p => isNotDefined(generator.options[p.name]));
    }

    if (this.confirmBeforeStart()) {
      const isNotConfirmed = isNotDefined(generator.options[confirmField]);
      const isConfirmed = !isNotConfirmed;

      toPrompts = toPrompts
        .map(p => Object.assign({}, p, {
          when: hash => isConfirmed || hash[confirmField]
        }));

      if (isNotConfirmed) {
        toPrompts.unshift({
          type: 'confirm',
          name: confirmField,
          message: this.confirmMessage,
          default: true
        });
      }
    }

    const fields = prompts.map(p => p.name);
    const propsFromOptions = pick(generator.options, fields);

    return generator.prompt(toPrompts)
      .then(props => {
        // Make a copy
        const newProps = Object.assign({}, generator.props);
        if (confirmField) {
          newProps[confirmField] = Boolean(generator.options[confirmField]);
        }
        // Attach props to the generator;
        generator.props = Object.assign(newProps, propsFromOptions, props);
      });
  }
}

export default Easily;
