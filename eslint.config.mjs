import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginUnusedImports from "eslint-plugin-unused-imports";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // Base JS rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
      "unused-imports": pluginUnusedImports,
    },
    rules: {
      // Disable the built-in unused vars rule
      "no-unused-vars": "off",

      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // Warn on unused vars but ignore those starting with "_"
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
];
