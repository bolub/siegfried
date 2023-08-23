/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "no-relative-import-paths", "todo-plz"],
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      { allowSameFolder: false },
    ],
    "todo-plz/ticket-ref": [
      "error",
      {
        commentPattern: "TODO \\[(ISSUE )?[#0-9]+\\]:.+",
        description: "Example: // TODO [300]: Do something awesome",
      },
    ],
  },
};

module.exports = config;
