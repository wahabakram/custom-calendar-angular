// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const importPlugin = require('eslint-plugin-import');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = tseslint.config(
  {
    ignores: [
      'package.json',
      'package-lock.json',
      'dist',
      'e2e/**',
      'karma.conf.js',
      'commitlint.config.js',
      'eslint.config.ts',
      'cypress',
      'cypress.config.ts',
      'src/assets',
      'src/stories/',
      'public',
      'src/environments',
      '.firebaserc',
      'LICENSE'
    ]
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
      // Import order plugin
      importPlugin.flatConfigs?.recommended,
      importPlugin.flatConfigs?.typescript,
      importPlugin.flatConfigs?.warnings,
      importPlugin.flatConfigs?.errors
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    plugins: {
      'unused-imports': {
        processors: unusedImports.default?.processors,
        rules: unusedImports.default?.rules
      }
    },
    processor: angular.processInlineTemplates,
    rules: {
      ...unusedImports.default?.rules,
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/namespace': ['error', { allowComputed: true }],
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          'newlines-between': 'always', // Changed configuration here to get proper imports order I want
          groups: [
            // Changed configuration here to get proper imports order I want
            'internal', // angular imports - configured in 'import/internal-regex'
            'unknown', // rxjs imports
            'external', // all libraries imports - configured in 'import/external-module-folders'
            'builtin', // internal-library imports
            ['parent', 'sibling', 'index'] // relative paths
          ],
          pathGroups: [
            // Changed configuration here to get proper imports order I want
            {
              pattern: 'rxjs',
              group: 'unknown'
            },
            {
              pattern: 'rxjs/**',
              group: 'unknown'
            },
            {
              pattern: '@internal-library',
              group: 'builtin'
            }
          ],
          pathGroupsExcludedImportTypes: ['type', 'object']
        }
      ],
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'max-len': [
        'error',
        {
          code: 200
        }
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'log']
        }
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: 'off',
      'no-empty-function': 'off',
      'no-duplicate-imports': 'error',
      'no-var': 'error',
      'no-debugger': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      // '@angular-eslint/no-host-metadata-property': ['error', { allowStatic: true }],
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': [
        'error',
        {
          allowedNames: ['aria-describedby']
        }
      ],
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // Static members (grouped by visibility)
            'private-static-field',
            'protected-static-field',
            'public-static-field',

            // Instance fields (grouped by visibility)
            'private-instance-field',
            'protected-instance-field',
            'public-instance-field',

            // Constructor (typically comes after fields)
            'constructor',

            // Static methods (grouped by visibility)
            'private-static-method',
            'protected-static-method',
            'public-static-method',

            // Instance methods (grouped by visibility)
            'private-instance-method',
            'protected-instance-method',
            'public-instance-method'
          ]
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'no-public'
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE']
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['StrictPascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will']
        },
        {
          selector: 'function',
          format: ['strictCamelCase']
        },
        {
          selector: 'parameter',
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'require'
        },
        {
          selector: 'typeLike',
          format: ['StrictPascalCase']
        },
        {
          selector: 'enum',
          format: ['StrictPascalCase'],
          filter: {
            regex: '^X[A-Z]',
            match: false
          }
        },
        {
          selector: 'enumMember',
          format: ['StrictPascalCase'],
          filter: {
            regex: '^X[A-Z]',
            match: false
          }
        }
      ],
      '@typescript-eslint/no-dynamic-delete': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended
    ],
    rules: {
      '@angular-eslint/template/eqeqeq': [
        'warn',
        {
          allowNullOrUndefined: true
        }
      ],
      'prettier/prettier': [
        'error',
        {
          parser: 'angular',
          endOfLine: 'auto'
        }
      ]
    }
  }
);
