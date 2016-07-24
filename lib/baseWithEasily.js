const generator = require('yeoman-generator');
import Easily from './easily.js';

module.exports = generator.Base.extend({
  initializing: function () {
    this.easily = new Easily(this);
  },

  configuring: function () {
    this.easily.savePropsToConfig();
  }
});
