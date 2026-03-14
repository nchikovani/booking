import { getNestJsConfig } from "@repo/eslint-config/nestjs";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  ...getNestJsConfig(import.meta.dirname),
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  {
    ignores: ["eslint.config.mjs"],
  },
];
