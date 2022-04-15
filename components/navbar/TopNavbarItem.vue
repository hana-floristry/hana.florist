<script setup>
defineProps({
	text: String
});
</script>

<template>
	<div>
		<span class="text-xl text-red-800">
			{{ text }}
		</span>
	</div>
</template>
