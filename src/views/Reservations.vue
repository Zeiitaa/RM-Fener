<script setup>
import sideNav from '@/components/sideNav.vue';
import Reservation from '@/components/Reservation.vue';
import Footer from '@/components/footer.vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore()

</script>

<template>
    <div class="flex flex-col justify-center min-h-screen sm:justify-start pt-25">

        <div class="flex flex-col items-center">
            <!-- cek token untuk ambil username -->
            <span v-if="!auth.token" class="font-poppins text-2xl font-semibold">
                Hello There! <br/>
            </span>
            <span v-else class="font-poppins text-2xl font-semibold">
                Hello {{ auth.profile.username }}! <br/>
            </span>
            <span class="font-poppins text-2xl text-center font-semibold">
                Your dining experience starts with the right spot
            </span>
        </div>
        <div class=" flex flex-col flex-wrap items-center mt-10 ">
            <Reservation/>
        </div>

    </div>

    <Footer></Footer>

</template>