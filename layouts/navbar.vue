<script setup>
import BottomNavbar from "~/components/navbar/BottomNavbar.vue";
import TopNavbar from "~/components/navbar/TopNavbar.vue";
</script>

<template>
	<div>
		<TopNavbar />
		<slot />
		<BottomNavbar />
	</div>
</template>
