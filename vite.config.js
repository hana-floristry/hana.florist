import { defineConfig } from "vite";
import { resolve } from "path";

import Pages from "vite-plugin-pages";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
	plugins: [
		Pages(),
		Vue(),
		WindiCSS()
	],
	resolve: {
		alias: {
			"~": resolve("src")
		}
	}
});
