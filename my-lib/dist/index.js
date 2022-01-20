'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var lodashEs = require('lodash-es');
var icons = require('./icons.js');
var jsxRuntime = require('react/jsx-runtime');

var styles = {"banana":"Button-module_banana__8v-it"};

function Button(props) {
  var lastVal = lodashEs.last([1, 2, 3]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: styles.banana,
    children: [/*#__PURE__*/jsxRuntime.jsx(icons.Pin, {}), /*#__PURE__*/jsxRuntime.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

exports.Button = Button;
