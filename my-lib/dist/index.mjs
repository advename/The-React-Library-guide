import 'react';
import { last } from 'lodash-es';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Pin as SvgPin } from './icons.mjs';

var styles = {"banana":"Button-module_banana__8v-it"};

function Button(props) {
  var lastVal = last([1, 2, 3]);
  return /*#__PURE__*/jsxs("div", {
    className: styles.banana,
    children: [/*#__PURE__*/jsx(SvgPin, {}), /*#__PURE__*/jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

export { Button };
