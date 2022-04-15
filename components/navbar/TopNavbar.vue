<script setup>
import TopNavbarItem from "~/components/navbar/TopNavbarItem.vue";

import LogoDark from "~/assets/img/logo-dark.svg";
import LogoLight from "~/assets/img/logo-light.svg";
</script>

<template>
	<div class="sticky top-0 z-10 md:hidden w-full bg-red-900">
		<div class="flex justify-center py-3 mx-auto">
			<img
				class="w-24"
				:src="LogoLight"
				alt="hana floristry logo"
			/>
		</div>
	</div>

	<div class="hidden md:block w-full">
		<div class="container flex justify-between items-center px-6 py-9 mx-auto">
			<div>
				<img
					class="w-28"
					:src="LogoDark"
					alt="hana floristry logo"
				/>
			</div>
			<div class="flex gap-24 justify-between font-cormorant">
				<NuxtLink to="/">
					<TopNavbarItem text="Home" />
				</NuxtLink>
				<NuxtLink to="/">
					<TopNavbarItem text="Catalogue" />
				</NuxtLink>
				<NuxtLink to="https://api.whatsapp.com/send?phone=628153898399">
					<TopNavbarItem text="Contact" />
				</NuxtLink>
			</div>
			<div />
		</div>
	</div>
</template>
