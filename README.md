# yeoman-easily [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

This library was created to facilitate the following tasks when creating a generator with Yeoman:

- **Confirmation**:
	- Can ask for confirmation before proceeding in one line. `easily.confirmBeforeStart(message)`
	- `easily.checkForConfirmation()` simply returns the result.
- **Prompting**:
	- Handle storing user's input from the prompts into `this.props`. Just call `easily.prompt(prompts)` instead of the `this.prompt(prompts, ...)`
	- Can automatically skip prompts if an option with the same name is presence. It will instead copy the value of existing `this.option[field]` into `this.props[field]`.
	- Can register common prompts and allow looking up prompts by name. This can save a lot of time if you create a few generators that ask similar questions.
- **Composing**: with another generator, either local or external
	- Simplify the syntax to `easily.composeWithLocal(name, namespace, options)` and `easily.composeWithExternal(package, namespace, options)`
- **File handling**:
	- Provide functions for mass copying both static and dynamic files based on glob pattern. See `easily.copyFiles(...)`
	- Provide I/O functions that wraps `this.fs.xxx` and also resolve *template* and *destination* directory.
- **Method chaining**: yeoman-easily was created with chaining in mind and support method chaining for fluent coding.

## Installation

```sh
$ npm install --save yeoman-easily
```

## Example Usage

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
        )
        .copyFiles('**/*', {
         ignore: '**/__*',
          dynamicFiles: [
            'src/index.html',
            'gulpfile.babel.js',
            'README.md'
          ],
          props: props
        })
        .composeWithExternal(
          'generator-summon/generators/github',
          'summon:github',
          {
            skipGreeting: true,
            name: this.props.name,
            githubAccount: this.props.githubAccount
          }
        );
    }
  },

  install: function () {
    this.installDependencies();
  }
});

```

## More resources

- See [full API documentation](https://github.com/kristw/yeoman-easily/blob/master/docs/api.md)
- An example generator that uses yeoman-easily heavily is [generator-summon](https://github.com/kristw/generator-summon)
- For convenience, you can use [generator-easily](https://github.com/kristw/generator-easily) instead of the standard [generator-generator](https://github.com/yeoman/generator-generator) to create a new *generator* or *subgenerator*. The created generator/subgenerator will include code for using yeoman-easily by default.

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
