<script setup>
import Card from '@/components/CardFood.vue';
import Bakso from '@/assets/img/bakso.jpg';
import NasPad from '@/assets/img/NASPAD.jpg'
import ayamPop from '@/assets/img/ayamPop.jpg'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Footer from '@/components/footer.vue';
const auth = useAuthStore()

</script>

<template>


    <div class="flex flex-col">

        <div class="flex flex-col items-center md:w-[60%] lg:w-[65%] xl:w-[75%]">
            <span v-if="!auth.token" class="font-poppins text-2xl font-semibold">
                 Hello There! <br /> <br />
            </span>
            <span v-else class="font-poppins text-2xl font-semibold">
                 Hello {{ auth.profile.username }}! <br /> <br />
            </span>
            <span class="font-poppins text-2xl font-semibold">
                Today's Menu :
            </span>
        </div>

        <div class="flex justify-center">
        <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8
        sm:w-screen
        md:w-full md:gap-x-5

        " >
            <Card :image="NasPad" 
            title="Nasi Padang" 
            ingredients="Beef, Chicken, Veggies" 
            priceSpecial=""
            priceNormal="$348" 
            >
            </Card>
            <Card :image="Bakso" 
            title="Bakso" 
            ingredients="Beef, Chicken Broth, Lettuce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Ayam Pop" 
            ingredients="Chicken, Sauce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Ayam Pop" 
            ingredients="Chicken, Sauce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Ayam Pop" 
            ingredients="Chicken, Sauce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Ayam Pop" 
            ingredients="Chicken, Sauce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Ayam Pop" 
            ingredients="Chicken, Sauce" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
        </div>
    </div>

    </div>

    <Footer></Footer>

</template>