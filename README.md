angular-float-labels
=====================

AngularJS implementation of [float labels](http://bradfrostweb.com/blog/post/float-label-pattern/)

Installation
---------
Bower:

    bower install angular-float-labels --save


Usage
---------
**app.js:**

    angular.module('myAwesomeApp', ['angular-float-labels'])
***
**form.html**

    <input type="text" placeholder="Enter some text"/>
    <input type="email" placeholder="Enter your email"/>
***

Customize
-------

### Attribute
If you do not want to the logic to trigger from the `placeholder` attribute, please include `angular-float-labels.custom.js` instead of `angular-float-labels.js` and configure the provider appropriately:

```
.config(function(floatLabelProvider) {
		floatLabelProvider.setAttributeName('floatLabel');
})
 ```


### CSS

Override CSS classes defined within angular-float-labels.css or simply do not include it and create them all yourself.


Example
---------
Please view the [demo](http://www.chrisronline.com/angular-float-labels/index.html)


Release Notes
---------
- v0.1.0 - Add support for a custom attribute instead of `placeholder`
- v0.0.7 - Fix validity check
- v0.0.6 - see v0.0.5
- v0.0.5 - Deprecated `ngModel` requirement and removed unnecessary lodash/underscore dependency
- v0.0.4 - Fixing issue #1 and #2
- v0.0.3 - Adding main files to bower.json
- v0.0.2 - Fixing dependency versions
- v0.0.1 - Basic input support
