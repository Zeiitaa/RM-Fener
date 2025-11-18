<script setup>
import { defineProps } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

defineProps({
  image: String,
  title: String,
  people: String,
  priceSpecial: String,
  priceNormal: String,
})

//Endpoint API request reservation



</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw]
    sm:w-[35vw]
    md:w-[30vw]
    lg:w-[22.5vw]
    xl:w-[20vw]
    2xl:w-[15vw]
    ">
    <!-- IMAGE -->
    <img :src="image" alt="" class="w-full h-44 object-cover" />

    <!-- CONTENT -->
    <div class="p-4 space-y-2">
      <h2 class="text-sm font-bold uppercase">{{ title }}</h2>
      <p class="text-xs text-gray-500">For {{ people }} People</p>

      <div class="flex items-center justify-between mt-3">
        <div class="text-xs font-semibold">
          <span class="text-red-500">{{ priceSpecial }} /Hour</span>
          <span class="text-gray-700">{{ priceNormal }} /Hour</span>
        </div>

        <button class="w-8 h-8 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center border border-black rounded-full">
          <PlusIcon class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>