const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  arrowParens: 'always',
  proseWrap: 'never',
  parser: 'typescript',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  bracketSameLine: true,
  overrides: [
    {
      files: ['**/*.json'],
      options: {
        parser: 'json'
      }
    },
    {
      files: ['**/*.yml', '**/*.yaml'],
      options: {
        parser: 'yaml'
      }
    },
    {
      files: ['**/*.md'],
      options: {
        parser: 'markdown'
      }
    },
    {
      files: ['src/**/*.html'],
      options: {
        parser: 'angular'
      }
    },
    {
      files: ['src/**/*.scss'],
      options: {
        parser: 'scss'
      }
    },
    {
      files: ['src/**/*.css'],
      options: {
        parser: 'css'
      }
    }
  ]
};

module.exports = config;
