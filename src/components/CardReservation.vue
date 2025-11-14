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
</script>

<template>
     <div class="bg-white rounded-2xl overflow-hidden shadow-md w-[80vw]">
    <!-- IMAGE -->
    <img
      :src="image"
      alt=""
      class="w-full h-44 object-cover"
    />

    <!-- CONTENT -->
    <div class="p-4 space-y-2">
      <h2 class="text-sm font-bold uppercase">{{ title }}</h2>
      <p class="text-xs text-gray-500">For {{ people }} People</p>

      <div class="flex items-center justify-between mt-3">
        <div class="text-xs font-semibold">
          <span class="text-red-500">{{ priceSpecial }} /Hour</span> 
          <span class="text-gray-700">{{ priceNormal }} /Hour</span>
        </div>

        <button
          class="w-8 h-8 flex items-center justify-center border border-black rounded-full"
        >
          <PlusIcon class="size-4"/>
        </button>
      </div>
    </div>
  </div>
</template>