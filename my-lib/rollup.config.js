import pkg from "./package.json"; // was require
import path from "path"; // was require
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];
// Node.js external dependencies (not for IIFE or UMD)
const external = ["react", "react-dom"];
// UMD external dependencies
const globals = {
  react: "React",
  "react-dom": "ReactDom",
};

export default [
  // CJS and ESM
  {
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
    // Dependencies that should not be bundled
    external,
  },
  // UMD
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        // UMD requires a bundle name
        name: "myLib",
        globals,
      },
    ],
    plugins: [
      // Helper to locate node_modules modules
      nodeResolve(
        
        {
          // pass custom options to the resolve plugin
          customResolveOptions: {
            moduleDirectory: "node_modules",
          },
          // Only activate the plugin on files from the extensions list
          extensions,
        }
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
    // Dependencies that should not be bundled
    external,
  },
];
