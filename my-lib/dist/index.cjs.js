'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var lodashEs = require('lodash-es');
var jsxRuntime = require('react/jsx-runtime');

var img$1 = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.48 122.88'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%232470bd%3b%7d.cls-1%2c.cls-2%7bfill-rule:evenodd%3b%7d.cls-2%7bfill:%231a1a1a%3b%7d%3c/style%3e%3c/defs%3e%3ctitle%3epush-pin-blue%3c/title%3e%3cpath class='cls-1' d='M121.21%2c36.53%2c85.92%2c1.23c-3-3-7.77.1-9.2%2c2.74-.24.45.19.86-.2%2c3.92A46.27%2c46.27%2c0%2c0%2c1%2c73.8%2c19.21L58.11%2c34.91c-6.27%2c6.26-15.23%2c3.48-22.87-.32-1.62-.8-3.69-2.57-5.48-.78l-6.64%2c6.64a2.49%2c2.49%2c0%2c0%2c0%2c0%2c3.53L78.9%2c99.76a2.5%2c2.5%2c0%2c0%2c0%2c3.53%2c0l6.64-6.64c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.41-.78-22.08l16.39-16.39a84.14%2c84.14%2c0%2c0%2c1%2c11.35-2.57c3.09-.49%2c3.47-.11%2c3.91-.4%2c2.71-1.74%2c5.7-6.15%2c2.68-9.17Z'/%3e%3cpolygon class='cls-2' points='53.48 82.11 40.77 69.4 0 120.96 1.92 122.88 53.48 82.11 53.48 82.11'/%3e%3c/svg%3e";

// @ts-nocheck
function Button(props) {
  var lastVal = lodashEs.last([1, 2, 3]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    children: [/*#__PURE__*/jsxRuntime.jsx("img", {
      src: img$1,
      alt: "Logo"
    }), /*#__PURE__*/jsxRuntime.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

var img = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.48 122.88'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%232470bd%3b%7d.cls-1%2c.cls-2%7bfill-rule:evenodd%3b%7d.cls-2%7bfill:%231a1a1a%3b%7d%3c/style%3e%3c/defs%3e%3ctitle%3epush-pin-blue%3c/title%3e%3cpath class='cls-1' d='M121.21%2c36.53%2c85.92%2c1.23c-3-3-7.77.1-9.2%2c2.74-.24.45.19.86-.2%2c3.92A46.27%2c46.27%2c0%2c0%2c1%2c73.8%2c19.21L58.11%2c34.91c-6.27%2c6.26-15.23%2c3.48-22.87-.32-1.62-.8-3.69-2.57-5.48-.78l-6.64%2c6.64a2.49%2c2.49%2c0%2c0%2c0%2c0%2c3.53L78.9%2c99.76a2.5%2c2.5%2c0%2c0%2c0%2c3.53%2c0l6.64-6.64c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.41-.78-22.08l16.39-16.39a84.14%2c84.14%2c0%2c0%2c1%2c11.35-2.57c3.09-.49%2c3.47-.11%2c3.91-.4%2c2.71-1.74%2c5.7-6.15%2c2.68-9.17Z'/%3e%3cpolygon class='cls-2' points='53.48 82.11 40.77 69.4 0 120.96 1.92 122.88 53.48 82.11 53.48 82.11'/%3e%3c/svg%3e";

// @ts-nocheck
function Paint(props) {
  var lastVal = lodashEs.last([1, 2, 3]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    children: [/*#__PURE__*/jsxRuntime.jsx("img", {
      src: img,
      alt: "Logo"
    }), /*#__PURE__*/jsxRuntime.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

exports.Button = Button;
exports.Paint = Paint;
//# sourceMappingURL=index.cjs.js.map
