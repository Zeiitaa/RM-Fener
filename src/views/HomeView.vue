<script setup>
import sideNav from '@/components/sideNav.vue';
import Catalog from './Catalog.vue';
import Card from '@/components/CardFood.vue';
import { RouterLink } from 'vue-router';
import naspad from '@/assets/img/NASPAD.jpg'
import nasipadang from '@/assets/img/NasiPadang.jpg'
import { useAuthStore } from '@/stores/auth';
import Foooter from '@/components/footer.vue';

const auth = useAuthStore()

</script>

<template>

    <div class="flex flex-col justify-center mt-30">
        <!-- text hero -->
        <span class="font-bold text-2xl sm:text-4xl text-[#232528] text-center">Premium Dining <br> Zero Waiting</span>
    </div>

    <div class="flex flex-col items-center mt-10">

        <!-- gambar -->

        <img :src="nasipadang" alt="" class="w-[85%] max-w-[1200px] shadow-2xl" />

        <!-- tombol ke katalog -->
        <RouterLink to="/catalogs"
            class="bg-[#232528] text-white py-3 px-3 text-center rounded-md font-semibold hover:scale-110 w-[40vw] max-w-[180px] shadow-2xl mt-5">
            View Catalog
        </RouterLink>
    </div>

    <div class="flex flex-col sm:flex-row mt-10 gap-y-10 sm:gap-10 sm:flex-wrap items-center justify-center">
        <!-- Text -->

        <span class="text-center font-bold text-2xl w-screen">
            We're always here for you~
        </span>


        <!-- Card -->
        <div class="mt-2">
            <Card :image="naspad" title="Nasi Padang" ingredients="Beef, Chicken, Veggies" priceSpecial=""
                priceNormal="$348">
            </Card>
        </div>
        <div class="">
            <Card :image="naspad" title="Nasi Padang" ingredients="Beef, Chicken, Veggies" priceSpecial=""
                priceNormal="$348">
            </Card>
        </div>
        <div class="">
            <Card :image="naspad" title="Nasi Padang" ingredients="Beef, Chicken, Veggies" priceSpecial=""
                priceNormal="$348">
            </Card>
        </div>

    </div>

    <Foooter></Foooter>

</template>