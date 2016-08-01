const generator = require('yeoman-generator');
const glob = require('glob');
const yosay = require('yosay');

import isObject from 'lodash/isObject.js';
import keyBy from 'lodash/keyBy.js';
import pick from 'lodash/pick.js';
import template from 'lodash/template.js';
import {isNotDefined} from './util.js';

/** Class that provides convenient functions for a Yeoman generator. */
class Easily {
  /**
   * Create an Easily object for the specified generator
   * @param  {Generator} generator the generator that this object is created for
   * @return {Easily}              the created Easily object
   */
  constructor(generator) {
    this.generator = generator;
    this._confirmBeforeStart = false;
    this.knownPrompts = {};
    this.resolve = function () {
      throw new Error('Please set the resolver by calling .setResolver(require.resolve)');
    };
  }

  //---------------------------------------------------
  // confirmation
  //---------------------------------------------------

  /**
   * Show Yeoman's greeting
   * @param  {string} message greeting message
   * @return {Easily}         this
   */
  greet(message) {
    if (!this.generator.options.skipGreeting) {
      this.generator.log(yosay(message));
    }
    return this;
  }

  /**
   * Add confirmation before proceeding
   * @param  {string} message confirmation message
   * @return {Easily}         this
   */
  confirmBeforeStart(message) {
    if (arguments.length === 0) {
      return this._confirmBeforeStart;
    }
    this._confirmBeforeStart = Boolean(message);
    this.confirmMessage = message;
    this.confirmField = 'use-' + this.generator.options.namespace;
    return this;
  }

  /**
   * Check if the user has confirmed or not
   * @return {boolean} true if the user confirmed, false otherwise
   */
  checkForConfirmation() {
    return this.confirmBeforeStart() ?
      this.generator.props[this.confirmField] : true;
  }

  //---------------------------------------------------
  // composeWith
  //---------------------------------------------------

  /**
   * Set this to require.resolve
   * before using composeWithLocal or composeWithExternal
   * to resolve path correctly
   * @param {string} resolve [description]
   * @return {Easily}         this
   */
  setResolver(resolve) {
    this.resolve = resolve;
    return this;
  }

  /**
   * Compose with a local subgenerator within the same package
   * @param  {string} subgeneratorName name of the subgenerator
   * @param  {string} namespace namespace for the called generator to operate in
   * @param  {Object} options   options to pass to the generator
   * @return {Easily}           this
   */
  composeWithLocal(subgeneratorName, namespace, options) {
    this.generator.composeWith(namespace, {
      options: Object.assign({}, this.generator.options, options)
    }, {
      local: this.resolve('../' + subgeneratorName)
    });
    return this;
  }

  /**
   * Compose with a generator from another package
   * @param  {string} packageName package name of the generator
   * @param  {string} namespace   namespace for the called generator to operate in.
   * @param  {Object} options     options to pass to the generator
   * @return {Easily}             this
   */
  composeWithExternal(packageName, namespace, options) {
    this.generator.composeWith(namespace, {
      options: Object.assign({}, this.generator.options, options)
    }, {
      local: this.resolve(packageName)
    });
    return this;
  }

  //---------------------------------------------------
  // file handling
  //---------------------------------------------------

  /**
   * Read template file
   * @param  {string} filePath path of the file within the template directory
   * @param  {Object} options  generator.fs.read's options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {string}          content of the file
   */
  readTemplate(filePath, options) {
    return this.generator.fs.read(this.generator.templatePath(filePath), options);
  }

  /**
   * Read destination file
   * @param  {string} filePath path of the file within destination directory
   * @param  {Object} options  generator.fs.read's options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {string}          content of the file
   */
  readDestination(filePath, options) {
    return this.generator.fs.read(this.generator.destinationPath(filePath), options);
  }

  /**
   * Read JSON file from template
   * @param  {string} filePath path of the file within template directory
   * @return {Object}          object parsed from the JSON file
   */
  readTemplateJSON(filePath) {
    return this.generator.fs.readJSON(this.generator.templatePath(filePath), {});
  }

  /**
   * Read JSON file from destination
   * @param  {string} filePath path of the file within destination directory
   * @return {Object}          object parsed from the JSON file
   */
  readDestinationJSON(filePath) {
    return this.generator.fs.readJSON(this.generator.destinationPath(filePath), {});
  }

  /**
   * Write to destination
   * @param  {string} filePath path of the file within destination directory
   * @param  {string} contents content to write
   * @return {Easily}          this
   */
  write(filePath, contents) {
    this.generator.fs.write(this.generator.destinationPath(filePath), contents);
    return this;
  }

  /**
   * Write contents to destination as JSON file
   * @param  {string} filePath path of the file within destination directory
   * @param  {Object} contents content to write
   * @param  {...any} args     additional options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {Easily}          this
   */
  writeJSON(filePath, contents, ...args) {
    this.generator.fs.writeJSON(this.generator.destinationPath(filePath), contents, ...args);
    return this;
  }

  /**
   * Load template
   * @param  {string} filePath path of the file within template directory
   * @return {function}        template function
   */
  loadTemplate(filePath) {
    return template(this.generator.fs.read(this.generator.templatePath(filePath)));
  }

  /**
   * Add more contents to destination JSON file
   * @param  {string} filePath path of the file within destination directory
   * @param  {Object} contents content to write
   * @param  {...any} args     additional arguments. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {Easily}          this
   */
  extendJSON(filePath, contents, ...args) {
    this.generator.fs.extendJSON(this.generator.destinationPath(filePath), contents, ...args);
    return this;
  }

