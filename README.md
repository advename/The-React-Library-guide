# :construction: Under construction :construction:
This repo is under construction.

#### For the incoming reviewers, here are some bullet points:
-  feel free to fork and make change requests
-  nothing has to stay, everything may be updated
-  As for now, I used inline footnotes, e.g. `^[[Text for footnote](www.example.com)]`, which unfortunately are not supported in GitHub. I'll fix this in the next days
-  English is my fourth language, permission granted to mock my English :D
-  If terms are used incorrectly, please point me out
-  I aimed for a `package.json` with `"type":"commonjs"` - thereby providing the greatest compatibility for older Node.js versions. What are your thoughts on the "goal package.json".
-  Cherry picking may be erroneous and needs rework - or please point me out to what Cherry picking actually refers to.
-  The code examples are not finalized yet - please ignore the files in `my-lib` and `my-app`. I'm still playing around with them.
-  Please pour as much knowledge as possible into this guide - as it will not only help me, but likely the whole dev community (okay, okay,... I'll jump off my high horse now)
-  And, thank you all so much for answering questions, the support and the time taken to look over it! Regardless of how much you will contribute from now on, I'll add any single one of you guys to the Contributors section during the release (unless inform me not to shame your name)



# The open source Node.js/React library guide
Building a Node.js package is no easy task and requires some foundation knowledge. Existing articles and guides often omit the thoughts and reasons behind decisions, making it harder to debug or implement new features.

This open-source guide aims at closing down this gap, by clarifying topics required to understand later thoughts.

At the end of this guide, you're able to build a Node.js/React library with:
- ES, CJS, UMD, AMD, IIFE modules support
- React and Typescript support  (`.js`,  `.jsx`,  `.ts`, `.tsx`, ...)
- handling images
- handling styling
- minification

> This guide uses "library" and "package" interchangeably. After all, a React library is a Node package, hosted on a package registry like [www.npmjs.com](https://www.npmjs.com/).

# Table of contents

- [:construction: Under construction :construction:](#construction-under-construction-construction)
      - [For the incoming reviewers, here are some bullet points:](#for-the-incoming-reviewers-here-are-some-bulletpoints)
- [The open source Node.js/React library guide](#the-open-source-nodejsreact-library-guide)
- [Table of contents](#table-of-contents)
- [1.0.0 – Foundation](#100--foundation)
  - [1.1.0 – JavaScript Environments](#110--javascript-environments)
  - [1.2.0 – JavaScript Modules](#120--javascript-modules)
    - [1.2.1 – Module Systems](#121--module-systems)
    - [1.2.2 – Syntaxes](#122--syntaxes)
      - [IIFE](#iife)
      - [CJS](#cjs)
      - [AMD](#amd)
      - [UMD](#umd)
      - [ESM](#esm)
    - [1.2.3 – Dynamic vs Static module loading](#123--dynamic-vs-static-module-loading)
      - [Import specifiers](#import-specifiers)
      - [ES2020 Dynamic `import()` function](#es2020-dynamic-import-function)
      - [Import CJS modules to ESM files](#import-cjs-modules-to-esm-files)
      - [Import ESM modules to CJS files](#import-esm-modules-to-cjs-files)
      - [Interoperability, named and default Exports](#interoperability-named-and-default-exports)
  - [1.3.0 – Build aspects](#130--build-aspects)
    - [1.3.1 – Code splitting](#131--code-splitting)
    - [1.3.2 – Tree shaking](#132--tree-shaking)
    - [1.3.3 – Side Effect](#133--side-effect)
      - [Side effect in a Bundler and React](#side-effect-in-a-bundler-and-react)
    - [1.3.4 – Cherry-picking (WIP)](#134--cherry-picking-wip)
    - [1.3.5 – Dependency types](#135--dependency-types)
- [2.0.0 – Serving a library](#200--serving-a-library)
  - [2.1.0 – How does a library work?](#210--how-does-a-library-work)
    - [2.0.1 – Multi module libraries](#201--multi-module-libraries)
      - [The `exports` field](#the-exports-field)
      - [Dual package hazards](#dual-package-hazards)
    - [2.1.2 – What to expose?](#212--what-to-expose)
      - [Inspecting libraries](#inspecting-libraries)
- [3.0.0 – Building the library](#300--building-the-library)
    - [3.0.1 – Setting up the demo library](#301--setting-up-the-demo-library)
      - [Structure](#structure)
      - [The `package.json` file](#the-packagejson-file)
      - [Dependencies](#dependencies)
      - [The `tsconfig.json` file](#the-tsconfigjson-file)
      - [File contents](#file-contents)
      - [Default exports?](#default-exports)
  - [3.1.0 – Bundling and Transpiling](#310--bundling-and-transpiling)
    - [3.1.1 – Is a bundler needed?](#311--is-a-bundler-needed)
    - [3.1.2 – Tools](#312--tools)
      - [Transpilers](#transpilers)
      - [Bundlers](#bundlers)
  - [3.2.0 – The build](#320--the-build)
    - [3.2.1 – Step 1 – Update the `tsconfig.json`](#321--step-1--update-the-tsconfigjson)
    - [3.2.2 – Step 2 – Transpile with Babel](#322--step-2--transpile-with-babel)
    - [3.2.3 – Step 3 – Bundle with Rollup](#323--step-3--bundle-with-rollup)
      - [Dependencies](#dependencies-1)
      - [Configuration](#configuration)
      - [Fixing dependency types](#fixing-dependency-types)
      - [External and Globals](#external-and-globals)
      - [To bundle or not to bundle dependencies](#to-bundle-or-not-to-bundle-dependencies)
    - [3.2.4 – Step 4 – npm-scripts](#324--step-4--npm-scripts)
    - [3.2.5 – Step 5 – Expose the bundles](#325--step-5--expose-the-bundles)
  - [3.3.0 – Additional Steps](#330--additional-steps)
    - [3.3.1 – Images](#331--images)
    - [3.3.2 – Styling](#332--styling)
      - [SASS/LESS](#sassless)
      - [CSS Modules](#css-modules)
    - [3.3.3 – Optimization](#333--optimization)
- [4.0.0 – Development Environment](#400--development-environment)
    - [4.0.1 – Local Development](#401--local-development)
      - [Demo application](#demo-application)
      - [Component Development Tool](#component-development-tool)
      - [Include in real application](#include-in-real-application)

# 1.0.0 – Foundation
It's suggested to read through the following subjects, even if you already know about some of them, as we're going to cover some more in detail.

## 1.1.0 – JavaScript Environments
Historically, JavaScript (JS) was created in 1995^[[JavaScript | wikipedia.com](https://en.wikipedia.org/wiki/JavaScript#History)], to provide interactivity to the Netscape browser. A decade later and JavaScript was *the standard* for web browsers like Internet Explorer, Firefox, Chrome, Safari, … . Even though that JavaScript worked perfectly fine in the browser at that time, it did not provide a great development experience. This led to the creation of developer tools which improved said experience by adding a modular system to the browser.

> **Terminology**
> - **Modular system** Instead of having one large JavaScript file, split it up in several smaller ones and use the methods/values accross the files. The next section explains this topic in more detail.
> - **Bundler** is a tool that "bundles" (= combines) and optimizes multiple files into one or more file(s) that which are better suited for production environments. E.g. *webpack*, *rollup*, *esbuild*, *Browserify* are bundlers
> - **Compilers** and **Transpilers** are nearly the same tool types, that transform code from one language or a different version of the same language. Sometimes they are called *Transcompilers*
E.g. *Babel* or *Typescript* are compiler/transpilers
> - **Module Loader** is a tool that "loads" modules of a certain module system type such as AMD, manages their dependencies and executes the application. E.g. *RequireJS* is a module loader

Around the same time in 2009, Node.js was born, bringing JavaScript to the server side and evolved into being the most popular *back-end JavaScript runtime environment*.

In this context, one can think of Node.js and Browserify as being the same, where the latter *"brings `npm` to the browser"*. RequireJS is a tool only used in the browser, bringing a modular system to the browser that can load dependencies asynchronously.

Why am I saying all of this? Because it's important to know where your React package may end up being used.
- **Browsers** - most browsers understand modern JavaScript (ES6), that you're programming in, e.g., `import React from "react"`. Still, 5% of the world browsers don't fully understand modern JavaScript^[[JavaScript modules canisue import](https://caniuse.com/es6-module)]. It's debatable if one should support these 5% too, since they already have a bunch of overheads (e.g a [polyfiller](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)) to run React all together. In any case, the alternative is using older JavaScript (ES5) which 99% of the browsers support. ^[[ECMAScript 5 \| Can I use... Support tables for HTML5, CSS3, etc.](https://caniuse.com/es5)]
- **Node.js** has several versions^[[Previous Releases \| Node.js](https://nodejs.org/en/download/releases/)] where v16 is latest recommended one (at the date of writing, December 2021). Yet there's still a large quantity using older versions due to migration difficulties in legacy systems. Older versions, meaning prior to version 13.2.0 ^[ES6 Module support available [Node v13.2.0 (Current) \| Node.js](https://nodejs.org/en/blog/release/v13.2.0/)], Node.js only supported ECMAScript5 JavaScript^[[Previous Releases \| Node.js](https://nodejs.org/en/download/releases/)] ^[[Node By Numbers 2020 - NodeSource](https://nodesource.com/blog/node-by-numbers-2020)] and `const x = require(x)` instead of `import X from "x";`
- **RequireJS** has still a mention worthy usage^[[RequireJS Usage Statistics](https://trends.builtwith.com/javascript/RequireJS)] which, however, is tiny compared to the rest of the JavaScript realm.

With this in mind, the next section introduces the different JavaScript module systems and looks at the integration or compatibility of these, in ***Old Browsers*** (ES5), ***New Browsers*** (ES6), ***Old Node.js*** (before version 13.2.0) and ***New Node.js*** (after version 13.2.0) and ***RequireJS***.

## 1.2.0 – JavaScript Modules
Because that the size of these codes grown bigger and more complex in the past years, it made sense to split up JavaScript code into separate modules that can be imported when needed.^[[JavaScript modules | developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)]

Meaning, a Browser application that imports several script files
```html
<script src="main.js"></script>
<script src="shop.js"></script>
<script src="cart.js"></script>
...
```
produces several issues:
- All variables and functions names are exposed to the global scope (sometimes known as the namespace or global window object). E.g., if each file had a function named `function init(){...}`, then we would run into conflicts.
- The scripts must be loaded in correct order. E.g., *cart.js* has a variable with an array that keeps' track of the items in the cart. *shop.js*, which loads before *cart.js*, uses that array variable to display an "Add again" instead of "Buy" button.
- Becomes difficult to manage, even more when adding third-party packages, and so even more when these have peer dependencies. E.g. Bootstrap depended on jQuery until version 5.^[[Introduction · Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)]

### 1.2.1 – Module Systems

The basic concepts of a module system was to apply the following patterns:
- encapsulate code, so that the code is only available on a local scope
- define an interface, through which we can access code from a different location

| Module System | Appearance | Description | Integration |
| ------------- | ---------- | ----------- | ----------- |
| **[Immediately Invoked Function Expression(IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)** | ~2010  | <br/> • exports only if defined to global scope <br/> • also known as a self executing anonymous function  | Works in all JavaScript environments  <br/>**Old Node.js**✅ <br/> **New Node.js**✅ <br/>**Old Browsers**✅ <br/>**New Browsers**✅<br/> **RequireJS**✅  |
| **[CommonJS (CJS)](http://wiki.commonjs.org/wiki/CommonJS)**   | 2009  | • exports with `module.exports` <br/> • imports with `require()` <br/> • synchronous module loading <br/> • designed for general purpose JavaScript environment^[Book, [Secrets of the JavaScript Ninja, Second Edition](https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition), Chapter 11.1.2] <br/> • implemented in Node.js and therefore received the saying that it's the "server side" format <br/> • CJS code is exposed to a local scope and does not pollute the global scope  | **Old Node.js**✅ <br/> • integrated by default ^[[Modules: CommonJS modules \| Node.js v17.2.0 Documentation](https://nodejs.org/api/modules.html#modules-commonjs-modules)] <br/> **New Node.js**✅ <br/> • integrated by default ^[[Should I prefer ES modules to CommonJS? · Issue #2267 · NodeJS/help · GitHub](https://github.com/nodejs/help/issues/2267)] <br/> **Old Browsers**✅ <br/> • not supported, but works with the help of [Browserify](https://github.com/browserify/browserify), that bundles to a self-contained format which has everything the application needs to run <br/> **New Browsers**✅ <br/> • same as old browser <br/> **RequireJS**❌ <br/> • not supported (there exists partial support, which should be ignored in this context ^[[javascript - Difference between RequireJS and CommonJS - Stack Overflow](https://stackoverflow.com/a/21023168)] ^[[CommonJS Notes](https://requirejs.org/docs/commonjs.html#autoconversion)] ^[[RequireJS in Node](https://requirejs.org/docs/node.html#2)]) |
| **[Asynchronous Module Definitions (AMD)](https://github.com/amdjs/amdjs-api)**                             | 2010^[[First AMD Proposal  wiki.commonjs.org](http://wiki.commonjs.org/index.php?title=Modules/AsynchronousDefinition&oldid=2895) ] ~ 2011^[[First AMD API commit  github.com](https://github.com/amdjs/amdjs-api/commit/954137a3a1d1c96b3a68f63c6903a17d8d4d2a0e)] | • exports with `define()` <br/> • imports with `require()` <br/> • asynchronous module loading (i.e., "lazy loading") <br/> • early fork of CommonJS^[Book, *[Building Enterprise JavaScript Applications  packtpub.com](https://www.packtpub.com/product/building-enterprise-javascript-applications/9781788477321)*, Chapter 4] <br/> • explicitly built for the browser <br/> • less popular compared to CJS due to a more complex syntax^[Book, *[Front-End Tooling with Gulp, Bower, and Yeoman  manning.com](https://www.manning.com/books/front-end-tooling-with-gulp-bower-and-yeoman)*,  Chapter 9.2]         | **Old Node.js**❌ <br/> • Not supported <br/> • possible to write AMD in Node.js for later browser usage^[[RequireJS in Node](https://requirejs.org/docs/node.html#nodeModules)] using [amdefine](https://github.com/jrburke/amdefine)  <br/> **New Node.js**❌ <br/> • same as old Node.js <br/> **Old Browsers**❌ <br/> • Not supported <br/> **New Browsers**❌ <br/> • Not supported <br/> **RequireJS**✅ <br/> • integrated by default and works on runtime, meaning compared to Browserify does not require a bundle process to work in the browser. |
| **[Universal Module Definition (UMD)](https://github.com/umdjs/umd)**  | 2011^[[First UMD API Commit · GitHub](https://github.com/umdjs/umd/commit/51cebd3b845dbd40802de2522310c202b199977b)]  | • created to support all (at the time available) JavaScript environments, meaning CJS, AMD and Browsers <br/>  • checks the environment during runtime and   then deploys the corresponding module format, or fallbacks to make the module functionality available as variable in the global scope to support Browsers <br/>  • uses AMD as a base with special casing added to handle CJS compability^[[GitHub - umdjs/umd: UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.](https://github.com/umdjs/umd)]] <br/>  • EMS (next module system below) is not supported in UMD | **Old Node.js**✅ <br/> • supported, resolves to CJS <br/> **New Node.js**✅ <br/> • supported, resolved to CJS <br/> **Old Browsers**✅ <br/> • supported, resolves to IIFE <br/> **New Browsers**✅ <br/> • supported, resolved to IIFE <br/> **RequireJS**✅ <br/> • supported, resolved to UMD|
| **[ES2015 Modules (ESM/ES modules)](https://262.ecma-international.org/12.0/#sec-modules)**                            | 2015 | • exports with `exports` <br/> • imports with `import`  <br/>  • formerly known as ECMAScript 6 / ES6^[[ECMAScript2015 - Wikipedia](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_%E2%80%93_ECMAScript_2015)]<br/>  • synchronous and asynchronous module loading <br/>  • first official JavaScript Module specification, which means browser and Node.js will eventually support it (which it does by now except Internet Explorer)<br/>  • even a more pleasing syntax than CJS  | **Old Node.js**✅ <br/> • not supported (after version 9.6.0: experimental support exists (released in 2018) ^[[Node v9.6.0 (Current)  Node.js](https://nodejs.org/en/blog/release/v9.6.0/)]) **New Node.js**✅ <br/> • integrated, requires `"type": "module"` in `package.json` <br/> **Old Browsers**✅ <br/> • not supported, requires polyfill<br/> **New Browsers**✅ <br/> • supported, requires `<script type="module">"`<br/> **RequireJS**❌ <br/> • not supported|


(Above table is based on the following additional sources: [Source 1](https://exploringjs.com/es6/ch_modules.html#sec_overview-modules) | [Source 2](https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition) | [Source 3](https://addyosmani.com/writing-modular-js) | [Source 4](https://medium.com/sungthecoder/javascript-module-module-loader-module-bundler-es6-module-confused-yet-6343510e7bde) | [Source 5](https://www.manning.com/books/front-end-tooling-with-gulp-bower-and-yeoman) | [Source 6](https://www.packtpub.com/product/building-enterprise-javascript-applications/9781788477321) | [Source 7](http://tagneto.blogspot.com/2011/04/on-inventing-js-module-formats-and.html) | [Source 8](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s02.html) | [Source 9](https://requirejs.org/docs/whyamd.html) | [Source 10](https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs) | [Source 11](https://link.springer.com/book/10.1007/978-1-4842-0662-1))


> **Notes**:
> - The reason why CJS is/was much more popular on the server side, is due to it's synchronous nature. On the server side, module fetching is relative quick since the modules exist locally, compared to the client-side, where the module has to be downloaded from a remote server, and where synchronous loading usually meant blocking.^[Book, [Secrets of the JavaScript Ninja, Second Edition](https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition), Chapter 11.1.2]
> - ES5 is also known as ECMA-262 5th Edition and was released in 2009^[[ECMA-262 Edition 5.1](https://262.ecma-international.org/5.1/#sec-C)]
> - Some people might refer AMD and CJS as *"ES5 Modules"*, which is wrong. It wasn't until ES2015 that module formats had been standardized (see footnote^[[ECMA-262 Edition 5.1](https://262.ecma-international.org/5.1/#sec-C)] which does not mention Modules in the specification), where both Node.js and Browsers started implementing the ES2015 standard which now is supported by all browsers (except Internet Explorer).^[[JavaScript modules - JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support)]
> - browsers have partial native support for AMD, but only allow to define a module and not import one^[[How to write an AMD module for use in pages without RequireJS? | stackoverflow.com](https://stackoverflow.com/a/12582803)]


### 1.2.2 – Syntaxes
Most likely, ESM and maybe CJS are the only formats you will ever develop in. It's still a plus to be able to detect a module system based on its format.

#### IIFE
The IIFE syntax is fairly simple. 
- Wrap a function inside parentheses and append parentheses next to the first one `(function () {...})()`
- Add the module pattern by returning a value inside the function and assigning it to a variable  `const myValue = (function () { return ... })()`, et voilà, there you have the IIFE

```js
const mathFuncs = (function () {
  return {
    add: function (a, b){
      return a + b;
    }
  }
})();

console.log(mathFuncs.add(1,1));
```
The above approach minimizes global scope pollution and allows organizing entire modules.

#### CJS
CJS exports are done with `module.exports` and the exported value type can be any primitive (string, number, ...), object, array or method. 
**`/add.js`**
```js
module.exports = function add(a + b) {
    return a + b
}
```
A user would simply import the module like this.

**`/index.js`**
```js
const add = require("./add.js");
console.log(add(1, 1)); // -> 2
```

#### AMD
AMD syntax is probably the most difficult one to understand, so lets go through the `define()`^[[RequireJS API](https://requirejs.org/docs/api.html#jsfiles)] syntax definition first.
```js
define(id?, dependencies?, factory);
```
Where:
- `id` - optional argument which specifies the name of the module being defined. If not specified, then the module name is its file location + name. It's common not to specify a name and just use the file location + name.
- `dependencies` - optional array of dependencies. If not specified or empty means that the module has no dependencies.
- `factory` - the function to run in this module. It should be noted that the `factory` function **must** return a value, which can be any type of primitive, object, array or method.

Second, the `require()`^[[RequireJS API](https://requirejs.org/docs/api.html#jsfiles)] syntax definition.
```js
require(dependencies?, callback);
```
Where:
- `dependencies` - optional array of dependencies. If not specified or empty means that the module has no dependencies.
- `callback`: A callback function that’s executed when the (optional) dependencies modules are loaded

Two important things to know here is that there is:
- **one way to define a module,** and that is with the `define()` method.
- **two ways to import a module,** and that is with the `define()` and `require()` method. The difference between them is that `define()` is never executed unless it has been imported by a `require()` method. `require()`  is what triggers executions. It is generally only used once in the top level of your application, and serves as the entry point which then calls the rest of your application. It can as well by used anywhere to execute an immediate callback method^[[Dojo require vs define \| Dimitri's tutorials](https://dimitr.im/dojo-require-vs-define) ]

Let's define a module.
**`/utils/add.js`**
```js
define(function (a + b) {
    return a + b
});
```

And import it with the `define()` method.
**`/app.js`**
```js
define(["utils/add"] , function (add) { // dependencies are available as parameters, comma seperated
   console.log(add(1, 1)); // -> 2
   return null; // satisfy the return condition of define()
});
```

By now, nothing happened. We have to trigger the execution using the `require()` method.

**`/index.js`**
```js
require(["app"] , function (app) {
  // We don't have to do anything here now.
  // The app module has now been loaded and the console.log
  // has been triggered, i.e. the console shows "2" from the add method.
});
```

#### UMD
UMD has many format variations, called templates. They distinguish in conditional statements that check to see which module system is in use in the current environment, if any. Thus, there are some templates that support AMD and Browsers, or Node.js and AMD,... or all three of them.

A basic UMD format looks like:
```js
(function (root, factory) {
    // root is a reference to "this", the global scope
    // factory is the function where we define the module
    
    // Check for environment
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(typeof self !== 'undefined' ? self : this, function (exports, b) {
    // The dependency named "b" is now available to our module

    // attach properties to the exports object to define
    // the exported module properties.
    exports.action = function () {};
}));
```

Primarily, you would program in ESM or CJS these days and use a bundler or transpiler to transform the code to UMD for browser usage. Most bundlers and transpilers (e.g. Webpack, Rollup, Babel,...) these days use a UMD template, which supports all environments, aka AMD, CJS and Browsers.

#### ESM
This is probably the syntax you are most familiar with. `import` and `export` can only be used in the top-level.

> **top-level** does not mean the `import` and `export` is at the top of the file. It just means the outer most scope in a file and not be wrapped inside any functions or conditionals.

**`/add.js`**
```js
export function add(a + b) {
    return a + b
}
```

**`/index.js`**
```js
import {add} from "add";
console.log(add(1, 1)); // -> 2
```

### 1.2.3 – Dynamic vs Static module loading
In dynamic module loading, imports and exports are resolved at runtime. Therefore, imports and exports can be loaded inside functions or conditionals.

In static module loading, imports and exports are resolved during compile time - that is, before the script starts executing (=runtime). Hence, making it impossible to wrap imports and exports in conditionals since the compiler does not know the state of the condition (only known during runtime) ^[[Static module resolution](http://calculist.org/blog/2012/06/29/static-module-resolution/)]. 

Let's have a look at the following CJS example^[[Stolen from here](https://exploringjs.com/es6/ch_modules.html#_benefit-faster-lookup-of-imports)] , where you have to run the code to determine what it imports:
```js
var mylib;
if (Math.random()) {
    mylib = require('foo');
} else {
    mylib = require('bar');
}
```

Until ESM, you had to execute code to find out what module was loaded or not. Static module loading gives you less flexibility, but it comes with several benefits.
- **code is more readable** - developers and tools (e.g. bundlers) can understand the code without running the code (Modules can be statically analyzed)
- **code runs faster** - exports are "pre-defined" before even running the script (static) ^[https://exploringjs.com/es6/ch_modules.html#_benefit-faster-lookup-of-imports] ^[[node.js - The difference between "require(x)" and "import x" - Stack Overflow](https://stackoverflow.com/a/46677972/3673659)]
- **tree shaking** - bundlers can remove unused exports since they are certain which ones will be used (more about that in a bit) ^[https://exploringjs.com/es6/ch_modules.html#_benefit-dead-code-elimination-during-bundling]

For now, keep this in mind:
- ESM is a static module system - modules are identified during compilation time - uses the `import` statement
- CJS is a dynamic module system where imports can be wrapped in methods and conditionals - modules are identified during runtime - uses the `require()` function

> **What about AMD?**
> AMD is also a dynamic module loader as a result of its asynchronous nature. And while it's a dynamic module loader, you can also conditionally load modules with some "hacks". ^[[What are AMD modules? Fetch your sick bag](https://jameshfisher.com/2020/10/03/what-are-amd-modules/)] ^[[AMD - Learning JavaScript Design Patterns [Book]](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s02.html)] ^[[javascript - How to achieve lazy loading with RequireJS? - Stack Overflow](https://stackoverflow.com/a/10914329/3673659)]
> 

#### Import specifiers
A specifier is the identifier of the module, e.g.
```js
import MODULE from "<specifier>";
```
There are three types of specifiers:
- **relative specifier** - a path relative to the location of the current file. File extensions are always necessary for relative specifiers. E.g., `import { startup } from "./startup.js"`
- **bare specifier** - the name of a package. Does not require the inclusion of the file extension. E.g., `import { last } from "lodash"`
- **absolute specifier** - the full file path of the module. Also require the file extensions. E.g.  `import { config } from "file:///opt/nodejs/config.js"`

#### ES2020 Dynamic `import()` function

Then in 2020, the [TC39 comity](https://tc39.es/) (the people governing ECMAScript/JavaScript specifications) released ECMAScript 2020 (also known as ES2020), along with dynamic module loading. ^[[GitHub - tc39/proposal-dynamic-import: import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import)] ^[https://exploringjs.com/impatient-js/ch_modules.html#dynamic-imports]
Following this, the new `import()` expression returns a promise.

> The dynamic `import()` expression can be seen as a "function", may helping to highlight the difference. ^[https://nodejs.org/dist./v13.14.0/docs/api/esm.html#esm_import_expressions]
> - dynamic `import()`is an expression (function)
> - static `import` is a statement
> - dynamic `require()` is a function (and not an expression)

```js
if (Math.random()) {
    import("foo").then(fooModule => {
        // do stuff with foo
    })
} else {
    import("bar").then(barModule => {
        // do stuff with bar
    })
}
```
Or inside an async function, which provides a nicer syntax for promises.
```js
(async () => {
  let myLib;
  if (Math.random()) {
      myLib = await import("foo");
  } else {
      myLib = await import("bar");
  }
  // do something with the loaded module
})();
```

Now, ES modules can be imported either with the `import` statement (static) or via the `import()` expression (dynamic). On top of that, this allows us to import ES modules into ESM **and** CJS files, something that was not possible before. ^[https://techsparx.com/nodejs/esnext/dynamic-import-2.html] ^[https://2ality.com/2019/04/nodejs-esm-impl.html#importing-esm-from-commonjs] ^[https://blog.logrocket.com/es-modules-in-node-today/]

While it seems obvious that one can import CJS modules to CJS files or ES modules to ESM files, with the new ES2020 dynamic feature it is now also possible to import ES modules to CJS files and CJS modules to ESM files. Before, it was only possible to import CJS modules to ESM.

#### Import CJS modules to ESM files

Consider the following CJS file.
**`utils.js`**
```js
module.exports = {
  foo: 123
}
```
An ESM file can import the above module with
**`index.js`**
```js
import utils from "./utils";
console.log(utils.foo); // -> 123
import { foo } from "./utils"; // Fails
```
Importing a CJS module to ESM files only works with default imports `import lodash from "lodash"`, meaning you can't use named exports `import { last } from "lodash"`. 

#### Import ESM modules to CJS files
Consider the following ESM file.
**`utils.js`**
```js
export const bar = 123;
```
A CJS file can import the above module with
**`index.js`**
```js
(async () => {
  const utils = await import("./utils");
  console.log(utils.bar); // -> 123
})();
```
#### Interoperability, named and default Exports
Interoperability or sometimes shortened to "interop" specifies how CJS and ESM work together.

Node.js ES modules can export a default and any number of named exports **at the same time**.
```js
// file.js
export const a = 1;
export const b = 2;
export default = 3;
```
Making the following possible in ESM files `import banana, {a,b} from "./file` where banana equals `3`.

Node's CJS implementation, on the other hand, allows for a default export or any number of named exports, but not both together**.

Transpilers tried to fix this conflict between ESM and CJS by sugarcoating ES modules with default exports. Default exports exist to act as an ES module replacement for CJS and AMD concepts where exports are a single object. ^[[TypeScript: Documentation - Modules](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)] ^[chapter 12 p181 [JavaScript Next \| SpringerLink](https://link.springer.com/book/10.1007/978-1-4842-5394-6)] ^[[Avoid Export Default - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/main-1/defaultisbad#poor-discoverability)] ^[[ModuleImport](https://esdiscuss.org/topic/moduleimport#content-86)]

The transitional replacement comes with several downfalls, here to name a few.
- default exports shift the responsibility to the consumer to decide what to call that export, making it implicit and more difficult to refactor
- IDE's that support IntelliSense cannot help with auto-completion ^[chapter 12 p181 [JavaScript Next \| SpringerLink](https://link.springer.com/book/10.1007/978-1-4842-5394-6)] ^[[Avoid Export Default - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/main-1/defaultisbad#poor-discoverability)]
- cleaner syntax for dynamic `import()` functions, nesting object elements in a `default` property ^[[Avoid Export Default - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/main-1/defaultisbad#dynamic-imports)]

Additionally, you'll find many considerable high-value resources on why one should avoid default exports:
- [Mui, 2nd most popular React UI library RFC discussion to drop default exports](https://github.com/mui-org/material-ui/issues/21862)
- [TypeScript Deep Dive on avoiding export default -](https://basarat.gitbook.io/typescript/main-1/defaultisbad#dynamic-imports)
- [Rich Harris (creator of Rollup and Svelte) highlighting default exports issues](https://github.com/rollup/rollup/issues/1078#issuecomment-268286496)
- Other online discussions: [reddit](https://www.reddit.com/r/reactjs/comments/dj4mjh/react_components_named_exports_vs_default_export/), [Stackoverflow](https://stackoverflow.com/questions/33305954/typescript-export-vs-default-export), ... you will easily find many more speaking for named exports

Hence, enforce explicit named imports by using named exports. Here is the [matching eslint rule `import/no-default-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md).


## 1.3.0 – Build aspects
Now let's have a look at some of the important build terms, like tree-shaking and code-splitting, which are two techniques to reduce the size of JavaScript bundles in web applications. 

### 1.3.1 – Code splitting
Code-splitting is bundling your code in a way so that it’s grouped into many small bundles that can be loaded as they are needed. This is also sometimes referred to as "lazy loading" and is a feature supported by bundlers.

The best way to introduce code-splitting into your app is through the dynamic `import("...").then(module=>{ ... })` expression.^[[Code-Splitting – React](https://reactjs.org/docs/code-splitting.html)] ^[[What Does a Bundler Actually Do? – INNOQ](https://www.innoq.com/en/articles/2021/12/what-does-a-bundler-actually-do/#thesplitting)]

React has for this reason created the `lazy()` method, aiding in dynamically importing components.

```jsx
// Instead of
import About from './page/About';

// Lazy load - code splitting
import { lazy } from "react";
const About = lazy(() => import('./About'));
```

You should read [this React guide](https://reactjs.org/docs/code-splitting.html#reactlazy) for best practices regards code splitting.

Enabling code splitting in the bundle process requires some additional configuration, which we will explore later on. ^[[Rollup Config for React Component Library With TypeScript + SCSS](https://www.codefeetime.com/post/rollup-config-for-react-component-library-with-typescript-scss/)] ^[[Webpack Code Splitting for your Library](https://www.robinwieruch.de/webpack-code-splitting-library/)]

If you initiated a React application with `create-react-app` or Next.js, then code splitting is enabled by default.

When using Babel, you’ll need to make sure that Babel can parse the dynamic `import()` expression (React `lazy()` load) but is not transforming it. For that, you will need the [`@babel/plugin-syntax-dynamic-import` plugin](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import). 


### 1.3.2 – Tree shaking
Tree shaking, also known as *dead code elimination,* is a mechanism used by a bundler to remove unused code. ^[[Reduce JavaScript Payloads with Tree Shaking  \|  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking) ]

For example, unused imports are eliminated.
```js
import { add, subtract } from "./mathFuncs";

add(1, 1);
```
In the above example, `subtract` is never used and will be removed during the bundle.

Property objects are removed as well.
**`/user.js`**
```js
export const user {
    name: "penguin28",
    email: "penguin@iceberg.com"
}
```
**`/index.js`**
```js
import { user } from "user";
console.log(user.email); // -> penguin@iceberg.com
```

In the above example, `name` from the `user` object is never used and removed during the bundle.

In general, tree shaking only works with ES modules (with some exceptions for CJS) and the library or application must be side effect free (explained in the next section).

Additionally, most bundlers only allow tree shaking in production environments.

> If you're using Babel's `babel-preset-env`, then Babel will transpile your ES6 modules into more widely compatible CJS modules (from `import` to `require`), which is great until we want to start tree shaking. The solution is to leave ES6 modules alone in the Babel configuration. ^[[Reduce JavaScript Payloads with Tree Shaking  \|  Web Fundamentals  |  Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking#keeping_babel_from_transpiling_es6_modules_to_commonjs_modules )]
> ```json
> {
>   "presets": [
>     ["env", {
>       "modules": false
>     }]
>   ]
> }
> ```
> 
> The same goes to transpiling your code with Typescript. You have to set `"module": "esnext"` or `"module": "es6"` to prevent typescript from replacing your `import`'s with `require`'s. `esnext` is just a dynamic value indicating the latest ECMAScript version.

### 1.3.3 – Side Effect
A *side effect* is not a bundler or JavaScript-specific term.
It is a general programming concept about **behaviors of functions** (and not modules). A function is said to have side effect if it tries to modify anything outside its body (scope). For example, if it modifies a global variable, then it is a side effect. If it makes a network call, it is a side effect as well. A function that contains a side effect is also named an *impure* function. ^[[The Not-So-Scary Guide to Functional Programming \| YLD Blog](https://www.yld.io/blog/the-not-so-scary-guide-to-functional-programming/)]  ^[Chapter 5 [React Hooks in Action](https://www.manning.com/books/react-hooks-in-action)] ^[[Master the JavaScript Interview: What is Functional Programming? \| by Eric Elliott | JavaScript Scene | Medium](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)]

- **Pure** functions always return the same output, given the same input. It is predictable.
- **"Impure"** functions **directly mutates** variables, state, data outside its body.

Sounds confusing? Stay with me as we go through an example with a pure and impure function, where the latter function modifies state outside its body.
```js
let myValue = 1;

/**
 * ===============
 * === Pure function ===
 * ===============
 */
function pureAdd(a, b) {
    return a + b;
}

// running the pure function several times with the 
// same arguments results in the same output. 
// It is predictable and produces the same output, given the same input
pureAdd(1, 1); // -> 2
pureAdd(1, 1); // -> 2
pureAdd(1, 1); // -> 2

// Same goes for using our variable as an argument. The pure function doesn't 
// directly mutate "myValue"
pureAdd(myValue, 1); // -> 2
pureAdd(myValue, 1); // -> 2
pureAdd(myValue, 1); // -> 2

/**
 * =================
 * === Impure function ===
 * =================
 */
function impureAdd(a) {
    return myValue + b;
}

// running the impure function several times with the 
// same arguments results in the different output. 
// State is mutated outside of the functions scope
impureAdd(1); // -> 2
impureAdd(1); // -> 3
impureAdd(1); // -> 4

// Same goes for using our variable as an argument
myValue = 1; // reset
impureAdd(myValue); // -> 2
impureAdd(myValue); // -> 4
impureAdd(myValue); // -> 8
```

Here `impureAdd()` mutates a state, the `myValue` value, outside its body and thereby creates unpredictable results that could affect applications globally.

To name a few side effects in a JavaScript application:
- mutate or access a browser API object, like global `window` or `document` objects, e.g. 
  - `document.title` object rendering the browser title for the current page
  - [a `fetch()` polyfill](https://www.npmjs.com/package/whatwg-fetch) creates a new `window.fetch` property, enabling support for older browsers ^[[reactjs - Error with Typescript / whatwg-fetch / webpack - Stack Overflow](https://stackoverflow.com/a/37779976/3673659)]
  - reading from localStorage with `window.localstorage.getItem("name")`
  - creating a subscription `window.addEventListener("resize", runWhenPageResized)`
- importing global CSS `import "./scss/main.scss"`, we need to treat any CSS as potentially having side effects  because even CSS modules can define global CSS ^[Chapter 2 - Loaders - CSS in JS[Modern JavaScript Tools & Skills [Book]](https://www.oreilly.com/library/view/modern-javascript-tools/9781492068129/)]
- timer functions like `setTimeout()` or `setInterval()`
- Ajax calls. Fetching data can lead to unintended side effects. What if the data is falsy or the fetch fails?

#### Side effect in a Bundler and React
At a later point, we need to know the two-different interpretations for side effects in React and a bundler.

**In a bundler**, a side effect means that your file does something other than just exporting functions, classes, etc. A very common example is loading a `.css` file. Any `.css`  file can potentially alter your entire app, so for the app to work correctly the CSS needs to be loaded even if your app doesn't reference the code in the file that imports the CSS. The bundler needs to know about this so that it can perform tree shaking so that any file that has side effects needs to be included whether it appears to be used or not.

**In React**, a side effect means that something happens when the component is rendered other than actually updating the DOM. These side effects should not directly happen in a component. It should be in a lifecycle method, which the `useEffect()` hook is made for. ^[[Using the Effect Hook – React](https://reactjs.org/docs/hooks-effect.html)]  `useEffect()` is for triggering additional logic after a React component has updated the DOM, such as a data fetch or a subscription.

In short, putting side effects inside in a component's body **is not considered as a side effect to a bundler** (even if it was inside the `useEffect` hook). A bundler only recognizes a file having side effects if the side effect is running outside a component body, i.e., not part of component lifecycles. E.g. `window.myVariable = 42` in the outermost scope of a `Button.js` file.

Thus, for a React library, you should only mark CSS files (`.css`, `.sass`, … ) as side effects. We will see in at a later point how to mark side effect files.



### 1.3.4 – Cherry-picking (WIP)

> **REVIEWER NOTICE**
> THIS SECTION MAY BE WRONG AND NEEDS REWORK.

Cherry-picking reduces the final bundle size of an application by only importing specific parts or components of a library, instead of the whole. 
This only works:
- with libraries that export in CJS or EMS 
- when the selected part or component is side effect free. 
- the bundler supports tree shaking 

Some libraries like [lodash](https://github.com/lodash/lodash) publish standalone ESM libraries [lodash-es](https://www.npmjs.com/package/lodash-es), beside their main CJS library. ^[[Importing modules in JavaScript, are we doing it right? - DEV Community](https://dev.to/dianjuar/importing-modules-in-javascript-are-we-doing-it-right-nc)] ^[[Minimizing bundle size - MUI](https://mui.com/guides/minimizing-bundle-size/)] ^[[How To Use Correctly JavaScript Utility Libraries](https://dmitripavlutin.com/javascript-utility-libraries/)]

Modules can be cherry-picked, regardless of a CJS or EMS library using their absolute paths, e.g.
```js
const last = require("lodash/last")  // CJS
import last from "lodash-es/last"; // ESM - but only if module is default exported too
```

ES6 object destructuring can also be used as an alternative, however, only if the library supports EMS exports.
```js
import { last } from "lodash-es";
```

As a library author, export your items as close to top-level as possible to have as little friction as possible for the library consumers. ^[[TypeScript: Documentation - Modules](https://www.typescriptlang.org/docs/handbook/modules.html#export-as-close-to-top-level-as-possible)]

### 1.3.5 – Dependency types

We differentiate between three types of dependencies.

- **Regular dependencies** are dependencies that a library or application needs during the runtime. E.g., a UI or utility library required to render something
- **Dev dependencies** are dependencies that a library or application only requires during the development release, like bundler, transpilers, linters,...
- **Peer dependencies** are dependencies where both a consuming application and a library depend on. To avoid duplicate installations (as this may exist with regular dependencies), only the consuming application has an installation of said dependency and provides it to the library.

In Node.js, these dependency types are specified in the `package.json` file with the `dependencies`, `devDependencies` and `peerDependencies` fields.

As by an example, we have a library that contains all three types of dependencies, specified in its `package.json` file.
When an application adds this library, the following happens:
- `dependencies` – These dependencies are installed alongside the library. Each dependency is installed in the root `node_modules` directory if it doesn't already exist. If it does exist, then versions are checked to see if they are compatible. In case of incompatible versions, the same dependency but of another version is installed in the library's directory, in its own `node_module` directory.
- `devDependencies` These dependencies are not installed alongside the library.
- `peerDependencies` – These dependencies are not installed alongside the library. The library checks if it can use the application's provided dependency version, or else throws an error.

React is always to be considered as a peer dependency in a React specific library.

# 2.0.0 – Serving a library

## 2.1.0 – How does a library work?
Installing a library can be done in several ways, but the most common are:
- **npm/yarn** (e.g.,`npm install lodash`)
- **using a script tag** that links to a file or a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) link (e.g., `<script src="https://unpkg.com/browse/lodash@4.17.21/" />`)
- **adding the package files manually** by extracting them from the source. This is only reasonable in a browser environment.

Whenever a consuming application installs a library with `npm install <package-name>`, the consuming application looks for the library's `package.json` file. This file contains the library's usage instructions, specified in fields. The same applies to CDN's, which read the `package.json` file to know what to output in their CDN links.

The following fields are the important ones to a library author.

| Field | Description |  Utilized by | Example |
| ----- | ----------- | ------- |------- |
| **[`main`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main)**      |  • main entry point of the library <br/> • falls back to the root `/index.js` (if available) | • Node.js |`"main":"./dist/index.js"`  |
| **[`module`](https://github.com/rollup/rollup/wiki/pkg.module)** | • entry point designated for ESM version of a library <br/> • common convention among bundlers like Webpack^[ [Authoring Libraries \\| webpack](https://webpack.js.org/guides/author-libraries/#final-steps)], Rollup^[[pkg.module · rollup/rollup Wiki · GitHub](https://github.com/rollup/rollup/wiki/pkg.module)] and esbuild^[[esbuild - main fields](https://esbuild.github.io/api/#main-fields)] <br/> • mainly only used by bundlers to tree shake with help of ES modules features |  • ES module aware bundlers like Rollup, Webpack and esbuild   | `"module":"./dist/index.esm.js"`  |
| **[`type`](https://nodejs.org/api/packages.html#type)**   |  • specify if `.js` files are treated like CJS or ES modules <br/>  • defaults to `"type":"commonjs"`<br/> • recommended to always include this field (regardless of default value) to future-proof the library in case Node.js ever changes the default module system ^[[Modules: Packages \| Node.js v17.3.0 Documentation](https://nodejs.org/api/packages.html#determining-module-system)]  |  • Node.js   | `"type":"module"` |
| **[`types`](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html#editing-the-packagejson)**   |  • entry point for typescript definition files `.d.ts` ^[ [TypeScript: Documentation – Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package)] <br/> • `typings` field is synonymous with `types` and could be used as an alternative <br/> • falls back to the `main` field by looking for the same filename with `FILENAME.d.ts` instead of `FILENAME.js`, then root `/main.d.ts` and then to `/index.d.ts` if available ^[[TypeScript: Documentation – Creating .d.ts Files from .js files](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html#editing-the-packagejson)] |  • Typescript   | `"types":"./dist/index.d.ts"` |
| **[`files`](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files)** | • array of files or directories to include in the published library (e.g., publishing a library to a package registry like [www.npmjs.com](https://www.npmjs.com/))<br/> • Acts like a whitelist compared to `.gitignore` (or `.npmignore` which is not recommended – discussed later) <br/> • even if not specified, some files are always included (e.g., `package.json`) ^[[package.json \| npm Docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files)] <br/> • if not specified, defaults to include all files except a some^[[package.json \| npm Docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files)] are included  | • Node.js | `"files":"["lib"]"` |
| **[`exports`](https://nodejs.org/api/packages.html#packages_subpath_exports)** | • Dual module packages configuration (only applies to ES and CJS modules supported by Node.js) <br/> • specify the ES and CJS module the entry points of the library <br/> • Node.js can now either use CJS or ESM version of the library, instead only the CJS version specified in `main` while the ESM version in `module` was only ever used by bundlers <br/> • more details in the next section as this requires further understanding | • Node.js <br/> • Bundlers (only implemented by a few) <br/> • Typescript (work in progress)  | <pre>"exports":[ <br>&nbsp;&nbsp;&nbsp;"import":"./dist/index.esm.js" <br>&nbsp;&nbsp;&nbsp;"require":"./lib/index.js" <br>] </pre>   |
| **[`unpkg`](https://unpkg.com/)** | • entry point for the [UNPKG](https://unpkg.com/) CDN^[[UNPKG](https://unpkg.com/)] <br/> • only supports UMD <br/> • falls back to the root `/umd` field and then to `main` field if not specified and fallbacks are exists <br/> • ignores `browser` field | • UNPKG CDN  | `"unpkg":"./lib/index.umd.js"` |
| **[`jsdelivr`](https://github.com/jsdelivr/jsdelivr#configuring-a-default-file-in-packagejson)**  | • entrypoint for the [jsDelivr](https://www.jsdelivr.com/) CDN^[[GitHub - jsdelivr/jsdelivr: A free, fast, and reliable Open Source CDN for npm, GitHub, JavaScript, and ESM](https://github.com/jsdelivr/jsdelivr#configuring-a-default-file-in-packagejson)]  <br/> • only supports UMD (ESM support in the development ^[[jsDelivr ESM](https://www.jsdelivr.com/esm)]) <br/> • falls back to `browser` field and then to `main` field | • jsDelivr | `"jsdelivr":"./lib/index.umd.js"` |

In addition, there are popular development websites like [CodePen](https://codepen.io/) and [CodeSandbox](https://codesandbox.io/) allowing you to write code in the browser and include npm packages. CodePen depends on the `module` field ^[[Skypack + CodePen How packages are included](https://blog.codepen.io/2020/11/18/skypack-codepen/)] while Codesandbox prefers the `exports` and `module` fields. ^[[How does Codesandbox consume libraries? · Discussion #6369 · codesandbox/codesandbox-client · GitHub](https://github.com/codesandbox/codesandbox-client/discussions/6369)]

> **How to add a library to UNPKG or jsDelivr?**
> As soon as you publish a library to npm, the library is automatically added to both CDN's too. No further action is required from the library author.

Except `main`, `browser`, `files` and `exports`, all fields are widely accepted community convention fields.

### 2.0.1 – Multi module libraries
In a library's `package.json` file, the `main` field instructs Node.js how to include the library in an application. In the past, this sufficed since Node.js was built on a single module system, CJS.

With the introduction of ES modules, there were now two module systems. Interoperating between them and transitioning to ESM turned out to be problematic ^[https://2ality.com/2019/04/nodejs-esm-impl.html#interoperability]. With the `main` field, library authors had to decide whether to output CJS or ES modules. As a result, it became a common pattern for library authors to build to both CJS and ES modules in a package, where `main` pointed to a CJS entry point and `module` to an ESM entrypoint ^[https://2ality.com/2019/10/hybrid-npm-packages.html#legacy-approach-for-putting-es-modules-on-npm]. The `module` field, serving ESM, is only used by bundlers and other build tools, since Node.js ignored (and still ignores) said field ^[[Modules: Packages \| Node.js v17.3.0 Documentation](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)]. This allowed for best backwards compatibility for older Node.js versions, while using bundlers tree shaking advantages with the ESM entry point.

Today, since Node.js v13.7.0, a library can now contain both CJS and ES module entry points at the same time.
- files ending in `.mjs` are treated as ES modules ^[[Modules: Packages \| Node.js v14.18.2 Documentation](https://nodejs.org/docs/latest-v14.x/api/packages.html#packages_package_json_and_file_extensions)]
- files ending in `.cjs` are treated as CJS modules ^[<https://nodejs.org/docs/latest-v14.x/api/packages.html#packages_package_json_and_file_extensions>]
- files ending in `.js` are by default treated as CJS modules, *unless* the nearest parent `package.json` file contains a `type` (singular) field with a value of `module`. Alternatively, you may also be strictly specific about CJS and use `"type": "commonjs"` ^[<https://nodejs.org/docs/latest-v14.x/api/packages.html#packages_package_json_and_file_extensions>]
- specify separate entry points for CJS and ES modules in the `package.json` with the `exports` field ^[[Modules: Packages \| Node.js v14.18.2 Documentation](https://nodejs.org/docs/latest-v14.x/api/packages.html#packages_package_entry_points)]

> **Nearest parent `package.json`**
> The nearest parent `package.json` is defined as the first `package.json` found when searching in the current folder, that folder’s parent, and so on up until a `node_modules/` folder or the volume root is reached. ^[[Modules: Packages \| Node.js v17.3.0 Documentation](https://nodejs.org/api/packages.html#type)]

#### The `exports` field
The `exports` field provides an alternative to the `main` field, while also being able to specify separate entry points for CJS and ESM files. `main` is overridden by `exports` if it exists.

The `exports` field either accepts a single entry point, acting like the `main` field, or accepts an object of multiple subpaths and/or pre-defined conditions to construct several entry points ^[https://2ality.com/2019/10/hybrid-npm-packages.html#option-3%3A-bare-import-esm%2C-deep-import-commonjs-with-backward-compatibility]. Conditions provide a way to use different entry points depending on certain conditions, also known as **conditional exports**.

Some conditions are:
- `import` indicates which file will be selected when using an ESM `import` statement or `import()` expression
- `require` indicates which file will be selected when using a CJS `require()` method.
- `default` is the generic fallback, can be a CJS or ESM file.
- `types` indicates the typescript definition entry point **work in progress** ^[[Support for NodeJS 12.7+ package exports · Issue #33079 · microsoft/TypeScript · GitHub](https://github.com/microsoft/TypeScript/issues/33079)]

The order of the conditions in the object matters. Therefore, `default` should always come last. Additionally, all conditions in the above lists are Node.js conditions, `types` which is a typescript-specific condition ignored by Node.js.

Example of a single entry point.
```json
{
  "main": "./lib/index.js",
  "exports": "./lib/index.js",
}
```
Example of conditional exports, i.e., separate entry points for CJS and ESM files.
```js
{
  "main": "./lib/index.js",
  "exports": {
      "." : {  // "." = from root directory
          "import": "./lib/index.esm.js",
          "require": "./lib/index.js",
          "default": "./lib/index.js",
      }
  }
}
```

Furthermore, `exports` comes with two additional features:
- specify the root path of your library, which was not possible with `require()` and main ^[[Modules: CommonJS modules \| Node.js v17.3.0 Documentation](https://nodejs.org/api/modules.html#loading-from-node_modules-folders)] ^[[node.js – Change root directory on npm publish – Stack Overflow](https://stackoverflow.com/questions/39031437/change-root-directory-on-npm-publish)] ^[[[Feature Request] Package.json Root / Base Directory · Issue #21787 · nodejs/node · GitHub](https://github.com/nodejs/node/issues/21787#issuecomment-404649654)]
- package encapsulation, prevents consumers of a library from using any entry points that are not defined, including the `package.json`. E.g., unless defined, `require('myLib/package.json')` throws an error

A more complete example of `exports` with encapsulation.
```json
{
  "main": "./lib/index.js",
  "exports": {
    "./package.json": "./package.json",
    ".": {
        "import": "./lib/index.esm.js",
        "require": "./lib/index.js",
    },
    "./utils": {
        "import": "./lib/utils.esm.js",
        "require": "./lib/utils.js",
    },
    "./grid": {
        "import": "./lib/grid/index.esm.js",
        "require": "./lib/grid/index.js",
    }
  }
}
```
Now, only the defined subpaths can be imported
```js
import { myLib } from "myLib"; // Works and resolves to "./lib/index.esm.js"
import { utils } from "myLib/utils"; // Works and resolves to "./lib/utils.esm.js"
const grid = require("myLib/grid").grid // Works and resolves to "./lib/grid/index.js"

import { superSecret } from "myLib/secret" // Throws ERR_PACKAGE_PATH_NOT_EXPORTED
const superSecret = require("myLib/secret").superSecret // Throws ERR_PACKAGE_PATH_NOT_EXPORTED

import { superSecret } from "./node_modules/myLib/src/secret.js" // Works and resolves "./src/secret.js"
```

The reason the last example worked is that an [absolute specifier](https://nodejs.org/api/esm.html#terminology) (i.e., the file path), instead of the [bare specifier](https://nodejs.org/api/esm.html#terminology) (i.e., the library name) bypasses the encapsulation. ^[https://nodejs.org/api/packages.html#main-entry-point-export]


It is recommended to keep `main`, `module` and `types` field as fallbacks for older Node.js versions, bundlers, and typescript definitions which not yet fully support the `exports` field. 

#### Dual package hazards
> When an application is using a package that provides both CJS and ESM module sources, there is a risk of certain bugs if both versions of the package get loaded. 
>
> This potential comes from the fact that the package instance created by `const pkgInstance = require('pkg')` is not the same as the package instance created by `import pkgInstance from "pkg"` (or an alternative main path like `"pkg/module"`)
>
>While it is unlikely that an application or package would intentionally load both versions directly, it is common for an application to load one version while a dependency of the application loads the other version. This hazard can happen because Node.js supports intermixing CommonJS and ES modules, and can lead to unexpected behavior.
>
> -- [Node.js Dual package hazard](https://nodejs.org/api/packages.html#dual-package-hazard)



### 2.1.2 – What to expose?
There is no single correct answer as it depends on *compatibility* and *performance*. We will deal later on with the implementations. 

A new React library, should output in its `package.json`
```js
{
  "name": "my-lib",
  
  // Treat ".js" files as CJS
  "type": "commonjs",
  
  "exports": {
      ".": {
          // ESM entrypoint when using "import" statement or "import()" expression in modern Node.js
          "import": "./dist/index.esm.js",
          
          //  CJS entrypoint when using "require()" function in modern Node.js
          "require": "./dist/index.cjs.js"
      }
  },
  
  // CJS fallback for older Node.js version
  "main": "./dist/index.cjs.js",
  
  // Fallback for build tools that do not yet support "exports"
  "module": "./dist/index.esm.js",
  
  // Fallback for typescript versions not supporting "exports"
  "types": "./dist/index.d.ts",
  
  // Serve UMD bundle for browsers
  "browser": "./dist/index.umd.js",
  
  // Serve UMD bundle for UNPKG CDN (which ignores "browser" field)
  "unpkg": "./dist/index.umd.js",
  
  // Serve UMD bundle for jsDelivr CDN 
  "jsdelivr": "./dist/index.umd.js",
  
  // Only include "dist/" and the default files, i.e. "package.json", "README", "LICENCE" and the file
  // in the "main" field in the published library.
  "files": [
      "dist"
  ]
  
  // Mark library side effect free to allow tree-shaking
  // In case using CSS, mark CSS files as NOT side effect free
  "sideEffects": false
}
```

You will find many `package.json` variations on the web for libraries. These may differ in prioritizing ESM over CJS ^[https://nodejs.org/api/packages.html#dual-commonjses-module-packages], entirely ignore a UMD bundle for CDNs or use multiple `package.json`'s to create a more optimized setup. ^[https://2ality.com/2019/10/hybrid-npm-packages.html#option-4%3A-bare-import-esm%2C-deep-import-commonjs-with-.mjs-and-.cjs]

These variations are, just like ours, slightly opinionated and should be carefully selected, i.e., you should understand the choices made to do X over Y.

In the long run, above's `package.json` is a solid base, favoring CJS over ESM in times of transitioning (lasting years to come) and thereby providing better support for **all environments**.

> We refrained from using `.cjs` and `.mjs` file extensions since Browser support is vague. E.g. Both Chrome ^[[JavaScript modules · V8](https://v8.dev/features/modules)] and Firefox^[[Aside — .mjs versus .js](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#aside_%E2%80%94_.mjs_versus_.js)] ^[[MJS Push request for Firefox](https://hg.mozilla.org/mozilla-central/rev/4d198d162b2a)] support the `.mjs` file extension, but not much is known for Safari, Opera,...

Some additional good reads:
- [Configuring packages for Node.js | Jakob J. Ingleheimer](https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed)
- [Hybrid npm packages | Dr. Axel Rauschmayer](https://2ality.com/2019/10/hybrid-npm-packages.html)
- [Dual packages | Node.js](https://nodejs.org/api/packages.html#dual-commonjses-module-packages)

#### Inspecting libraries
Libraries usually host their source code on a code repository website like GitHub. However, only the source code, not the build codes, reside there.

The most straightforward way to inspect the built files is by looking through the built on [UNPKG](https://unpkg.com)
As an example, here are the [published www.npm.com files](https://unpkg.com/browse/react-bootstrap@2.0.3/) of [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap).

# 3.0.0 – Building the library
Now that we have all the basic knowledge and understand the different factors, let's get our hands dirty.

### 3.0.1 – Setting up the demo library
The next sections will be based on a demo React library, that outputs a single `<Button>` component. The library will use typescript, which should be expected from library authors in 2021. We will add SCSS Modules and images later on.

> The demo library is built with `yarn` as the package manager, which is recommended, but you may also choose `npm` if that suits you better.

#### Structure

> In the next steps, `my-lib/` is replaced with `/` shortening code snippets.

```sh
my-lib/ # <- root directory
├── .gitignore
├── README.md
├── package.json
└── src/ # <- src directory with the our code
      ├── components/
      │     ├── Button/
      │     │     ├── Button.tsx 
      │     │     └── index.ts # <- exports the Button.tsx
      │     └── index.ts # <- exports all components from the components/ directory
      └── index.ts # <- exports the library
```

#### The `package.json` file
Initialize the `package.json` file with

```sh
yarn init -y
# Or for npm:
npm init -y
```

`yarn` and `npm` create two different `package.json`'s. The following `package.json` is the result of the `yarn init -y` command.
```js
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
}
```

#### Dependencies
Add the dependencies to our sample.

```sh
yarn add --dev typescript react react-dom lodash-es @types/react @types/react-dom
# Or for npm:
npm install --save-dev typescript react react-dom lodash-es @types/react @types/react-dom
```

For now, we add all dependencies as `devDependencies`. We figure out later if we move some to regular or peer dependencies. Lodash is not a requirement for a React library and only serves as a demonstration of a handling additional packages in our library.

#### The `tsconfig.json` file
To complete our demo library, we create the bare minimum React `tsconfig.json` file to satisfy Typescript and our IDE.

```js
{
  "compilerOptions": {
    // Tells TypeScript to explicitly ignore ".js" files
    "allowJs": false,
    // Inform Typescript and the IDE that this is a React project
    "jsx": "react",
    // Enable interoperability helper between CJS and ES modules
    // React library yields CJS modules which we import with the "import" statement
    "esModuleInterop": true,
    // Specify the file lookup resolution algorithm when importing
    // We must use the Node.js algorithm
    "moduleResolution": "node"
  }
}
```

#### File contents
And populate the files with the following code.

**`/src/components/Button/Button.tsx`**
```tsx
import React from "react";
import { last } from "lodash-es"; // ESM version of lodash

export type ButtonProps = {
  /**
   * Button's display text
   *  ( This description structure is useful if you use a documentation
   *  tool like Storybook, Docz, ... )
   */
  text: string;
};

export function Button(props: ButtonProps) {
  const lastVal = last([1, 2, 3]);
  return <button>{props.text} - {lastVal}</button>;
}
```
The `last` method from `lodash`extracts the final value of an array. We're using that value in our button text.

**`/src/components/Button/index.ts`**
```tsx
export { Button } from "./Button"
```
**`/src/components/index.ts`**
```tsx
export { Button } from "./Button"
```
**`/src/index.ts`**
```tsx
export * from "./components"
```

#### Default exports?

Wait, where are the default exports?

Experienced developers might wonder why we didn't use default exports, i.e., `export { default as Button } from "./Button"`. We've already discussed this topic in "Interoperability, named and default Exports", but in short, named exports are the right way.

## 3.1.0 – Bundling and Transpiling
There are plenty of different ways to transpile or bundle our library. First, let's address some important topics.

### 3.1.1 – Is a bundler needed?
A bundler goes hand in hand with a transpiler, but a transpiler does not depend on a bundler.

If your library consists only of some `.tsx` and `.ts` files (or `.jsx`/`.js`), then using a bundler might be over the top. Here, a transpiler suffices to convert your files to plain `.js` files.

However, if your library uses *other resources* like stylesheets `.css`, images, …, then things get more complicated ^[[typescript - React Component Library - Is a bundler needed? - Stack Overflow](https://stackoverflow.com/questions/67076710/react-component-library-is-a-bundler-needed)]. A transpiler's main objective is to convert modern JavaScript into backwards compatible JavaScript. ^[[Babel (transcompiler) - Wikipedia](https://en.wikipedia.org/wiki/Babel_(transcompiler))]. In fact, some transpilers can handle *other resources* with the help of additional plugins, just like bundlers which require plugins as well. Yet, a transpiler remains limited in its functionalities, and in many cases requires you to write remaining processing.

For example:
- **[react-query](https://github.com/tannerlinsley/react-query)**, an asynchronous fetching library, only uses a transpilers to yield CJS and ESM bundles ^[[react-query/package.json at 718903debf4dc2c01e088af030ec30138e9f1ade · tannerlinsley/react-query · GitHub](https://github.com/tannerlinsley/react-query/blob/718903debf4dc2c01e088af030ec30138e9f1ade/package.json#L37-L38)] and typescript types ^[[react-query/package.json at 718903debf4dc2c01e088af030ec30138e9f1ade · tannerlinsley/react-query · GitHub](https://github.com/tannerlinsley/react-query/blob/718903debf4dc2c01e088af030ec30138e9f1ade/package.json#L40)] (notice the `babel` command, which is a transpiler). The library only consists of JavaScript, but not *other resources* that require additional handling. The library only uses a bundler to create a single UMD file for browsers ^[[react-query/package.json at 718903debf4dc2c01e088af030ec30138e9f1ade · tannerlinsley/react-query · GitHub](https://github.com/tannerlinsley/react-query/blob/718903debf4dc2c01e088af030ec30138e9f1ade/package.json#L39)] (notice the `rollup` command which is a bundler)
- **[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)**, a component library that uses *other resources* like stylesheets uses a bundler to yield CJS, ESM, UMD bundles and typescript types (notice the execution of the `build.js` file ^[[package.json links to the build.js file](https://github.com/react-bootstrap/react-bootstrap/blob/260671c858911e238576fbc5a85f677f96059a2a/package.json#L36)] which eventually runs the Webpack ^[[react-bootstrap/build.js at dec919bf9bb0cb3153f3e3afe6a486968b218329 · react-bootstrap/react-bootstrap · GitHub](https://github.com/react-bootstrap/react-bootstrap/blob/dec919bf9bb0cb3153f3e3afe6a486968b218329/tools/build.js)] bundler) 


Therefore, as a **rule of thumb, use a bundler for all output formats, until you know** that a transpiler suits you better, with strong emphasis on the "until you know".

### 3.1.2 – Tools

#### Transpilers
Out of the many transpilers on the market, probably the most popular ones are [Babel](https://babeljs.io/) and TypeScript's  [`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) tool. 
The main differences between them are:
- `tsc` is for typescript-driven projects only. 
- only `tsc` performs type-checking during transpilation time
- `tsc` asks you to specify an ES version to compile to ^[[TypeScript: TSConfig Reference - Docs on every TSConfig option](https://www.typescriptlang.org/tsconfig#target)], while in Babel you specify a range of environments and browsers you want to support ^[[@babel/preset-env · Babel](https://babeljs.io/docs/en/babel-preset-env/#targets)]
- Babel is missing a few typescript features ^[[@babel/plugin-transform-typescript · Babel](https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats)], which, however, would probably only bother > 5% of the Typescript community. (E.g., partial `namespace` support, but its usage is discouraged anyway ^[[Are namespaces legacy? · Issue #30994 · microsoft/TypeScript · GitHub](https://github.com/microsoft/TypeScript/issues/30994#issuecomment-492017219)] ; and P.S.A `const enums` are now supported ^[[7.15.0 Released: Hack-style pipelines, TypeScript const enums and Rhino target support · Babel](https://babeljs.io/blog/2021/07/26/7.15.0)])

That being so, Babel is a powerful, feature-rich and versatile transpiler, that also supports typescript. The lack of type-checkings makes Babel obviously run faster, and modern IDE's like [VSCode](https://code.visualstudio.com/) have built in type-checks ^[[TypeScript Compiling with Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-compiling)] thanks to [`tsserver`](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29)

> Both `tsc` and `tsserver` share an internal library which does the work on type checking, i.e., both yield the same results in context of type checking.
> -- Discord [response](https://gist.github.com/advename/53d7da7613cfe057df55d056fe9979d8) from [Orta](https://github.com/orta), one of the Typescript maintainers

For our demo library, we're going to use a combination of Babel and `tsc`. Babel handles all transpilation while `tsc` creates the type definition `.d.ts` files.

Choosing between Babel or `tsc` can be summarized with ^[[TypeScript: Documentation - Using Babel with TypeScript](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html#babel-vs-tsc-for-typescript)]:
- Is your build output mostly the same as your source input files? Use `tsc`
- Do you need a build pipeline with multiple potential outputs? Use Babel for transpiling and `tsc` for type checking & definitions

#### Bundlers
As for bundlers, [Webpack](https://webpack.js.org/), [rollup.js](https://rollupjs.org/guide/en/), [esbuild - API](https://esbuild.github.io/api/) and [Parcel](https://parceljs.org/) are the popular ones.

All four bundlers will likely get the job done, but some are better suited for a specific job than others.

Webpack is the most common react applications bundler and used by `create-react-app`. It's frequently said that webpack is not a great choice for libraries ^[[Webpack and Rollup: the same but different \| by Rich Harris | webpack | Medium](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)] ^[[comment by a webpack maintainer](https://github.com/webpack/webpack/issues/11277#issuecomment-671039316))] and one should rather use Rollup instead – which still holds true.

[Vite.js mentions](https://vitejs.dev/guide/why.html#why-not-bundle-with-esbuild) they won't use esbuild anytime soon due to its beta status, and esbuild has no UMD support. 
On a personal side, I have used parcel a couple of years ago and didn't like the "zero config" idea. 

Either way, I haven't used esbuild or Parcel to provide valuable feedback.

## 3.2.0 – The build

> Remember: `/` denotes `my-lib/`.

### 3.2.1 – Step 1 – Update the `tsconfig.json`
For our demo library, the only purpose of typescript is to yield the typescript definitions `.d.ts` ^[[TypeScript: Documentation - Creating .d.ts Files from .js files](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)].

We therefore update the `tsconfig.json` file with several new properties.

**`/tsconfig.json`**
```js
{
  "compilerOptions": {
    // Tells TypeScript to explicitly ignore ".js" files
    "allowJs": false,
    // Inform typescript that this is a react project
    "jsx": "react",
    // Enable interoperability helper between ESM and CJS modules
    // React library yields CJS modules which we import with the "import" statement
    "esModuleInterop": true,
    // Specify the file lookup resolution algorithm when importing
    // We must use the Node.js algorithm
    "moduleResolution": "node",

    
    // ======== NEW ========
    
    // Types should go into this directory.
    // Removing this would place the .d.ts files next to the .js files
    "outDir": "dist/types",
    // Generate d.ts files
    "declaration": true,
    // This compiler run should only output d.ts files
    "emitDeclarationOnly": true,
    // Create sourcemaps for d.ts files.
    // go to ".js" file when using IDE functions like
    // "Go to Definition" in VSCode
    "declarationMap": true,
    // Skip type checking all ".d.ts" files.
    "skipLibCheck": true,
    // Ensure that Babel can safely transpile files in the TypeScript project
    "isolatedModules": true
  },
  // Include the following directories
  "include": ["src"],
  // Optional, exclude some patterns from typescript
  "exclude": [
    "**/__tests__",
    "**/__mocks__",
    "**/__snapshots__",
    "**/*.test.*",
    "**/*.spec.*",
    "**/*.mock.*"
  ]
}
```

You could now run a test with CD'ing into the library directory and run
```sh
npx tsc
```
The above command created the `/dist/types/index.d.ts` file along all connected sub files, paths, and definition maps. It used by default the `tsconfig.json` configuration file.

Since we're using [`include`](https://www.typescriptlang.org/tsconfig#include) to specify the compiler source directory, we don't have to exclude `node_modules` which exists in a directory above `/src`. Only test files should be excluded here.

### 3.2.2 – Step 2 – Transpile with Babel
To begin with, install all the required babel dependencies as dev dependencies.
```sh
yarn add --dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript 
# Or with npm:
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript 
```

Where:
- [`@babel/cli`](https://babeljs.io/docs/en/babel-cli) – compile files using the command line
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) – set of plugins to transform modern JavaScript code to older versions, provides a lot of flexibility
- [`@babel/preset-react`](https://babeljs.io/docs/en/babel-preset-react) – set of plugins to support `.jsx`
- [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript) – set of plugins to support typescript

With that, we can now create a basic Babel config file.
**`/.babelrc`**
```js
/**
 * Note: presets Order DOES matter, 
 * reads from bottom to top: https://stackoverflow.com/a/39798873/3673659
 * 
 * And yes, comments are allowed in .babelrc JSON files
 */
{
  "presets": [
    ["@babel/preset-env", { "modules": false }],
    [
      "@babel/preset-react",
      {
        // Use the modern JSX runtime technique with "automatic"
        // This removes the need to import react in each file
        // Read more: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ]
}
```
`@babel/preset-env` transpiles to a JavaScript version specified by a browser target list. These targets are powered by [browserslist](https://github.com/browserslist/browserslist) and the default aims at supporting [`> 0.5%, last 2 versions, Firefox ESR, not dead`](https://github.com/browserslist/browserslist#full-list) which suffices for our case. 

Additionally, did you notice that we're using `module.export = { ... }` here and not the ES module version `export = { ... }`? Remember that our goal `package.json`, we set `"module":"commonjs"` meaning that our `.js` files are treated as CJS modules. 
We write React files in ESM since we have a following transpilation process. But the babel config itself has no transpiler, meaning it's treated as a CJS module.

Now, let's do a test run.
```sh
npx babel src --extensions .ts,.tsx --out-dir "dist/cjs"
```
Where:
- `src` – the source file or directory
- `--extensions .ts,.tsx` – required only for `@babel/cli` to handle typescript files ^[[@babel/preset-typescript · Babel](https://babeljs.io/docs/en/babel-preset-typescript)]
- `--out-dir "dist/cjs"`– transpile to the `/dist/cjs/` directory

And you should see now that Babel transpiled all `.tsx` and `.ts` files to `.js` files inside the `/dist/cjs/` directory.

> If your package uses dynamic `import()` expressions, or React `lazy()` loading method, then you must add 
[`@babel/plugin-syntax-dynamic-import` plugin](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import) to your babel config.

> **Extra: `"modules":"false"`**
> 
> You might remember the reason for using `"modules":"false"`(explained further up). Since we're using rollup, this step is optional. Rollup's Babel plugin automatically sets `"modules":"false"` in newer versions. ^[[plugins/packages/babel at master · rollup/plugins · GitHub](https://github.com/rollup/plugins/tree/master/packages/babel#modules)]


### 3.2.3 – Step 3 – Bundle with Rollup
Install all the required Rollup dependencies as dev dependencies:

#### Dependencies
**npm**
```sh
yarn add --dev rollup @rollup/plugin-babel @rollup/plugin-node-resolve @rollup/plugin-commonjs
# Or with npm:
npm install --save-dev rollup @rollup/plugin-babel @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

Where:
- [`@rollup/plugin-babel`](https://github.com/rollup/plugins/tree/master/packages/babel) – integrate Babel in a Rollup process
- [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve) - helper to locate a module in the project’s node_modules directory. Resolves the dependency when using e.g. the `import` statement. ^[locates a module in the project’s node_modules directory]
- [`@rollup/plugin-commonjs`](https://github.com/rollup/plugins/tree/master/packages/commonjs) – support libraries in node_modules that use CJS modules. This plugin converts CJS modules to ESM. Must come in after `@rollup/plugin-node-resolve`, and before `@rollup/plugin-babel` in the config. ^[[plugins/packages/node-resolve at master · rollup/plugins · GitHub](https://github.com/rollup/plugins/tree/master/packages/node-resolve#using-with-rollupplugin-commonjs)]. ^[[plugins/packages/babel at master · rollup/plugins · GitHub](https://github.com/rollup/plugins/tree/master/packages/babel#using-with-rollupplugin-commonjs)]

#### Configuration
Create a base Rollup configuration file.
**`/rollup.config.js`**
```js
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

export default [
  // CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "./dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // Helper to locate "node_modules" modules
      nodeResolve({
        // Only activate the plugin on files from the extensions list
        extensions,
      }),
      // Helper to convert CJS modules to ESM
      commonjs({
        // Only run the helper on legacy node_modules dependencies that use CJS
        include: ["node_modules/**"],
      }),
      babel({
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**"], // required; else Babel transpiles "node_modules" modules aswell since we have imports of them in the files
        extensions,
      }),
    ],
  },
  // UMD
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        // UMD requires a bundle name used to expose the library in the global scope
        name: "myLib",
      },
    ],
    plugins: [
      // Helper to locate node_modules modules
      nodeResolve({
        // Only activate the plugin on files from the extensions list
        extensions,
      }),
      // Helper to convert CJS modules to ESM
      commonjs({
        // Only run the helper on legacy node_modules dependencies that use CJS
        include: ["node_modules/**"],
      }),
      babel({
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**"], // required; else Babel transpiles "node_modules" modules aswell since we have imports of them in the files
        extensions,
      }),
    ],
  },
];
```

Babel relies on very small ***helper functions*** during the transpilation. By default, these functions are added to every file that requires it, leading to possible duplications. However, Rollup can be aware of duplications and thereby bundle said helper functions only once. Therefore, you can specify several values for `babelHelpers`:
- `inline` – follows Babel default configuration and adds the helpers to the top of each file ^[[plugins/packages/babel at master · rollup/plugins · GitHub](https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers)]
- `bundled` – Default value in Rollup. Make Rollup aware to bundle helper functions only once. ^[[plugins/packages/babel at master · rollup/plugins · GitHub](https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers)]
- `runtime` – All helpers will automatically reference to the `@babel/runtime` dependency instead of being bundled. Rollup recommends using this value for libraries. However, this requires the files to be in a Node environment (i.e., do not use for browser bundles) and additional steps, which are explained [here](https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers) ^[[@babel/plugin-transform-runtime · Babel](https://babeljs.io/docs/en/babel-plugin-transform-runtime)].

Use `bundled` until you know you need `runtime`.

 __babelHelpers ISSUE runtime vs bundled__: [[babel-plugin] - babelHelpers, what is the difference between runtime and bundled? · Issue #1076 · rollup/plugins · GitHub](https://github.com/rollup/plugins/issues/1076)

Furthermore, did you notice that we used the `import` statement instead of the `require` function and `export default` instead of `module.export = { ... }`, compared to the Babel configuration file? That is because Rollup by default expects config files to be ESM! If you want to use CJS, then you have to change the file extension of the config to `.cjs`. ^[[rollup.js](https://rollupjs.org/guide/en/#using-untranspiled-config-files)]

#### Fixing dependency types
As you might remember, there are three dependency field types in the `package.json`, regular `dependencies`, `devDependencies` and `peerDependencies` fields.

As for now, all our dependencies are specified as `devDependencies` – meaning none of them is installed alongside our library.

React being a peer dependency, we expect the consuming application to provide the React installation.

Lodash, on the other hand, is different. Do we expect the consuming application to have lodash installed, just like React? Not really. Do we need lodash to run the library? Definitely. Therefore, we have to move Lodash to the regular dependencies, ensuring it's added alongside the library.

> If, two different libraries (A and B) depend on the same library C, and the first library (A) requires exactly version 2.4.1 of library C, while the other library (B) depends on 2.4.5, then both version of library C are installed in the respective library's `node_modules` directory, e.g., `node_modules/lib-a/node_modules/lib-c` and `node_modules/lib-b/node_modules/lib-c`.

With that in mind, we update our `package.json`.
```js
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.16.0",
    "@babel/core": "^7.16.5",
    "@babel/preset-env": "^7.16.5",
    "@babel/preset-react": "^7.16.5",
    "@babel/preset-typescript": "^7.16.5",
    "@rollup/plugin-babel": "^5.3.0",
    "@rollup/plugin-commonjs": "^21.0.1",
    "@rollup/plugin-node-resolve": "^13.1.1",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    
    // "lodash-es": "^4.17.21", <-- lodash removed
    
    // Keep react and react-dom in devDependencies to 
    // ensure they are installed after a cloning
    // the library and running npm install
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    
    "rollup": "^2.62.0",
    "typescript": "^4.5.4"
  },
  
  // NEW
  "dependencies": {
    "lodash-es": "^4.17.21" // <-- lodash moved here
  },
  
  // NEW
  "peerDependencies": {
    "react": ">=16.8.0", 
    "react-dom": ">=16.8.0"
  }
}
```

Having lodash version, `"^4.17.21"`, means that our library supports all lodash versions from 4.17.21 (included) to 5.0.0 (excluded). You can also install 4.0.0 and see if that works in your project, thereby satisfying all lodash v4 installations. With regular dependencies, we want to be flexible with minor or patch versions only, and not major where we jump from v2 to v3.

> In Semver, the version syntax is `[major, minor, patch]` where `major` is considered breaking changes. 
> E.g. `4.31.12`: `4`- major, `31` – minor and `12` is the patch number.

#### External and Globals
Let's test our Rollup config file from the previous step with
```sh
npx rollup -c
```
Here, `-c` is the shortened flag of `--config <filename>` telling Rollup to use a config file, where only the latter may have an `<filename>` input. If no filename is specified, the command expects by default the `rollup.config.js` filename.

The above command yields the following files in the `/my-lib/dist` directory.
```sh
my-lib/ 
└── dist/
    ├── index.cjs.js  # <- 121 kB
    ├── index.cjs.js.map  # <- 227 kB
    ├── index.esm.js  # <- 121 kB
    ├── index.esm.js.map  # <- 227 kB
    ├── index.umd.js  # <- 124 kB
    └── index.umd.js.map  # <- 227 kB
```

Do we see right? File sizes of 120 kB and above for a single `<Button>` component?

Yes, that's right, and that is because our final bundles include all of React and the `last` method of lodash.

We can exclude libraries from being bundled by specifying them in the [`external`](https://rollupjs.org/guide/en/#external) array option in Rollup.
UMD and IIFE bundles need additionally the [`globals`](https://rollupjs.org/guide/en/#outputglobals) option, telling Rollup that these external, not bundled, dependencies exist in the global scope (e.g., `window.react`).

Updating the config.
**`/rollup.config.js`**
```js
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

export default [
  // CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "./dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // ...
    ],
    
    // NEW
    external: ["react", "react-dom", "lodash-es"] 
  },
  // UMD
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        name: "myLib",
        
        // NEW
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        }
      },
    ],
    plugins: [
      // ...
    ],
    
    // NEW
    // Without lodash-es, more 
    // about that in the next section
    external: ["react", "react-dom"]
  },
];
```
Running Rollup again.
```sh
npx rollup -c
```
The new bundled files now have the expected sizes.
```sh
my-lib/ 
└── dist/
    ├── index.cjs.js  # <- 414 bytes
    ├── index.cjs.js.map  # <- 702 bytes
    ├── index.esm.js  # <- 299 bytes
    ├── index.esm.js.map  # <- 698 bytes
    ├── index.umd.js  # <- 1,2 kB
    └── index.umd.js.map  # <- 1,4 kB
```

#### To bundle or not to bundle dependencies

Why did we not specify `lodash-es` in the `external` array for the UMD bundle? 
Because, we actually want `lodash-es` to be part of our UMD bundle.

Our CJS and ESM bundles are targeted for Node.js environments, whereas the UMD bundle is intended to be directly included in browsers with CDN links and `<script>` tags. In any case, peer dependencies should never be bundled.

**In Node.js**, all dependencies are managed with `npm`/`yarn` and `package.json`, meaning we don't have to include any regular dependencies in our bundles (and never should).

**In Browsers,** on the other hand, where we use CDN links and `<script>` tags, we don't have the luxury of package managers. We rely entirely on already included libraries, or included libraries that bundle their dependencies. Package management in the browser is left to the consumer. Here, the library author must decide what they consider as peer dependencies and regular dependencies, and only include regular dependencies in the final bundle. For example:
- The most popular React component library, [Material UI](https://github.com/mui-org/material-ui) has included all dependencies, except the peer dependency `react` and `react-dom` leading to a [bloated, unminified, file size of 1.29MB](https://unpkg.com/browse/@material-ui/core@4.12.3/umd/)
- Until Bootstrap 5, [`jQuery`](https://github.com/jquery/jquery) and [`popper`](https://github.com/floating-ui/floating-ui) were considered as peer dependencies. Users first had to include both dependencies before they could use Bootstrap in the browser.

In essence, in browser targeted bundles (UMD, IIFE or browser dedicated ESM), include the regular dependencies in your bundles.

Following this, we can slightly improve our Rollup config to read the regular `dependencies` and `peerDependencies` from our `package.json`, creating only one source of truth.

**`/rollup.config.js`**
```js
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// NEW
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

export default [
  // CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "./dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // ...
    ],
    
    // Don't bundle regular and peer dependencies
    external: [
      ...Object.keys(pkg.dependencies || {}), // <-- UPDATED
      ...Object.keys(pkg.peerDependencies || {}) // <-- UPDATED
    ] 
  },
  // UMD
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        name: "myLib",
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        }
      },
    ],
    plugins: [
      // ...
    ],
    
    // Don't bundle peer dependencies
    external: [
      ...Object.keys(pkg.peerDependencies || {}) // <-- UPDATED
    ] 
  },
];
```



### 3.2.4 – Step 4 – npm-scripts
Given that we have now the means to generate all our bundle formats (CJS, ESM and UMD) and Typescript definition, let's go ahead and automate these processes with npm-scripts in our `package.json`.

For this, we need additional dependencies.

```sh
yarn add --dev rimraf npm-run-all
# Or with npm:
npm install --save-dev rimraf npm-run-all
```

Where:
- [`rimraf`](https://github.com/isaacs/rimraf) – Cross platform (Windows, Mac, Linux) `rm -rf` (remove) Linux alternative. Rollup or Typescript does not clean up the `/dist` directory themselves.
- [`npm-run-all`](https://github.com/mysticatea/npm-run-all) – Cross-platform tool to run multiple npm-scripts parallel or sequential.

Then update the `package.json`.
```js
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  
  // NEW
  "scripts":{
    "build": "npm-run-all --sequential 'build:clean' 'build:types' 'build:bundles'", // run one after another
    "build:clean": "rimraf dist", // clean up the dist directory
    "build:types": "tsc", // create type definitions
    "build:bundles": "rollup -c" // create bundles
  }
  
  "devDependencies": {/*...*/},
  "dependencies": {/*...*/},
  "peerDependencies": {/*...*/},
}
```

### 3.2.5 – Step 5 – Expose the bundles
At the end, we expose all our bundles in the `package.json`.
```js
{
  "name": "my-lib",
  "version": "1.0.0",
  "license": "MIT",
  // "main": "index.js", // <-- Removed from this line here and re-added a bit further down below
  "scripts": {/*...*/},
  "devDependencies": {/*...*/},
  "dependencies": {/*...*/},
  "peerDependencies": {/*...*/},
  
  // NEW 
  
  // Treat ".js" files as CJS
  "type": "commonjs",

  "exports": {
      ".": {
          // ESM entrypoint when using "import" statement or "import()" function in modern Node.js
          "import": "./dist/index.esm.js",
          
          //  CJS entrypoint when using "require()" function in modern Node.js
          "require": "./dist/index.cjs.js"
      }
  },
  // CJS fallback for older Node.js version
  "main": "./dist/index.cjs.js",
  
  // Fallback for build tools that do not yet support "exports"
  "module": "./dist/index.esm.js",
  
  // Fallback for typescript versions not supporting "exports"
  "types": "./dist/index.d.ts",
  
  // Serve UMD bundle for browsers
  "browser": "./dist/index.umd.js",
  
  // Serve UMD bundle for UNPKG CDN (which ignores "browser" field)
  "unpkg": "./dist/index.umd.js",
  
  // Serve UMD bundle for jsDelivr CDN 
  "jsdelivr": "./dist/index.umd.js",
  
  // Only include "dist/" and the default files, i.e. "package.json", "README", "LICENCE" and the file
  // in the "main" field in the published library.
  "files": [
      "dist"
  ],
  
  // Mark library side effect free to allow tree-shaking
  // In case using CSS, mark CSS files as NOT side effect free
  "sideEffects": false
}
```

We achieved our final `package.json` goal.

## 3.3.0 – Additional Steps
We've seen the basic setup and configuration of our library build. In addition, there are many additional steps that can be added to handle other kinds of resources.

### 3.3.1 – Images
Handling images in a library is always a tricky part. How do we guarantee that image imports are correctly resolved when an application consumes our library?

A popular solution to this question is converting the image to Base64, and inline it **in the HTML**. This completely removes the need for import resolution. However, this leads to a 33% increase in disk size. Therefore, as a general advice, keep the amount and sizes of images in a library to a minimum and limit yourself mainly to SVG images.

Handling and converting images can be done thanks to the [`@rollup/plugin-image`](https://github.com/rollup/plugins/tree/master/packages/image) plugin. The plugin handles JPG, PNG, GIF, SVG and WebP files.

```sh
yarn add --dev @rollup/plugin-image
# Or with npm:
npm install --save-dev @rollup/plugin-image
```

**`/rollup.config.js`**
```jsx
import image from '@rollup/plugin-image';

export default {
  // ...
  plugins: [
    // ...,
    image()
  ]
};
```


### 3.3.2 – Styling
CSS, SASS, CSS Modules, … stylesheet support is done with the [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss) plugin, using [PostCSS](https://github.com/postcss/postcss) under the hood.

> `rollup-plugin-postcss` is the first unofficial Rollup plugin we introduce. It's maintained by [many contributors](https://github.com/egoist/rollup-plugin-postcss/graphs/contributors) and over [300.000 weekly downloads on npmjs](https://www.npmjs.com/package/rollup-plugin-postcss).

```sh
yarn add --dev rollup-plugin-postcss postcss
# Or with npm:
npm install --save-dev rollup-plugin-postcss postcss
```

**`/rollup.config.js`**
```jsx
import postcss from 'rollup-plugin-postcss'

export default {
  // ...
  plugins: [
    // ...,
    postcss()
  ]
};
```

Since we're now using CSS files in our project, we have to mark them as side effects in our `package.json`.

```js
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  /*...*/

  // Mark CSS files as side effects
  "sideEffects": [
      "*.css",
      "*.scss", // SASS
      "*.less", // LESS
  ]
}
```

#### SASS/LESS
For SASS/LESS support, install [Dart Sass](https://www.npmjs.com/package/sass).

```sh
yarn add --dev sass
# Or with npm:
npm install --save-dev sass
```

> The plugin supports both Dart Sass and node-sass. Dart Sass is prefered over node-sass in case both dependencies exist in a project. [Node-sass is deperecated](https://www.npmjs.com/package/node-sass).
> -- [Issue #321](https://github.com/egoist/rollup-plugin-postcss/issues/321), [Pull Request #402](https://github.com/egoist/rollup-plugin-postcss/pull/402)

That's it, simply installing dart sass unlocked SASS/LESS support in `rollup-plugin-postcss`. You can now start using the `.scss` or `.less` files.

#### CSS Modules
**`/rollup.config.js`**
```jsx
import postcss from 'rollup-plugin-postcss'

export default {
  // ...
  plugins: [
    // ...,
    postcss({
      modules: true
    })
  ]
};
```

### 3.3.3 – Optimization
All our bundles can be further improved, saving bandwidth and reducing the bundle size of the final consuming application. 

We can minify our bundles using the [`rollup-plugin-terser`](https://github.com/TrySound/rollup-plugin-terser) plugin. The plugin uses [terser](https://github.com/terser/terser), a JavaScript compressor toolkit, under the hood.

```sh
yarn add --dev rollup-plugin-terser
# Or with npm
npm install --save-dev rollup-plugin-terser
```

**`/rollup.config.js`**
```jsx
import postcss from 'rollup-plugin-postcss'

export default {
  // ...
  plugins: [
    // ...,
    terser(),
  ]
};
```


# 4.0.0 – Development Environment
Developing a library differs a little to the way we're used to.

### 4.0.1 – Local Development
We haven't checked the `<Button>` component a single time, to see if it's actually working. Therefore, we have to somehow render it in a browser.

There are many development approaches, with each their advantages and disadvantages.

#### Demo application
A straightforward solution is to install a demo `create-react-app` application, putting it in a `/demo` folder in the root directory. Then, simply include the components by their paths, e.g., `import { Button } from "./../src/components/Button"`. 

The demo application renders the components, but can also serve as a playground for non UI items like Hooks, utility methods, … .

One major downside is, that you have to set up the demo environment yourself.

#### Component Development Tool
Component development tools like [Storybook](https://storybook.js.org/), [Docz](https://www.docz.site/) or [Styleguidist](https://react-styleguidist.js.org/) can replace *demo applications*. These tools provide a canvas, props and code playground, allowing you to experiment with each component in an isolated sandbox. Additionally, they serve as the documentation for your library.

Storybook offers the closest *demo application* experience with all its features allowing you to quickly modify props and state. It may be the best choice, but comes at a price of a steeper learning curve and more time-consuming setup, compared to Styleguidist and Docz.

For the inexperienced, a Storybook should be the preferred tool.

#### Include in real application
You can also include the library from very the beginning  in a real application. This approach might be only suited for dev-teams building in-house libraries.

A common process is to use `npm link` or `yarn link`, to create symlinks between an application and a library directory. While this is a valid solution, a developer should know about the `npm link` or `yarn link` obstacles in a React setup, explained in [this article](https://mcocirio.medium.com/unsolving-the-mysteries-of-yarn-npm-link-for-libraries-development-41daa51a7cc6).

A better process would be to use [`yalc`](https://github.com/wclr/yalc), a tool mimicking `npm` locally and thereby avoiding the React linking issues from the previous mentioned article. On a note, after you added a library to a project with yalc, and said library has regular `dependencies`, then you must run `npm install`/`yarn install` in the project directory once to install the regular dependencies too. `yalc` does not install libraries in `node_modules`, but in its on version, the `.yalc` directory.

---

Now the library is ready to be submitted to [www.npm.js](https://www.npmjs.com/) or whatever package repository you end up choosing.
