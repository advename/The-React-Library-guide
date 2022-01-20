import 'react';
import { jsxs, jsx } from 'react/jsx-runtime';

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SvgPin = function SvgPin(props) {
  return /*#__PURE__*/jsxs("svg", _objectSpread$1(_objectSpread$1({
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 122.48 122.88"
  }, props), {}, {
    children: [/*#__PURE__*/jsx("path", {
      d: "M121.21 36.53 85.92 1.23c-3-3-7.77.1-9.2 2.74-.24.45.19.86-.2 3.92a46.27 46.27 0 0 1-2.72 11.32l-15.69 15.7c-6.27 6.26-15.23 3.48-22.87-.32-1.62-.8-3.69-2.57-5.48-.78l-6.64 6.64a2.49 2.49 0 0 0 0 3.53L78.9 99.76a2.5 2.5 0 0 0 3.53 0l6.64-6.64c1.77-1.77-.49-4.06-1.41-6-3.4-7-6.45-16.41-.78-22.08l16.39-16.39a84.14 84.14 0 0 1 11.35-2.57c3.09-.49 3.47-.11 3.91-.4 2.71-1.74 5.7-6.15 2.68-9.17Z",
      style: {
        fillRule: "evenodd",
        fill: "#2470bd"
      }
    }), /*#__PURE__*/jsx("path", {
      style: {
        fill: "#1a1a1a",
        fillRule: "evenodd"
      },
      d: "M53.48 82.11 40.77 69.4 0 120.96l1.92 1.92 51.56-40.77z"
    })]
  }));
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SvgPlus = function SvgPlus(props) {
  return /*#__PURE__*/jsxs("svg", _objectSpread(_objectSpread({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 60 60"
  }, props), {}, {
    children: [/*#__PURE__*/jsx("path", {
      style: {
        strokeLinejoin: "round",
        stroke: "#fff",
        strokeLinecap: "round",
        strokeWidth: 5,
        fill: "none"
      },
      d: "M23.78 23.78V9.781c0-1.959.536-3.55 1.607-4.774 1.071-1.255 2.601-1.882 4.59-1.882s3.519.627 4.59 1.882C35.669 6.23 36.22 7.822 36.22 9.78V23.78h13.816c2.019 0 3.611.55 4.773 1.653 1.194 1.07 1.791 2.586 1.791 4.544 0 1.989-.597 3.534-1.791 4.636-1.162 1.102-2.754 1.652-4.773 1.652H36.22v13.954c0 1.989-.551 3.596-1.653 4.82-1.101 1.224-2.632 1.836-4.59 1.836s-3.488-.612-4.59-1.836c-1.071-1.224-1.607-2.831-1.607-4.82V36.265H9.964c-1.958 0-3.55-.596-4.774-1.79-1.193-1.224-1.79-2.723-1.79-4.498 0-1.958.582-3.473 1.745-4.544 1.193-1.102 2.8-1.653 4.82-1.653H23.78z"
    }), /*#__PURE__*/jsx("path", {
      style: {
        fill: "#000"
      },
      d: "M23.78 23.78V9.781c0-1.959.536-3.55 1.607-4.774 1.071-1.255 2.601-1.882 4.59-1.882s3.519.627 4.59 1.882C35.669 6.23 36.22 7.822 36.22 9.78V23.78h13.816c2.019 0 3.611.55 4.773 1.653 1.194 1.07 1.791 2.586 1.791 4.544 0 1.989-.597 3.534-1.791 4.636-1.162 1.102-2.754 1.652-4.773 1.652H36.22v13.954c0 1.989-.551 3.596-1.653 4.82-1.101 1.224-2.632 1.836-4.59 1.836s-3.488-.612-4.59-1.836c-1.071-1.224-1.607-2.831-1.607-4.82V36.265H9.964c-1.958 0-3.55-.596-4.774-1.79-1.193-1.224-1.79-2.723-1.79-4.498 0-1.958.582-3.473 1.745-4.544 1.193-1.102 2.8-1.653 4.82-1.653H23.78z"
    })]
  }));
};

export { SvgPin as Pin, SvgPlus as Plus };
