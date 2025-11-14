<script setup>
import Card from '@/components/CardReservation.vue';
import Bakso from '@/assets/img/bakso.jpg';
import NasPad from '@/assets/img/NASPAD.jpg'
import ayamPop from '@/assets/img/ayamPop.jpg'
</script>

<template>

    <div class="flex justify-center">
        <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]">
            <Card :image="NasPad" 
            title="Family 1" 
            people="4" 
            priceSpecial="$400"
            priceNormal="$500" 
            >
            </Card>
            <Card :image="Bakso" 
            title="VIP 1" 
            people="3" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
            <Card :image="ayamPop" 
            title="Date 1" 
            people="2" 
            priceSpecial="$325.00"
            priceNormal="$348" 
            >
            </Card>
        </div>
    </div>

</template>