# yeoman-easily [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Ways to use yeoman more easily

## Installation

```sh
$ npm install --save yeoman-easily
```

## Usage

```js
'use strict';

var ye = require('yeoman-easily');
var Easily = ye.Easily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awesome generator!')
      .confirmBeforeStart('Would you like to use bower?')
      .learnPrompts(commonPrompts)
      .prompt([
        'name',
        'description',
        'authorName',
        'authorEmail',
        'authorUrl',
        'githubAccount'
      ], true);
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json',
          this.props
        )
        .extendJSONWithTemplate(
          '__bower.json',
          'bower.json',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies();
  }
});

```

## API Documenation

See [documentation](docs/api.md)

## Generator

For convenience, you can use [generator-easily](https://github.com/kristw/generator-easily) instead of the standard [generator-generator](https://github.com/yeoman/generator-generator) to create a new generator or subgenerator. The created generator/subgenerator will include code for using yeoman-easily by default.

## License

Apache-2.0 © [Krist Wongsuphasawat](http://kristw.yellowpigz.com)


[npm-image]: https://badge.fury.io/js/yeoman-easily.svg
[npm-url]: https://npmjs.org/package/yeoman-easily
[travis-image]: https://travis-ci.org/kristw/yeoman-easily.svg?branch=master
[travis-url]: https://travis-ci.org/kristw/yeoman-easily
[daviddm-image]: https://david-dm.org/kristw/yeoman-easily.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kristw/yeoman-easily
[coveralls-image]: https://coveralls.io/repos/kristw/yeoman-easily/badge.svg
[coveralls-url]: https://coveralls.io/r/kristw/yeoman-easily
