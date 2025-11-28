<script setup>
import Card from '@/components/CardReservation.vue';

import date from '@/assets/img/date.jpg'
import vip from '@/assets/img/vip.jpg'
import { onMounted, reactive } from 'vue';
import api from '@/helpers/api';
import { useAuthStore } from '@/stores/auth';
import PulseLoader  from 'vue-spinner/src/PulseLoader.vue'

const auth = useAuthStore()

const state = reactive({
    tables: [],
    tableAvailable: [],
    isLoading: true
})

//ambil data meja
onMounted(async () => {
    // meja available
    try {
        const response = await api.get(`/meja/available`)
        console.log(response.data);
        state.tableAvailable = response.data
        console.log(state.tableAvailable);
    } catch (error) {
        console.error(error);
    }

    try {
        const res = await api.get(`/meja/`)
        console.log(res.data);
        state.tables = res.data
        state.tables = state.tables.filter(r => r.status =='tidaktersedia')

        console.log(state.tables);
    } catch (error) {
        console.error(error);
    } finally {
        state.isLoading = false
    }
})


</script>

<template>

    <!-- Available -->
    <div class="flex flex-col justify-center items-center md:w-[60%] lg:w-[65%] xl:w-[75%]">
        <span class="font-poppins text-2xl font-semibold">
            Available
        </span>
    </div>

    <div class="flex flex-col">

        <div class="flex justify-center">

            <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 sm:w-screen
        md:w-full md:gap-x-5
        lg:w-[80vw]
        xl:w-[80vw]
        2xl:w-[70vw]
        ">

                <div v-if="state.isLoading" class="flex justify-center items-center h-40">
                    <PulseLoader color="black"/>
                </div>

                <!-- Available -->
                <Card v-else v-for="table in state.tableAvailable" :key="table.meja_id" :meja="table"></Card>
                
            </div>

        </div>

    </div>

    <!-- Available -->
    <div class="flex flex-col justify-center items-center md:w-[60%] lg:w-[65%] xl:w-[75%]">
        <span class="font-poppins text-2xl font-semibold">
            Currently not available right now
        </span>
    </div>

    <div class="flex flex-col">

        <div class="flex justify-center">

            <div class="flex flex-col items-center gap-6 mt-7 mb-10 w-[80vw]
        sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 sm:w-screen
        md:w-full md:gap-x-5
        lg:w-[80vw]
        xl:w-[80vw]
        2xl:w-[70vw]
        ">

                <div v-if="state.isLoading" class="flex justify-center items-center h-40">
                    <PulseLoader color="black"/>
                </div>

                <!-- Not Available -->
                <Card v-else v-for="table in state.tables" :key="table.meja_id" :meja="table"></Card>
                
            </div>

        </div>

    </div>

</template>