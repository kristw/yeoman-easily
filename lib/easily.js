const deepExtend = require('deep-extend');

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

  confirmBeforeStart(message) {
    if (arguments.length === 0) {
      return this._confirmBeforeStart;
    }
    this._confirmBeforeStart = Boolean(message);
    this.confirmMessage = message;
    this.confirmField = 'confirm-' + this.generator.options.namespace;
    return this;
  }

  isConfirmed() {
    return this.confirmBeforeStart() ?
      this.generator.props[this.confirmField] : true;
  }

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

  readJsonFromDestination(fileName) {
    return this.generator.fs.readJSON(this.generator.destinationPath(fileName), {});
  }

  loadTemplate(fileName) {
    return template(this.generator.fs.read(this.generator.templatePath(fileName)));
  }

  extendJson(fileName, partial) {
    const pkg = deepExtend(this.readJsonFromDestination(fileName), partial);
    return this.writeJson(fileName, pkg);
  }

  extendJsonWithTemplateFile(generator, fileName, props) {
    const template = this.loadTemplate(fileName);
    const partial = JSON.parse(template(props));
    return this.extendJson(generator, fileName, partial);
  }

  writeJson(fileName, value) {
    this.generator.fs.writeJSON(
      this.generator.destinationPath(fileName),
      value
    );
    return this;
  }

  // copyFiles(pattern, {ignore, rename, dynamic}) {
  //   // to implement
  //   return this;
  // }

  savePropsToConfig() {
    this.generator.config.set(
      this.generator.options.namespace,
      this.generator.props
    );
  }

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
