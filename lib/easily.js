const glob = require('glob');
const yosay = require('yosay');

import isObject from 'lodash/isObject.js';
import keyBy from 'lodash/keyBy.js';
import last from 'lodash/last.js';
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
   * @param  {string} namespace namespace for the called generator to operate in
   * @param  {object} options   options to pass to the generator
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
   * @param  {object} options     options to pass to the generator
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
   * @param  {object} options  generator.fs.read's options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {string}          content of the file
   */
  readTemplate(filePath, options) {
    return this.generator.fs.read(this.generator.templatePath(filePath), options);
  }

  /**
   * Read destination file
   * @param  {string} filePath path of the file within destination directory
   * @param  {object} options  generator.fs.read's options. See {@link https://github.com/sboudrias/mem-fs-editor|mem-fs-editor}
   * @return {string}          content of the file
   */
  readDestination(filePath, options) {
    return this.generator.fs.read(this.generator.destinationPath(filePath), options);
  }

  /**
   * Read JSON file from template
   * @param  {string} filePath path of the file within template directory
   * @return {object}          object parsed from the JSON file
   */
  readTemplateJSON(filePath) {
    return this.generator.fs.readJSON(this.generator.templatePath(filePath), {});
  }

  /**
   * Read JSON file from destination
   * @param  {string} filePath path of the file within destination directory
   * @return {object}          object parsed from the JSON file
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

  writeJSON(filePath, contents, ...args) {
    this.generator.fs.writeJSON(this.generator.destinationPath(filePath), contents, ...args);
    return this;
  }

  loadTemplate(filePath) {
    return template(this.generator.fs.read(this.generator.templatePath(filePath)));
  }

  extendJSON(filePath, contents, ...args) {
    this.generator.fs.extendJSON(this.generator.destinationPath(filePath), contents, ...args);
    return this;
  }

  extendJSONWithTemplate(filePath, destPath = null, props, ...args) {
    const template = this.loadTemplate(filePath);
    const partial = JSON.parse(template(props));
    return this.extendJSON(destPath || filePath, partial, ...args);
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

  listTemplateFiles(pattern, ignore) {
    const generator = this.generator;
    return glob
      .sync(generator.templatePath(pattern), {
        nodir: true,
        ignore: ignore ? ignore.map(ig => generator.templatePath(ig)) : null
      })
      .map(d => d.replace(generator.templatePath('') + '/', ''));
  }

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

export default Easily;
