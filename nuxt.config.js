import { defineNuxtConfig } from "nuxt3";
import { resolve } from "path";

export default defineNuxtConfig({
	alias: {
		"~": resolve(__dirname)
	},
	modules: [
		"nuxt-windicss"
	]
});
