module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true,
		"vue/setup-compiler-macros": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:nuxt/recommended",
		"plugin:vue/vue3-strongly-recommended"
	],
	"parserOptions": {
		"ecmaVersion": 13,
		"sourceType": "module"
	},
	"plugins": [
		"vue"
	],
	"rules": {
		"comma-dangle": ["error", "never"],
		"eol-last": ["error", "always"],
		"indent": ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"no-trailing-spaces": "error",
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"sort-imports": ["error", { allowSeparatedGroups: true }],
		"vue/html-indent": ["error", "tab"],
		"vue/html-self-closing": "off",
		"vue/max-attributes-per-line": ["error", { singleline: 2, multiline: 1 }],
		"vue/multi-word-component-names": "off",
		"vue/require-default-prop": "off"
	},
	"globals": {
		"$fetch": "readonly",
		"defineEventHandler": "readonly",
		"useBody": "readonly",
		"useFetch": "readonly",
		"useHead": "readonly"
	}
};
