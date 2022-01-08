import path from "path";
import fs from "fs";
import pkg from "./package.json"; // was require
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import url from "@rollup/plugin-url";
import image from "@rollup/plugin-image";
import svg from "rollup-plugin-svg";
import svgo from "rollup-plugin-svgo";

const copyTargets = [];
// Shared
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];
const urlOptions = {
  // destDir: path.join(__dirname, 'dist'),
  // sourceDir: path.join(__dirname), // Set the "[dirname]" value. path.join(__dirname) returns the path of the file's location
  // fileName: './[dirname][hash][extname]',
  // emitFiles: false
  // publicPath: "./assets"
};

// const imageConfig = {
//   dom: true
// }

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
      svgResolverPlugin(),
      // url(urlOptions)
      // image(imageConfig),
      // svg(),
      //   externalAsset({
      //     include: [".jpg$"],
      //     copyTargets: copyTargets,
      //     assetTargetDir: "dist/assets",
      // }),
      // svgo(),
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
      svgResolverPlugin(),
      // url(urlOptions),
      // image(imageConfig),
      // externalAsset({
      //   include: [".jpg$"],
      //   copyTargets: copyTargets,
      //   assetTargetDir: "dist/assets",
      // }),
      // svgo(),
    ],
    // Dependencies that should not be bundled
    external: [
      ...Object.keys(pkg.peerDependencies || {}), // <-- UPDATED
    ],
  },
];

function svgResolverPlugin() {
  return {
    name: 'svg-resolver',
    resolveId(source, importer) {
      if (source.endsWith('.jpg')) {
        dump("SSSS", path.basename(source))
        const referenceId = this.emitFile({
          type: 'chunk',
          id: "assets2/" ,
          source: fs.readFileSync(source)
        });
        return { id: referenceId, external: true };
      }
    }
  };
}

function dump(id,txt){
  console.log("==========");
  console.log(id,txt);
  console.log("==========");
}
