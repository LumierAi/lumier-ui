import { resolve } from "node:path";

import jsPlugin from "@eslint/js";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import * as typescriptParser from "@typescript-eslint/parser";
import * as filePlugin from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import simpleImportPlugin from "eslint-plugin-simple-import-sort";
import vuePlugin from "eslint-plugin-vue";
import globals from "globals";
import vueParser from "vue-eslint-parser";

export default [
  {
    files: ["**/*.{j,t}s?(x)", "**/*.vue"],
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/android/**",
      "**/ios/**",
      "**/bin/**",
      "**/.nuxt/**",
      "**/*.yml",
      "**/*.yaml",
      "**/*.d.ts",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        Locale: true,
      },
    },

    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: "error",
    },

    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportPlugin,
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
      "check-file": filePlugin,
    },

    rules: {
      ...jsPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "import/no-unresolved": ["error"],

      "prettier/prettier": ["error"],

      "@typescript-eslint/no-useless-constructor": "error",

      "@typescript-eslint/consistent-type-imports": "error",
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: "return",
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["const", "let", "block-like"],
        },
        {
          blankLine: "always",
          next: ["const", "let", "block-like"],
          prev: "*",
        },
        { blankLine: "any", next: ["const"], prev: ["const"] },
        { blankLine: "any", next: ["let"], prev: ["let"] },
      ],

      "simple-import-sort/imports": "error",

      /*      "check-file/filename-naming-convention": [
        "error",
        {
          "**!/!*.use*.{js,ts}": "CAMEL_CASE",
          "**!/!{use}*.{js,ts}": "PASCAL_CASE",
          "**!/![*.{js,ts}": "FLAT_CASE",
          "**!/!*.vue": "PASCAL_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],*/

      "check-file/folder-naming-convention": [
        "error",
        {
          "**/apps/**/!(__spec__)/**/": "KEBAB_CASE",
          "**/packages/**/!(__spec__)/**/": "KEBAB_CASE",
        },
      ],
    },

    settings: {
      "import/extensions": [".ts", ".js", ".mjs", ".cjs"],

      "import/external-module-folders": [
        ".nuxt",
        "node_modules",
        "android",
        "ios",
      ],

      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".js", ".mjs", ".cjs"],
      },

      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: [resolve(process.cwd(), "./tsconfig.json")],
        },

        node: {
          moduleDirectory: [".nuxt", "node_modules", "android", "ios"],
          extensions: [".ts", ".js", ".mjs", ".cjs"],
        },
      },
    },
  },
  {
    files: ["**/*.vue"],
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/android/**",
      "**/ios/**",
    ],
    plugins: {
      vue: vuePlugin,
    },

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: "module",
      },
    },

    rules: {
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs["vue3-essential"].rules,
      ...vuePlugin.configs["vue3-strongly-recommended"].rules,
      ...vuePlugin.configs.recommended.rules,

      "vue/comment-directive": "off",
      "vue/no-mutating-props": [
        "error",
        {
          shallowOnly: true,
        },
      ],
      "vue/singleline-html-element-content-newline": "off",
      "vue/multi-word-component-names": "off",

      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
        },
      ],
      "vue/block-order": [
        "error",
        {
          order: ["template", "script[setup]", "style"],
        },
      ],
    },
  },
  {
    files: ["**/{server,dev-proxy}/**/*.{j,t}s?(x)"],

    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.nuxt/**",
      "**/android/**",
      "**/ios/**",
    ],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    ...securityPlugin.configs.recommended,
  },
];
