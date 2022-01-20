import pkg from "./package.json"; // was require
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

// Shared
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];


const manualChunks = {
  index: ["src/index.ts"],
  icons: ["src/icons/index.tsx"],
};

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
        manualChunks,
      },
      {
        dir: "./dist",
        format: "esm",
        manualChunks,
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
    ],
    // Dependencies that should not be bundled
    external: [
      ...Object.keys(pkg.dependencies || {}), // <-- UPDATED
      ...Object.keys(pkg.peerDependencies || {}), // <-- UPDATED
      "react/jsx-runtime", // <- uncommenting this removes jsx-runtime beeing bundled
    ],
  },
];
