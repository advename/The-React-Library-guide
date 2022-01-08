import 'react';
import { last } from 'lodash-es';
import { jsxs, jsx } from 'react/jsx-runtime';

var dog = "50c137ffcd659e4f.jpg";

// @ts-nocheck
function Button(props) {
  var lastVal = last([1, 2, 3]);
  return /*#__PURE__*/jsxs("div", {
    children: [/*#__PURE__*/jsx("img", {
      src: dog,
      alt: "Logo"
    }), /*#__PURE__*/jsxs("button", {
      children: [props.text, " -T ", lastVal]
    })]
  });
}

export { Button };
//# sourceMappingURL=index.esm.js.map
