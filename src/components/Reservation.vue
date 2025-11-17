<script setup>
import Card from '@/components/CardReservation.vue';
import family from '@/assets/img/family.jpg'
import date from '@/assets/img/date.jpg'
import vip from '@/assets/img/vip.jpg'
</script>

<template>

<div class="flex flex-col">

    <div class="flex flex-col items-center md:w-[60%] lg:w-[65%] xl:w-[75%]">
            <span class="font-poppins text-2xl font-semibold">
                Today's Available :
            </span>
    </div>

    <div class="flex justify-center">

        <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 sm:w-screen
        md:w-full md:gap-x-5
        ">
            <Card :image="family" 
            title="Family 1" 
            people="4" 
            priceSpecial="$400"
            priceNormal="$500" 
            >
            </Card>
            <Card :image="family" 
            title="Family 2" 
            people="3" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="date" 
            title="Date 1" 
            people="2" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="date" 
            title="Date 2" 
            people="2" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="vip" 
            title="vip 1" 
            people="2" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="vip" 
            title="vip" 
            people="2" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
        </div>

    </div>

</div>
</template>