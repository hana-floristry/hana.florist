<script setup>
import BottomNavbarItem from "~/components/navbar/BottomNavbarItem.vue";
</script>

<template>
	<div class="md:hidden fixed bottom-0 z-50 px-3 pb-3 w-full">
		<div class="flex bg-red-900 rounded">
			<NuxtLink class="basis-1/3 text-red-200" to="/">
				<BottomNavbarItem icon="ic:round-home" text="Home" />
			</NuxtLink>
			<NuxtLink class="basis-1/3 text-red-200" to="/catalogue">
				<BottomNavbarItem icon="ic:round-menu-book" text="Catalogue" />
			</NuxtLink>
			<NuxtLink class="basis-1/3 text-red-200" to="https://api.whatsapp.com/send?phone=628153898399">
				<BottomNavbarItem icon="ic:round-phone" text="Contact" />
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply text-red-400;
}
</style>
