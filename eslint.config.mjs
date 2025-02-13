import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Example: Adjust specific rules to warn
      "no-unused-vars": "warn",
      "react/prop-types": "warn",
    },
    settings: {
      next: {
        rootDir: ["./"], // Adjust root directory as needed
      },
    },
  },
];

export default eslintConfig;
