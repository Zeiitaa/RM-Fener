<script setup>
import Card from '@/components/CardFood.vue';
import Bakso from '@/assets/img/bakso.jpg';
import NasPad from '@/assets/img/NASPAD.jpg'
import ayamPop from '@/assets/img/ayamPop.jpg'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()

</script>

<template>


    <div class="flex flex-col">


        <div class="flex justify-center">
            <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8
        sm:w-screen
        md:w-full md:gap-x-5
        lg:w-[80vw]
        xl:w-[80vw]
        2xl:w-[70vw]
        ">
                <Card :image="NasPad" title="Nasi Padang" ingredients="Beef, Chicken, Veggies" priceSpecial=""
                    priceNormal="$348">
                </Card>
                <Card :image="Bakso" title="Bakso" ingredients="Beef, Chicken Broth, Lettuce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                
            </div>
        </div>

    </div>

    <!-- Lanjut ke kategori selanjutnya -->
    <div class="flex flex-col items-center mt-10">
        <span class="font-poppins text-2xl text-center font-semibold">
            Discover Your Next Favorite Meal
        </span>
    </div>

    <div class="flex flex-col">


        <div class="flex justify-center">
            <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8
        sm:w-screen
        md:w-full md:gap-x-5
        lg:w-[80vw]
        xl:w-[80vw]
        2xl:w-[90vw]
        ">
                <Card :image="NasPad" title="Nasi Padang" ingredients="Beef, Chicken, Veggies" priceSpecial=""
                    priceNormal="$348">
                </Card>
                <Card :image="Bakso" title="Bakso" ingredients="Beef, Chicken Broth, Lettuce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
                <Card :image="ayamPop" title="Ayam Pop" ingredients="Chicken, Sauce" priceSpecial="$325.00"
                    priceNormal="$348">
                </Card>
            </div>
        </div>

    </div>

</template>