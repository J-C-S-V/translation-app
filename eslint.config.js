import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Your rules here
      semi: ["error", "always"],
      "react/react-in-jsx-scope": "off",
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
