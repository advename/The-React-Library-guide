import 'react';
import { last } from 'lodash-es';
import { j as jsxRuntime, S as SvgPin } from './Pin-a005d1f7.mjs';

var styles = {"banana":"Button-module_banana__8v-it"};

function Button(props) {
  var lastVal = last([1, 2, 3]);
  return /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
    className: styles.banana,
    children: [/*#__PURE__*/jsxRuntime.exports.jsx(SvgPin, {}), /*#__PURE__*/jsxRuntime.exports.jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

export { Button };
