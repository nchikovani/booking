import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * Returns ESLint configuration for NestJS backend.
 * @param {string} tsconfigRootDir - Path to the project root (e.g. import.meta.dirname)
 * @returns {import("eslint").Linter.Config[]}
 */
export function getNestJsConfig(tsconfigRootDir) {
  return [
    ...baseConfig,
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
      },
    },
  ];
}
