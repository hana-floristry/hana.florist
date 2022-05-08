<script setup>
import { onMounted, reactive } from "vue";

const data = reactive({});

function formatPrice(price) {
	const thousands = Math.floor(price / 1000);
	return [`Rp ${thousands.toLocaleString("id")}`, `${price % 1000}`.padStart(3, "0")];
}

async function fetchCatalogue() {
	const res = await fetch("/api/catalogue");
	data.catalogue = await res.json();
}

onMounted(fetchCatalogue);
</script>

<template>
	<div class="container flex flex-col gap-12 px-6 mx-auto my-12">
		<div
			:key="category.id"
			v-for="category in data.catalogue"
		>
			<div
				class="flex justify-center items-center py-3 font-cormorant text-4xl text-center hover:text-red-200 hover:bg-red-800 rounded border border-red-800 border-3 cursor-pointer"
				:class="category.active ? 'text-red-200 bg-red-800' : 'text-red-800'"
				@click="category.active = !category.active"
			>
				{{ category.name }}
			</div>
			<div v-if="category.active">
				<h1 class="my-9 font-cormorant text-2xl text-center text-red-800">
					{{ category.description }}
				</h1>
				<div class="grid grid-cols-2 gap-x-6 gap-y-15 sm:grid-cols-3 md:grid-cols-4">
					<div
						class="flex flex-col gap-1 text-red-800"
						:key="item.id"
						v-for="item in category.items"
					>
						<img
							:alt="item.name"
							class="mb-3 aspect-square"
							:src="item.image"
						/>
						<p class="font-cormorant text-2xl md:text-4xl">
							{{ item.name }}
						</p>
						<p class="font-lexend">
							{{ formatPrice(item.price)[0] }}<sup>{{ formatPrice(item.price)[1] }}</sup>
						</p>
						<p class="font-lexend whitespace-pre-wrap">
							{{ item.description }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
