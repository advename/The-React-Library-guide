import path from "path";
import fs from "fs";
import pkg from "./package.json"; // was require
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss'

import image from "@rollup/plugin-image";



const ism = [
  image(),
  postcss({
    modules: true
  })
];

// Shared
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];


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
      nodeResolve({
        // Only activate the plugin on files from the extensions list
        extensions,
      }),
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
      ...ism,
    ],
    // Dependencies that should not be bundled
    external: [
      ...Object.keys(pkg.dependencies || {}), // <-- UPDATED
      ...Object.keys(pkg.peerDependencies || {}), // <-- UPDATED
    ],
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
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    ],
    plugins: [
      // Helper to locate node_modules modules
      nodeResolve({
        // Only activate the plugin on files from the extensions list
        extensions,
      }),
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
      ...ism,
    ],
    // Dependencies that should not be bundled
    external: [
      ...Object.keys(pkg.peerDependencies || {}), // <-- UPDATED
    ],
  },
];

function svgResolverPlugin() {
  return {
    name: "svg-resolver",
    resolveId(source, importer) {
      if (source.endsWith(".jpg")) {
        dump("SSSS", path.basename(source));
        const referenceId = this.emitFile({
          type: "asset",
          name: path.basename(source),
          source: fs.readFileSync(source),
        });
        return { id: referenceId, external: true };
      }
    },
  };
}

function dump(id, txt) {
  console.log("==========");
  console.log(id, txt);
  console.log("==========");
}

function externalAsset({ include, copyTargets, assetTargetDir }) {
  const isMatchSingle = function (include, module) {
    return new RegExp(include, "g").test(module);
  };

  const isMatch = function (include, module) {
    if (include === undefined) return true;
    return Array.isArray(include)
      ? include.some((i) => isMatchSingle(i, module))
      : isMatchSingle(include, module);
  };

  return {
    name: "rollup-plugin-external-asset",
    resolveId(source) {
      if (!isMatch(include, source)) return null;
      copyTargets && copyTargets.push({ src: source, dest: assetTargetDir });
      return { id: source, external: true };
    },
  };
}
