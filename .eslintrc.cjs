/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  },
	rules: {
		'no-console': 'off',
		'object-curly-spacing': [1, 'always'],
		semi: [1, 'always'],
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		}],
		'vue/html-self-closing': ['error', {
			html: {
				void: 'always',
				normal: 'never'
			}
		}],
		'vue/multi-word-component-names': 'off'
	}
};
