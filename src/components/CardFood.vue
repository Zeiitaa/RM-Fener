<script setup>
import { defineProps } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

defineProps({
  image: String,
  title: String,
  ingredients: String,
  priceSpecial: String,
  priceNormal: String,
})
</script>

<template>

    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[250px]
    sm:w-[35vw]
    md:w-[30vw]
    lg:w-[22.5vw]
    xl:w-[20vw]
    2xl:w-[15vw]
    ">
    <!-- IMAGE -->
    <img
      :src="image"
      alt=""
      class="w-full h-35 object-cover"
    />

    <!-- CONTENT -->
    <div class="p-5 space-y-2">
      <h2 class="text-lg sm:text-lg font-bold uppercase">{{ title }}</h2>
      <p class="text-sm sm:text-sm text-gray-500">Ingredients: {{ ingredients }}</p>

      <div class="flex items-center justify-between mt-2">
        <div class="text-sm sm:text-sm xl:text-lg font-semibold">
          Price :
          <!-- <span class="text-red-500">{{ priceSpecial }}</span> <br>
          From : -->
          <span class="text-gray-700">{{ priceNormal }}</span>
        </div>
      </div>

      <div class="flex justify-center">
      <RouterLink to="/reservations"
            class="bg-[#232528] text-white py-2 px-3 text-center rounded-md font-semibold w-[70vw] shadow-lg ">
            Book a Table
      </RouterLink>
      </div>
    </div>
  </div>

</template>