<script setup>
import sideNav from '@/components/sideNav.vue';
import Reservation from '@/components/Reservation.vue';

</script>

<template>
    <div class="flex justify-center">
        <sideNav class="hidden md:flex"/>
    </div>

    <div class="flex justify-center mt-3">
        <span class="font-poppins text-2xl font-semibold "> 
            Today's Available
        </span>
    </div>

    <Reservation />

</template>