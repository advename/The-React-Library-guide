module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false }],
    [
      "@babel/preset-react",
      {
        // Use the modern JSX runtime technique with "automatic"
        // This removes the need to import react in each file
        // Read more: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
};

// // https://babeljs.io/docs/en/presets/

// /**
//  * Babel presets which all babel environment must use
//  * Presets: https://babeljs.io/docs/en/options#presets
//  * Note: presets Order DOES matter, reads from bottom to top: https://stackoverflow.com/a/39798873/3673659
//  */
// const sharedPresets = [
//   [
//     "@babel/preset-react",
//     {
//       // Use the modern JSX runtime technique with "automatic"
//       // This removes need to import react in each file
//       // Read more: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform
//       runtime: "automatic",
//     },
//   ],
//   "@babel/preset-typescript",
// ];
// const sharedConfig = {
//   presets: sharedPresets,
//   ignore: [
//     "dist",
//     "node_modules",
//     "lib",
//     "**/__tests__",
//     "**/__mocks__",
//     "**/__snapshots__",
//     "**/*.test.*",
//     "**/*.spec.*",
//     "**/*.mock.*"
//   ], // ignore test files from transpilations
// };

// /**
//  * The Babel export, but with exporting in three environments. This is a custom setup,
//  * where we specify the environment during the CLI execution
//  */
// module.exports = {
//   env: {
//     // the unbundled but transpiled ESM version
//     esmUnbundled: coreConfig,
//     // the bundled and transpiled ESM version
//     esmBundled: {
//       ...coreConfig, // copy whatever we have in the coreConfig
//       presets: [
//         // overwrite the coreConfig "presets" attribute
//         ["@babel/preset-env", {}], // add the Es5 transpiler first, so it is ran as last (remember, bottom to top)
//         ...corePresets, // add all corePresets presets
//       ],
//     },
//     // the bundled and transpiled CJS version
//     cjsBundled: {
//       ...coreConfig, // copy whatever we have in the coreConfig
//       presets: [
//         // overwrite the coreConfig "presets" attribute
//         ["@babel/preset-env", { modules: "commonjs" }], // add the Es5 transpiler first, so it is ran as last (remember, bottom to top)
//         ...corePresets, // add all corePresets presets
//       ],
//     },
//   },
// };
