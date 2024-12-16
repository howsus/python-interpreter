const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.eslint.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parserOptions: {
    project,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  plugins: ["only-warn"],
  env: {
    node: true,
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
      rules: {
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["*.config.ts", "*.config.js"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
