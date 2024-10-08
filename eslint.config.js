import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type { import("eslint").Linter.Config[] } */
export default tseslint.config(
  { ignores: ["**/dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["server/**/*.ts"],
    languageOptions: { globals: globals.node },
    rules: { "no-empty-pattern": 0 },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["client/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
