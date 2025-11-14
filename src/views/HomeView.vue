<script setup>
import sideNav from '@/components/sideNav.vue';
import Catalog from './Catalog.vue';
</script>

<template>
    <div class="flex justify-center">
        <sideNav class="hidden md:flex"/>
    </div>

    <div class="flex justify-center mt-3">
        <span class="font-poppins text-2xl font-semibold"> 
            Today's Menu
        </span>
    </div>

    <Catalog/>


</template>