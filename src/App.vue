<script setup>
import "~/main.css";

import BottomNavbar from "~/components/BottomNavbar.vue";
import Footer from "~/components/Footer.vue";
import TopNavbar from "~/components/TopNavbar.vue";
</script>

<template>
	<TopNavbar />
	<router-view />
	<Footer />
	<BottomNavbar />
</template>
