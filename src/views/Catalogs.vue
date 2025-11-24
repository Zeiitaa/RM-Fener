<script setup>
import sideNav from '@/components/sideNav.vue';
import Catalog from './Catalog.vue';
import Footer from '@/components/footer.vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore()
</script>

<template>
    <div class="flex flex-col justify-center sm:justify-start pt-25">

        <div class="flex flex-col items-center">
            <!-- cek token untuk ambil username -->
            <span v-if="!auth.token" class="font-poppins text-2xl font-semibold">
                Hello There! <br/>
            </span>
            <span v-else class="font-poppins text-2xl font-semibold">
                Hello {{ auth.profile.username }}! <br/>
            </span>
            <span class="font-poppins text-2xl text-center font-semibold">
                Find the Food Everyone's Talking About
            </span>
        </div>
        <div class=" flex flex-col flex-wrap items-center mt-5 ">
            <Catalog/>
        </div>

    </div>

    <Footer></Footer>

</template>