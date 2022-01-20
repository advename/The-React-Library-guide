import pkg from "./package.json"; // was require
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";

// Shared
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

export default [
  // CJS and ESM
  {
    input: {
      index: "src/index.ts",
      icons: "src/icons/index.tsx",
    },
    output: [
      {
        dir: "./dist",
        format: "cjs",
      },
      {
        dir: "./dist",
        format: "esm",
        entryFileNames: "[name].mjs",
        chunkFileNames: "[name]-[hash].mjs",
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
        include: [/node_modules/],
      }),
      babel({
        babelHelpers: "runtime",
        include: ["src/**/*"],
        extensions,
        skipPreflightCheck: true,
      }),
      postcss({
        // Enable CSS Modules
        modules: true,
        // Instead of injecting all CSS in "<head>", yield it to a file
        extract: "index.css",
      }),
      alias({
        entries: [
          {
            find: "react/jsx-dev-runtime",
            replacement: "react/jsx-dev-runtime.js",
          },
          { find: "react/jsx-runtime", replacement: "react/jsx-runtime.js" },
        ],
      }),
    ],
    // Dependencies that should not be bundled
    external: [
      ...Object.keys(pkg.dependencies || {}), // <-- UPDATED
      ...Object.keys(pkg.peerDependencies || {}), // <-- UPDATED
      "react/jsx-runtime", // <- uncommenting this removes jsx-runtime beeing bundled
    ],
  },
];
