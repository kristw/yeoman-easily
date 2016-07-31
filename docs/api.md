<a name="Easily"></a>

## Easily
Class that provides convenient functions for a Yeoman generator.

**Kind**: global class  

* [Easily](#Easily)
    * [new Easily(generator)](#new_Easily_new)
    * [.greet(message)](#Easily+greet) ⇒ <code>[Easily](#Easily)</code>
    * [.confirmBeforeStart(message)](#Easily+confirmBeforeStart) ⇒ <code>[Easily](#Easily)</code>
    * [.checkForConfirmation()](#Easily+checkForConfirmation) ⇒ <code>boolean</code>
    * [.setResolver(resolve)](#Easily+setResolver) ⇒ <code>[Easily](#Easily)</code>
    * [.composeWithLocal(namespace, options)](#Easily+composeWithLocal) ⇒ <code>[Easily](#Easily)</code>
    * [.composeWithExternal(packageName, namespace, options)](#Easily+composeWithExternal) ⇒ <code>[Easily](#Easily)</code>
    * [.readTemplate(filePath, options)](#Easily+readTemplate) ⇒ <code>string</code>
    * [.readDestination(filePath, options)](#Easily+readDestination) ⇒ <code>string</code>
    * [.readTemplateJSON(filePath)](#Easily+readTemplateJSON) ⇒ <code>object</code>
    * [.readDestinationJSON(filePath)](#Easily+readDestinationJSON) ⇒ <code>object</code>
    * [.write(filePath, contents)](#Easily+write) ⇒ <code>[Easily](#Easily)</code>
    * [.savePropsToConfig()](#Easily+savePropsToConfig) ⇒ <code>[Easily](#Easily)</code>

<a name="new_Easily_new"></a>

### new Easily(generator)
Create an Easily object for the specified generator


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
Set this to require.resolve
before using composeWithLocal or composeWithExternal
to resolve path correctly

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| resolve | <code>string</code> | [description] |

<a name="Easily+composeWithLocal"></a>

### easily.composeWithLocal(namespace, options) ⇒ <code>[Easily](#Easily)</code>
Compose with a local generator within the same package

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>string</code> | namespace for the called generator to operate in |
| options | <code>object</code> | options to pass to the generator |

<a name="Easily+composeWithExternal"></a>

### easily.composeWithExternal(packageName, namespace, options) ⇒ <code>[Easily](#Easily)</code>
Compose with a generator from another package

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| packageName | <code>string</code> | package name of the generator |
| namespace | <code>string</code> | namespace for the called generator to operate in |
| options | <code>object</code> | options to pass to the generator |

<a name="Easily+readTemplate"></a>

### easily.readTemplate(filePath, options) ⇒ <code>string</code>
Read template file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>string</code> - content of the file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within the template directory |
| options | <code>object</code> | generator.fs.read's options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+readDestination"></a>

### easily.readDestination(filePath, options) ⇒ <code>string</code>
Read destination file

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>string</code> - content of the file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within destination directory |
| options | <code>object</code> | generator.fs.read's options. See [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) |

<a name="Easily+readTemplateJSON"></a>

### easily.readTemplateJSON(filePath) ⇒ <code>object</code>
Read JSON file from template

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>object</code> - object parsed from the JSON file  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | path of the file within template directory |

<a name="Easily+readDestinationJSON"></a>

### easily.readDestinationJSON(filePath) ⇒ <code>object</code>
Read JSON file from destination

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>object</code> - object parsed from the JSON file  

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

<a name="Easily+savePropsToConfig"></a>

### easily.savePropsToConfig() ⇒ <code>[Easily](#Easily)</code>
Save all props to configuration

**Kind**: instance method of <code>[Easily](#Easily)</code>  
**Returns**: <code>[Easily](#Easily)</code> - this  
