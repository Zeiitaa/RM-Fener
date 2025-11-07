<script setup>
import { RouterLink } from 'vue-router';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
</script>


<template>

<section class="text-center flex flex-col justify-center items-center h-[90vh]">
    <ExclamationTriangleIcon class="size-30 text-[#C5283D]"/>
      <h1 class="text-6xl font-bold mb-4 text-[#36393B]">404 Not Found</h1>
      <p class="text-xl mb-5 text-[#36393B]">This page does not exist</p>
      <RouterLink
        to="/"
        class=" bg-white hover:bg-gray-300 rounded-md px-3 py-2 mt-4"
        >Go Back to Home</RouterLink
      >
    </section>

</template>