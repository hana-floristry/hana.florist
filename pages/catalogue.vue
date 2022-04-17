<script setup>
import CatalogueItem from "~/components/misc/CatalogueItem.vue";

useHead({
	charset: "utf-8",
	htmlAttrs: {
		lang: "en"
	},
	link: [
		{ rel: "icon", href: "/favicon.ico" }
	],
	meta: [
		{ name: "description", content: "At HANA Floristry, we are passionate about creating vibrant, colourful floral arrangements for weddings, events and every day. We offer a large selection of unique floral designs suitable for any occasion." },
		{ name: "theme-color", content: "#FFF8DC" }
	],
	title: "HANA Floristry",
	viewport: "width=device-width, initial-scale=1"
});

const { data } = await useFetch("/api/catalogue");
</script>

<template>
	<div class="container flex flex-col gap-12 mx-auto">
		<div
			:key="category.id"
			v-for="category in data"
		>
			<h1 class="py-12 font-cormorant text-4xl text-center text-red-800">
				{{ category.name }}
			</h1>
			<div class="grid grid-cols-2 gap-x-6 gap-y-15 sm:grid-cols-3 md:grid-cols-4 mx-6">
				<CatalogueItem
					:key="item.id"
					v-for="item in category.items"
					:item="item"
				/>
			</div>
		</div>
	</div>
</template>
