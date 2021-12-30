const packageJson = require("./package.json");
const path = require("path");

import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];
const external = ["react", "react-dom"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    // Helper to locate node_modules modules
    nodeResolve(
      // Only activate the plugin on files from the extensions list
      { extensions }
    ),
    // Helper to convert CJS modules to ESM
    commonjs({
      // Only run the helper on legacy node_modules dependencies that use CJS
      include: ["node_modules/**"],
    }),
    babel({
      babelHelpers: "bundled",
      include: ["src/**/*"],
      exclude: ["node_modules/**"],
      extensions,
    }),
  ],
  external,
};
