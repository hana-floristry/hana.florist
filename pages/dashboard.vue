<script setup>
import "vue-advanced-cropper/dist/style.css";

import { computed, reactive } from "vue";
import { Cropper } from "vue-advanced-cropper";
import { Icon } from "@iconify/vue";

const data = reactive({
	alert: false,
	auth: false,
	catalogue: [],
	category: {},
	item: {},
	password: ""
});

const active = reactive({
	category: {},
	items: computed(() => data.catalogue.find(c => c.id == active.category?.id)?.items)
});

const cropping = reactive({
	canvas: null,
	image: null,
	status: false
});

function headers() {
	return {
		"Authorization": data.password,
		"Content-Type": "application/json"
	};
}

async function addCategory() {
	if (!validateCategory()) return;

	const category = await $fetch("/api/categories", {
		method: "POST",
		headers: headers(),
		body: data.category
	});

	data.catalogue.push(category);
	data.category = {};
}

async function addItem() {
	if (!validateItem()) return;

	const item = await $fetch("/api/items", {
		method: "POST",
		headers: headers(),
		body: {
			...data.item,
			categoryId: active.category.id
		}
	});

	const category = data.catalogue.find(c => c.id == item.categoryId);
	category.items.push(item);
	data.item = {};
}

async function confirmCrop() {
	data.item.image = cropping.canvas.toDataURL();
	cropping.status = false;
}

async function deleteCategory(category) {
	if (!confirm(`Are you sure you want to delete ${category.name}?`)) return;

	await $fetch("/api/categories", {
		method: "DELETE",
		headers: headers(),
		body: { id: category.id }
	});

	data.catalogue = data.catalogue.filter(c => c != category);
}

async function deleteItem(item) {
	if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;

	await $fetch("/api/items", {
		method: "DELETE",
		headers: headers(),
		body: { id: item.id }
	});

	const category = data.catalogue.find(c => c.id == item.categoryId);
	category.items = category.items.filter(i => i != item);
}

async function fetchCatalogue() {
	data.catalogue = await $fetch("/api/catalogue");
	active.category = data.catalogue[0];
}

async function login() {
	try {
		await $fetch("/api/login", {
			method: "POST",
			body: { password: data.password }
		});

		data.auth = true;
		fetchCatalogue();
	} catch (err) {
		data.alert = true;
	}
}

async function readFile(event) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		cropping.image = e.target.result;
		cropping.status = true;
	};
}

function validateCategory() {
	return Boolean(data.category.name);
}

function validateItem() {
	return Boolean(data.item.name)
		&& Boolean(data.item.price)
		&& Boolean(active.category.id)
		&& Boolean(data.item.image);
}
</script>

<template>
	<div v-if="!data.auth">
		<form class="mx-3 my-20 text-center" @submit.prevent="login">
			<input
				class="p-3 font-cormorant text-2xl text-red-800 rounded-md"
				:class="{ 'bg-red-200 border border-red-700': data.alert }"
				placeholder="Password"
				type="password"
				v-model="data.password"
			/>
			<button class="block mx-auto my-6 px-6 py-2 font-cormorant text-2xl text-red-200 bg-red-800 rounded-md">
				Login
			</button>
		</form>
	</div>
	<div v-else>
		<div class="container grid grid-cols-3 gap-6 mx-auto px-6">
			<h1 class="col-span-3 pt-12 font-cormorant text-4xl text-center text-red-800">
				Dashboard
			</h1>
			<div class="flex flex-col gap-3">
				<div
					class="flex gap-3"
					:key="category.id"
					v-for="category in data.catalogue"
				>
					<div
						class="flex-1 p-4 font-cormorant text-2xl text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer"
						:class="{ 'bg-red-900 text-red-200': category == active.category }"
						@click="active.category = category"
					>
						{{ category.name }}
					</div>
					<div
						class="flex items-center p-1 font-cormorant text-2xl text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer"
						@click="deleteCategory(category)"
					>
						<Icon icon="ic:round-delete-forever" />
					</div>
				</div>
				<form class="flex flex-col gap-3" @submit.prevent="addCategory">
					<input
						class="p-2 w-full font-cormorant text-xl rounded-md"
						placeholder="Name"
						v-model="data.category.name"
					/>
					<input
						class="p-2 w-full font-cormorant text-xl rounded-md"
						placeholder="Description (optional)"
						v-model="data.category.description"
					/>
					<button class="flex-1 px-4 py-2 font-cormorant text-2xl text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer">
						Add Category
					</button>
				</form>
			</div>
			<div class="flex flex-col gap-3 col-span-2">
				<div
					class="flex gap-3"
					:key="item.id"
					v-for="item in active.items"
				>
					<div class="flex-1 p-4 text-red-800 rounded-md border-2 border-red-800">
						<div class="flex gap-3">
							<img
								class="w-24 h-24"
								:src="item.image"
							/>
							<div class="flex flex-col">
								<span class="font-cormorant text-2xl">
									{{ item.name }}
								</span>
								<span class="font-lexend text-md">
									Rp {{ item.price.toLocaleString("id") }}
								</span>
								<span class="font-lexend text-md whitespace-pre-wrap">
									{{ item.description }}
								</span>
							</div>
						</div>
					</div>
					<div
						class="flex items-center p-1 font-cormorant text-2xl text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer"
						@click="deleteItem(item)"
					>
						<Icon icon="ic:round-delete-forever" />
					</div>
				</div>
				<form class="flex flex-col gap-3" @submit.prevent="addItem">
					<input
						class="p-2 w-full font-cormorant text-xl rounded-md"
						placeholder="Name"
						v-model="data.item.name"
					/>
					<textarea
						class="p-2 w-full font-lexend text-xl rounded-md"
						placeholder="Description (optional)"
						rows="6"
						v-model="data.item.description"
					/>
					<input
						class="p-2 w-full font-lexend text-xl rounded-md"
						placeholder="Price"
						type="number"
						v-model="data.item.price"
					/>
					<img
						class="mx-auto w-36 h-36"
						:src="data.item.image"
						v-if="data.item.image"
					/>
					<input
						@change="readFile"
						class="p-2 w-full font-cormorant text-xl rounded-md"
						type="file"
					/>
					<cropper
						@change="payload => cropping.canvas = payload.canvas"
						ref="cropper"
						:src="cropping.image"
						:stencil-props="{ aspectRatio: 1/1 }"
						v-if="cropping.status"
					/>
					<div
						class="flex-1 px-4 py-2 font-cormorant text-2xl text-center text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer"
						@click="confirmCrop"
						v-if="cropping.status"
					>
						Confirm Crop
					</div>
					<button class="flex-1 px-4 py-2 font-cormorant text-2xl text-red-800 hover:text-red-200 hover:bg-red-900 rounded-md border-2 border-red-800 hover:border-red-900 cursor-pointer">
						Add Item to Category
					</button>
				</form>
			</div>
		</div>
	</div>
</template>
