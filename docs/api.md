<a name="Easily"></a>

## Easily
Class that provides convenient functions for a Yeoman generator.

**Kind**: global class  

* [Easily](#Easily)
    * [new Easily(generator)](#new_Easily_new)
    * _instance_
        * [.greet(message)](#Easily+greet) ⇒ <code>[Easily](#Easily)</code>
        * [.confirmBeforeStart(message)](#Easily+confirmBeforeStart) ⇒ <code>[Easily](#Easily)</code>
        * [.checkForConfirmation()](#Easily+checkForConfirmation) ⇒ <code>boolean</code>
        * [.setResolver(resolve)](#Easily+setResolver) ⇒ <code>[Easily](#Easily)</code>
        * [.composeWithLocal(subgeneratorName, namespace, options)](#Easily+composeWithLocal) ⇒ <code>[Easily](#Easily)</code>
        * [.composeWithExternal(packageName, namespace, options)](#Easily+composeWithExternal) ⇒ <code>[Easily](#Easily)</code>
        * [.readTemplate(filePath, options)](#Easily+readTemplate) ⇒ <code>string</code>
        * [.readDestination(filePath, options)](#Easily+readDestination) ⇒ <code>string</code>
        * [.readTemplateJSON(filePath)](#Easily+readTemplateJSON) ⇒ <code>Object</code>
        * [.readDestinationJSON(filePath)](#Easily+readDestinationJSON) ⇒ <code>Object</code>
        * [.write(filePath, contents)](#Easily+write) ⇒ <code>[Easily](#Easily)</code>
        * [.writeJSON(filePath, contents, ...args)](#Easily+writeJSON) ⇒ <code>[Easily](#Easily)</code>
        * [.loadTemplate(filePath)](#Easily+loadTemplate) ⇒ <code>function</code>
        * [.extendJSON(filePath, contents, ...args)](#Easily+extendJSON) ⇒ <code>[Easily](#Easily)</code>
        * [.extendJSONWithTemplate(filePath, destPath, props, ...args)](#Easily+extendJSONWithTemplate) ⇒ <code>[Easily](#Easily)</code>
        * [.copy(filePath, destPath, options)](#Easily+copy) ⇒ <code>[Easily](#Easily)</code>
        * [.copyTemplate(filePath, destPath, props, ...args)](#Easily+copyTemplate) ⇒ <code>[Easily](#Easily)</code>
        * [.templateExists(filePath)](#Easily+templateExists) ⇒ <code>boolean</code>
        * [.destinationExists(filePath)](#Easily+destinationExists) ⇒ <code>boolean</code>
        * [.listTemplateFiles(pattern, ignore)](#Easily+listTemplateFiles) ⇒ <code>Array.&lt;string&gt;</code>
        * [.copyFiles(pattern, options)](#Easily+copyFiles) ⇒ <code>[Easily](#Easily)</code>
        * [.savePropsToConfig()](#Easily+savePropsToConfig) ⇒ <code>[Easily](#Easily)</code>
        * [.learnPrompts(prompts)](#Easily+learnPrompts) ⇒ <code>[Easily](#Easily)</code>
        * [.findPrompt(prompt)](#Easily+findPrompt) ⇒ <code>Object</code>
        * [.findPrompts(prompts)](#Easily+findPrompts) ⇒ <code>Array.&lt;object&gt;</code>
        * [.prompt(prompts, showWhenNoOptionWithTheSameName)](#Easily+prompt) ⇒ <code>Promise</code>
    * _static_
        * [.createGenerator(config)](#Easily.createGenerator) ⇒ <code>Generator</code>

<a name="new_Easily_new"></a>

### new Easily(generator)
Create an Easily object for the specified `generator`


| Param | Type | Description |
| --- | --- | --- |
| generator | <code>Generator</code> | the generator that this object is created for |

<a name="Easily+greet"></a>

### easily.greet(message) ⇒ <code>[Easily](#Easily)</code>
Show Yeoman's greeting

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | greeting message |

<a name="Easily+confirmBeforeStart"></a>

### easily.confirmBeforeStart(message) ⇒ <code>[Easily](#Easily)</code>
Add confirmation before proceeding

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | confirmation message |

<a name="Easily+checkForConfirmation"></a>

### easily.checkForConfirmation() ⇒ <code>boolean</code>
Check if the user has confirmed or not

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>boolean</code> - true if the user confirmed, false otherwise  
<a name="Easily+setResolver"></a>

### easily.setResolver(resolve) ⇒ <code>[Easily](#Easily)</code>
Set this to `require.resolve`
before using `composeWithLocal` or `composeWithExternal`
to resolve path correctly

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| resolve | <code>string</code> | [description] |

<a name="Easily+composeWithLocal"></a>

### easily.composeWithLocal(subgeneratorName, namespace, options) ⇒ <code>[Easily](#Easily)</code>
Compose with a local subgenerator within the same package

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| subgeneratorName | <code>string</code> | name of the subgenerator |
| namespace | <code>string</code> | namespace for the called generator to operate in |
| options | <code>Object</code> | options to pass to the generator |

<a name="Easily+composeWithExternal"></a>

### easily.composeWithExternal(packageName, namespace, options) ⇒ <code>[Easily](#Easily)</code>
Compose with a generator from another package

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| packageName | <code>string</code> | package name of the generator |
| namespace | <code>string</code> | namespace for the called generator to operate in. |
| options | <code>Object</code> | options to pass to the generator |

<a name="Easily+readTemplate"></a>

### easily.readTemplate(filePath, options) ⇒ <code>string</code>
Read template file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>string</code> - content of the file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within the template directory |
| options | <code>Object</code> | generator.fs.read's options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+readDestination"></a>

### easily.readDestination(filePath, options) ⇒ <code>string</code>
Read destination file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>string</code> - content of the file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |
| options | <code>Object</code> | generator.fs.read's options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+readTemplateJSON"></a>

### easily.readTemplateJSON(filePath) ⇒ <code>Object</code>
Read JSON file from template

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Object</code> - object parsed from the JSON file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within template directory |

<a name="Easily+readDestinationJSON"></a>

### easily.readDestinationJSON(filePath) ⇒ <code>Object</code>
Read JSON file from destination

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Object</code> - object parsed from the JSON file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |

<a name="Easily+write"></a>

### easily.write(filePath, contents) ⇒ <code>[Easily](#Easily)</code>
Write to destination

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |
| contents | <code>string</code> | content to write |

<a name="Easily+writeJSON"></a>

### easily.writeJSON(filePath, contents, ...args) ⇒ <code>[Easily](#Easily)</code>
Write contents to destination as JSON file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |
| contents | <code>Object</code> | content to write |
| ...args | <code>any</code> | additional options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+loadTemplate"></a>

### easily.loadTemplate(filePath) ⇒ <code>function</code>
Load template

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>function</code> - template function  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within template directory |

<a name="Easily+extendJSON"></a>

### easily.extendJSON(filePath, contents, ...args) ⇒ <code>[Easily](#Easily)</code>
Add more contents to destination JSON file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |
| contents | <code>Object</code> | content to write |
| ...args | <code>any</code> | additional arguments. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+extendJSONWithTemplate"></a>

### easily.extendJSONWithTemplate(filePath, destPath, props, ...args) ⇒ <code>[Easily](#Easily)</code>
Add more contents from the template file to the destination JSON file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | path of the template file within template directory |
| destPath | <code>string</code> | <code>null</code> | path of the destination file within destination directory |
| props | <code>Object</code> |  | properties to pass to the template |
| ...args | <code>any</code> |  | additional arguments. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+copy"></a>

### easily.copy(filePath, destPath, options) ⇒ <code>[Easily](#Easily)</code>
Copy file from template directory to destination directory

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | path of the template file within template directory |
| destPath | <code>string</code> | <code>null</code> | path of the destination file within destination directory. If omitted, will use the same path as filePath. |
| options | <code>Object</code> |  | additional options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+copyTemplate"></a>

### easily.copyTemplate(filePath, destPath, props, ...args) ⇒ <code>[Easily](#Easily)</code>
Create content based on a template in template directory and write to destination directory

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | path of the template file within template directory |
| destPath | <code>string</code> | <code>null</code> | path of the destination file within destination directory. If omitted, will use the same path as filePath. |
| props | <code>Object</code> |  | properties to pass to the template |
| ...args | <code>any</code> |  | additional arguments. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+templateExists"></a>

### easily.templateExists(filePath) ⇒ <code>boolean</code>
Check if the template file exists

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>boolean</code> - true if the file exists  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file in template directory |

<a name="Easily+destinationExists"></a>

### easily.destinationExists(filePath) ⇒ <code>boolean</code>
Check if the destination file exists

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>boolean</code> - true if the file exists  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file in destination directory |

<a name="Easily+listTemplateFiles"></a>

### easily.listTemplateFiles(pattern, ignore) ⇒ <code>Array.&lt;string&gt;</code>
List files in the template directory

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - array of file names relative to the template path  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | glob pattern for the files |
| ignore | <code>Array.&lt;string&gt;</code> | glob pattern(s) to ignore |

<a name="Easily+copyFiles"></a>

### easily.copyFiles(pattern, options) ⇒ <code>[Easily](#Easily)</code>
Copy files from template directory to destination directory.
Files with static content are copied directly.
Files with dynamic content are created using the template and given props.

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| pattern | <code>string</code> | glob pattern for the files |
| options | <code>Object</code> | options |
| options.ignore | <code>Array.&lt;string&gt;</code> | glob pattern(s) to ignore |
| options.dynamicFiles | <code>Array.&lt;string&gt;</code> | array of files with dynamic content (need templating) |
| options.props | <code>Object</code> | properties for creating dynamic content |

<a name="Easily+savePropsToConfig"></a>

### easily.savePropsToConfig() ⇒ <code>[Easily](#Easily)</code>
Save all props to configuration

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  
<a name="Easily+learnPrompts"></a>

### easily.learnPrompts(prompts) ⇒ <code>[Easily](#Easily)</code>
Learn new prompts

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| prompts | <code>Array.&lt;Object&gt;</code> | array of prompts |

<a name="Easily+findPrompt"></a>

### easily.findPrompt(prompt) ⇒ <code>Object</code>
Find prompt from the given prompt name. Return the given input if the the input is already an object.
Otherwise will look for known prompts with the given prompt.name and return it.

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Object</code> - The corresponding prompt  

| Param | Type | Description |
| --- | --- | --- |
| prompt | <code>string</code> &#124; <code>Object</code> | The prompt to look for |

<a name="Easily+findPrompts"></a>

### easily.findPrompts(prompts) ⇒ <code>Array.&lt;object&gt;</code>
Find prompts from the given list of prompt names.

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Array.&lt;object&gt;</code> - The corresponding prompts  

| Param | Type | Description |
| --- | --- | --- |
| prompts | <code>Array.&lt;(string\|object)&gt;</code> | The prompts to look for |

<a name="Easily+prompt"></a>

### easily.prompt(prompts, showWhenNoOptionWithTheSameName) ⇒ <code>Promise</code>
Show prompts and stored user input in `this.generator.props`

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Promise</code> - A promise returned from `generator.prompt`  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| prompts | <code>Array.&lt;(string\|object)&gt;</code> |  | prompts to show |
| showWhenNoOptionWithTheSameName | <code>Boolean</code> | <code>true</code> | If this is true, will only show a prompt when an option with the same name does not exist. |

<a name="Easily.createGenerator"></a>

### Easily.createGenerator(config) ⇒ <code>Generator</code>
Create a generator with the given config.
Similar to calling `generator.Base.extend()`,
but it will automatically includes easily helper during initializing phase
and save all props to config during configuring phase.

**Kind**: static method of <code>[Easily](#Easily)</code>  
**Returns**: <code>Generator</code> - a generator created from the given config  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Yeoman configuration that is usually passed to generator.Base.extend() |

**Example** *(General usage)*  
```js

module.exports = Easily.createGenerator({
  prompting: {
    // do something
  },
  writing: {
    // do something
  }
});
```
**Example** *(Advanced usage)*  
```js

// If the config overwrites any of these two phases
// (initializing, configuring),
// you will have to add these extra lines of code
// to maintain the same behavior.
module.exports = Easily.createGenerator({
  initializing: function () {
    this.easily = new Easily(this);
    // do the extra
  },
  ...
  configuring: function () {
    this.easily.savePropsToConfig();
    // do the extra
  },
  ...
});
```
