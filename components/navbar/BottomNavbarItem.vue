<script setup>
import { Icon } from "@iconify/vue";

defineProps({
	icon: String,
	text: String
});
</script>

<template>
	<div class="flex flex-col items-center pt-2 pb-1.5">
		<Icon class="w-6 h-6" :icon="icon" />
		<p class="mt-1.5 text-sm">
			{{ text }}
		</p>
	</div>
</template>
