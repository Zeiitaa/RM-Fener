<script setup>
import sideNav from '@/components/sideNav.vue';
import Catalog from './Catalog.vue';
</script>

<template>

    <div class="flex flex-col md:flex-row gap-2 justify-center sm:justify-start pt-25">
        <div class=" justify-center sm:justify-start">
            <sideNav class="hidden md:flex"/>
        </div>

        <div class=" flex flex-col items-center mt-5">
            <Catalog />
        </div>

    </div>
</template>