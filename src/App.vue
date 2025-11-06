<script setup>
import navbar from './components/navbar.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <navbar v-if="!route.meta.hideNavbar"/>
    <RouterView/>
</template>

<style scoped>
</style>
