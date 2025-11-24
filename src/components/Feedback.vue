<script setup>
import { useAuthStore } from '@/stores/auth';
import api from '@/helpers/api';
import { onMounted, ref, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import image from '@/assets/img/family.jpg'

const props = defineProps({
    feedback: Object,
})


</script>


<template>

<div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[300px]
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
            <h2 class="text-lg font-bold uppercase">Customer Name : {{ props.feedback.username }}</h2>
            <p class="text-sm text-gray-500"> Reservation ID : {{ props.feedback.reservation_id }} </p>
            <p class="text-sm text-gray-500"> Rating {{ props.feedback.rating }} People</p>
            <p class="text-sm text-gray-500"> Comments : {{ props.feedback.comments }} </p>
    </div>
</div>

</template>