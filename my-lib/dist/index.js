'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var lodashEs = require('lodash-es');
var Pin = require('./Pin-336a42cb.js');

var styles = {"banana":"Button-module_banana__8v-it"};

function Button(props) {
  var lastVal = lodashEs.last([1, 2, 3]);
  return /*#__PURE__*/Pin.jsxRuntime.exports.jsxs("div", {
    className: styles.banana,
    children: [/*#__PURE__*/Pin.jsxRuntime.exports.jsx(Pin.SvgPin, {}), /*#__PURE__*/Pin.jsxRuntime.exports.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

exports.Button = Button;
