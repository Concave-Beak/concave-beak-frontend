import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";

export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      unicorn,
      sonarjs,
    },

    rules: {
      "no-undef": "off",

      // TypeScript
      ...tsPlugin.configs.recommended.rules,

      // Unicorn
      ...unicorn.configs.recommended.rules,

      // SonarJS
      ...sonarjs.configs.recommended.rules,

      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignore: [0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],

      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      curly: "error",
      "no-implicit-coercion": "error",
      "no-unused-vars": "warn",
    },
  },
]);
