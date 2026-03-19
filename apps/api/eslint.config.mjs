import { getNestJsConfig } from "@repo/eslint-config/nestjs";

export default [
  ...getNestJsConfig(import.meta.dirname),
  {
    ignores: ["eslint.config.mjs"],
  },
];
