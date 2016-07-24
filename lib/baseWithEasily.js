const generator = require('yeoman-generator');
import Easily from './easily.js';

module.exports = {
  extend(config) {
    return generator.Base.extend(Object.assign({
      initializing: function () {
        this.easily = new Easily(this);
      },

      configuring: function () {
        this.easily.savePropsToConfig();
      }
    }, config));
  }
};