  /**
   * Add more contents from the template file to the destination JSON file
   * @param  {string} filePath path of the template file within template directory
   * @param  {string} destPath path of the destination file within destination directory
   * @param  {Object} props    properties to pass to the template
   * @param  {...any} args     additional arguments. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {Easily}          this
   */
  extendJSONWithTemplate(filePath, destPath = null, props, ...args) {
    const template = this.loadTemplate(filePath);
    const partial = JSON.parse(template(props));
    return this.extendJSON(destPath || filePath, partial, ...args);
  }

  /**
   * Copy file from template directory to destination directory
   * @param  {string} filePath path of the template file within template directory
   * @param  {string} destPath path of the destination file within destination directory. If omitted, will use the same path as filePath.
   * @param  {Object} options  additional options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {Easily}          this
   */
  copy(filePath, destPath = null, options) {
    this.generator.fs.copy(
      this.generator.templatePath(filePath),
      this.generator.destinationPath(destPath || filePath),
      options
    );
    return this;
  }

  /**
   * Create content based on a template in template directory and write to destination directory
   * @param  {string} filePath path of the template file within template directory
   * @param  {string} destPath path of the destination file within destination directory. If omitted, will use the same path as filePath.
   * @param  {Object} props    properties to pass to the template
   * @param  {...any} args     additional arguments. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {Easily}          this
   */
  copyTemplate(filePath, destPath = null, props, ...args) {
    this.generator.fs.copyTpl(
      this.generator.templatePath(filePath),
      this.generator.destinationPath(destPath || filePath),
      props,
      ...args
    );
    return this;
  }

  /**
   * Check if the template file exists
   * @param  {string} filePath path of the file in template directory
   * @return {boolean}         true if the file exists
   */
  templateExists(filePath) {
    return this.fs.exists(this.generator.templatePath(filePath));
  }

  /**
   * Check if the destination file exists
   * @param  {string} filePath path of the file in destination directory
   * @return {boolean}         true if the file exists
   */
  destinationExists(filePath) {
    return this.fs.exists(this.generator.destinationPath(filePath));
  }

  /**
   * List files in the template directory
   * @param  {string} pattern       glob pattern for the files
   * @param  {Array.<string>} ignore  glob pattern(s) to ignore
   * @return {Array.<string>}         array of file names relative to the template path
   */
  listTemplateFiles(pattern, ignore) {
    const generator = this.generator;
    return glob
      .sync(generator.templatePath(pattern), {
        nodir: true,
        ignore: ignore ? ignore.map(ig => generator.templatePath(ig)) : null
      })
      .map(d => d.replace(generator.templatePath('') + '/', ''));
  }

  /**
   * Copy files from template directory to destination directory.
   * Files with static content are copied directly.
   * Files with dynamic content are created using the template and given props.
   * @param  {string} pattern              glob pattern for the files
   * @param  {Array.<string>}  options.ignore       glob pattern(s) to ignore
   * @param  {Array.<string>}  options.dynamicFiles array of files with dynamic content (need templating)
   * @param  {Object} options.props        properties for creating dynamic content
   * @return {Easily}          this
   */
  copyFiles(pattern, {ignore = [], dynamicFiles = [], props} = {}) {
    const staticFiles = this.listTemplateFiles(
      pattern,
      dynamicFiles.concat(ignore)
    );

    staticFiles.forEach(file => this.copy(file));
    dynamicFiles.forEach(file => {
      this.copyTemplate(file, file, props);
    });

    return this;
  }

  //---------------------------------------------------
  // config management
  //---------------------------------------------------

  /**
   * Save all props to configuration
   * @return {Easily} this
   */
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

  /**
   * Learn new prompts
   * @param  {Array.<Object>} prompts array of prompts
   * @return {Easily} this
   */
  learnPrompts(prompts) {
    this.knownPrompts = Object.assign(this.knownPrompts, keyBy(prompts, p => p.name));
    return this;
  }

  /**
   * Find prompt from the given prompt name. Return the given input if the the input is already an object.
   * Otherwise will look for known prompts with the given prompt.name and return it.
   * @param  {string|Object} prompt The prompt to look for
   * @return {Object}        The corresponding prompt
   */
  findPrompt(prompt) {
    return isObject(prompt) ? prompt : this.knownPrompts[prompt];
  }

  /**
   * Find prompts from the given list of prompt names.
   * @param  {Array.<string|object>} prompts The prompts to look for
   * @return {Array.<object>}         The corresponding prompts
   */
  findPrompts(prompts) {
    return prompts.map(p => this.findPrompt(p));
  }

  /**
   * Show prompts and stored user input in `generator.props`
   * @param  {Array.<string|object>}   prompts         prompts to show
   * @param  {Boolean} showWhenNoOptionWithTheSameName If this is true, will only show a prompt when an option with the same name does not exist.
   * @return {Promise}                                 A promise returned from `generator.prompt`
   */
  prompt(prompts = [], showWhenNoOptionWithTheSameName = true) {
    const generator = this.generator;
    const confirmField = this.confirmField;

    const resolvedPrompts = this.findPrompts(prompts);
    let toPrompts = resolvedPrompts.concat();

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

    const fields = resolvedPrompts.map(p => p.name);
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

/**
 * Create a generator with the given config.
 * Similar to calling `generator.Base.extend()`,
 * but it will automatically includes easily helper during initializing phase
 * and save all props to config during configuring phase.
 * If the config overwrites any or these two phase, you will have to add these extra lines of code
 * to maintain the same behavior.
 * @param  {object} config Yeoman configuration that is usually passed to generator.Base.extend()
 * @return {Generator}     a generator created from the given config
 */
Easily.createGenerator = function (config) {
  return generator.Base.extend(Object.assign({
    initializing: function () {
      this.easily = new Easily(this);
    },

    configuring: function () {
      this.easily.savePropsToConfig();
    }
  }, config));
};

export default Easily;
