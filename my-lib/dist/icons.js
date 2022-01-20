'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Pin = require('./Pin-336a42cb.js');
require('react');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SvgPlus = function SvgPlus(props) {
  return /*#__PURE__*/Pin.jsxRuntime.exports.jsxs("svg", _objectSpread(_objectSpread({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 60 60"
  }, props), {}, {
    children: [/*#__PURE__*/Pin.jsxRuntime.exports.jsx("path", {
      style: {
        strokeLinejoin: "round",
        stroke: "#fff",
        strokeLinecap: "round",
        strokeWidth: 5,
        fill: "none"
      },
      d: "M23.78 23.78V9.781c0-1.959.536-3.55 1.607-4.774 1.071-1.255 2.601-1.882 4.59-1.882s3.519.627 4.59 1.882C35.669 6.23 36.22 7.822 36.22 9.78V23.78h13.816c2.019 0 3.611.55 4.773 1.653 1.194 1.07 1.791 2.586 1.791 4.544 0 1.989-.597 3.534-1.791 4.636-1.162 1.102-2.754 1.652-4.773 1.652H36.22v13.954c0 1.989-.551 3.596-1.653 4.82-1.101 1.224-2.632 1.836-4.59 1.836s-3.488-.612-4.59-1.836c-1.071-1.224-1.607-2.831-1.607-4.82V36.265H9.964c-1.958 0-3.55-.596-4.774-1.79-1.193-1.224-1.79-2.723-1.79-4.498 0-1.958.582-3.473 1.745-4.544 1.193-1.102 2.8-1.653 4.82-1.653H23.78z"
    }), /*#__PURE__*/Pin.jsxRuntime.exports.jsx("path", {
      style: {
        fill: "#000"
      },
      d: "M23.78 23.78V9.781c0-1.959.536-3.55 1.607-4.774 1.071-1.255 2.601-1.882 4.59-1.882s3.519.627 4.59 1.882C35.669 6.23 36.22 7.822 36.22 9.78V23.78h13.816c2.019 0 3.611.55 4.773 1.653 1.194 1.07 1.791 2.586 1.791 4.544 0 1.989-.597 3.534-1.791 4.636-1.162 1.102-2.754 1.652-4.773 1.652H36.22v13.954c0 1.989-.551 3.596-1.653 4.82-1.101 1.224-2.632 1.836-4.59 1.836s-3.488-.612-4.59-1.836c-1.071-1.224-1.607-2.831-1.607-4.82V36.265H9.964c-1.958 0-3.55-.596-4.774-1.79-1.193-1.224-1.79-2.723-1.79-4.498 0-1.958.582-3.473 1.745-4.544 1.193-1.102 2.8-1.653 4.82-1.653H23.78z"
    })]
  }));
};

exports.Pin = Pin.SvgPin;
exports.Plus = SvgPlus;
