const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    "eslint-config-prettier",
  ],
  plugins: ["only-warn", "simple-import-sort"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  parserOptions: {
    project,
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^node:"],
          ["^@?\\w"],
          ["^@ai-ui/"],
          ["^\\."],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "warn",
    "import/no-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "react/function-component-definition": "off",
  },
  overrides: [
    {
      files: ["*.config.{js,cjs,ts}"],
      env: {
        node: true,
      },
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
