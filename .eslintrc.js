module.exports = {
  env: {
    jest: true,
  },
  extends: ["airbnb-typescript-prettier"],
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  plugins: ["filenames"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 80,
        bracketSpacing: true,
        jsxBracketSameLine: false,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: ["ts", "tsx"],
      },
    ],
    "prefer-destructuring": ["error", { object: true, array: false }],
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": 0,
    "no-restricted-imports": 0,
    "import/prefer-default-export": 0,
    // allow param reassign for redux-toolkit
    "no-param-reassign": ["error", { props: false }],
    // disabling circular dependency, as it is causing issues
    "import/no-cycle": 0,
    // no return types needed if it can be inferred. useful for react components and sagas so it's less to worry about
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "react/require-default-props": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "styles/**",
            group: "internal",
            position: "after",
          },
          { group: "builtin", pattern: "react", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
