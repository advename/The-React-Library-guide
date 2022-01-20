import 'react';
import { last } from 'lodash-es';
import { S as SvgPin } from './Pin-ef544606.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';

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
