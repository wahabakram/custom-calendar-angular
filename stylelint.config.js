module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'no-empty-source': null,
    'declaration-no-important': true,
    'block-no-empty': true,
    'at-rule-no-unknown': null,
    'scss/load-no-partial-leading-underscore': null,
    'selector-class-pattern': [
      '^\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$', // BEM class-names regex
      {
        resolveNestedSelectors: true
      }
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ]
  }
};
