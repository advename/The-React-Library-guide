(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react/jsx-runtime')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react/jsx-runtime'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myLib = {}, global.React, global.jsxRuntime));
})(this, (function (exports, react, jsxRuntime) { 'use strict';

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
  }

  var dog = "50c137ffcd659e4f.jpg";

  // @ts-nocheck
  function Button(props) {
    var lastVal = last([1, 2, 3]);
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
