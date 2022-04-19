<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
	<div class="md:hidden fixed bottom-0 z-50 px-3 pb-3 w-full">
		<div class="flex bg-red-900 rounded">
			<router-link class="basis-1/3 text-red-200" to="/">
				<div class="flex flex-col items-center pt-2 pb-1.5">
					<Icon class="w-6 h-6" icon="ic:round-home" />
					<p class="mt-1.5 text-sm">
						Home
					</p>
				</div>
			</router-link>
			<router-link class="basis-1/3 text-red-200" to="/catalogue">
				<div class="flex flex-col items-center pt-2 pb-1.5">
					<Icon class="w-6 h-6" icon="ic:round-menu-book" />
					<p class="mt-1.5 text-sm">
						Catalogue
					</p>
				</div>
			</router-link>
			<a class="basis-1/3 text-red-200" href="https://api.whatsapp.com/send?phone=628153898399">
				<div class="flex flex-col items-center pt-2 pb-1.5">
					<Icon class="w-6 h-6" icon="ic:round-phone" />
					<p class="mt-1.5 text-sm">
						Contact
					</p>
				</div>
			</a>
		</div>
	</div>
</template>

<style scoped>
.router-link-active {
	@apply text-red-400;
}
</style>
