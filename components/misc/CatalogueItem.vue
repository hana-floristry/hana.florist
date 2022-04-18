<script setup>
const props = defineProps({
	item: Object
});

function formatPrice() {
	const price = Math.floor(props.item.price / 1000);
	return `Rp ${price.toLocaleString("id")}`;
}
</script>

<template>
	<div class="flex flex-col gap-1 text-red-800">
		<img
			:alt="item.name"
			class="mb-3 aspect-square"
			:src="item.image"
		/>
		<p class="font-cormorant text-2xl md:text-4xl">
			{{ item.name }}
		</p>
		<p class="font-lexend">
			{{ formatPrice() }}<sup>{{ (item.price % 1000).toString().padStart(3, "0") }}</sup>
		</p>
		<p class="font-lexend whitespace-pre-wrap">
			{{ item.description }}
		</p>
	</div>
</template>
