'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var lodashEs = require('lodash-es');
var jsxRuntime = require('react/jsx-runtime');

var dog = "50c137ffcd659e4f.jpg";

// @ts-nocheck
function Button(props) {
  var lastVal = lodashEs.last([1, 2, 3]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    children: [/*#__PURE__*/jsxRuntime.jsx("img", {
      src: dog,
      alt: "Logo"
    }), /*#__PURE__*/jsxRuntime.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

exports.Button = Button;
//# sourceMappingURL=index.cjs.js.map
