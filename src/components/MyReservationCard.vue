<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/helpers/api';
import image from '@/assets/img/family.jpg'
import router from '@/router';

const auth = useAuthStore()
const toast = useToast()

const props = defineProps({
    reservation: Object
})

const emit = defineEmits(['refresh-data'])

const canceled = async () => {

    try{

        const cancel = ({
            status: "dibatalkan"
        })

        const res = api.patch(`/reservation/id/${props.reservation.reservation_id}`, cancel, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        toast.success("Berhasil membatalkan reservasi")


    } catch(error) {
        console.error("error canceling reservation", error);
    } finally {
        emit('refresh-data')
    }

}


</script>

<template>

    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[300px]
    sm:w-[35vw]
    md:w-[30vw]
    lg:w-[22.5vw]
    xl:w-[20vw]
    2xl:w-[20vw]
    ">
        <!-- IMAGE -->
        <img :src="image" alt="" class="w-full h-44 object-cover" />

        <!-- CONTENT -->
        <div class="p-4 space-y-2">
            <h2 class="text-sm font-bold uppercase">Kode Meja : {{ props.reservation.kode_meja }}</h2>
            <p class="text-sm text-gray-500"> Customer Name : {{ auth.profile.username }} </p>
            <p class="text-sm text-gray-500">For {{ props.reservation.jumlah_orang }} People</p>
            <p class="text-sm text-gray-500"> Tanggal Reservasi : {{ props.reservation.tanggal_reservasi }} </p>
            <p class="text-sm text-gray-500"> Jam Reservasi {{ props.reservation.jam_reservasi }} </p>
            <p class="text-sm text-gray-500"> Lokasi {{ props.reservation.lokasi }} </p>
            <p class="text-sm text-red-500"> Status Reservasi {{ props.reservation.status }} </p>

            <div class="flex items-center justify-between mt-3">
                <div class="text-xs font-semibold">
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button v-if="props.reservation.status === 'berlangsung' || props.reservation.status === 'menunggu' " @click="canceled"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-green-500 text-white rounded-md ">
                    Cancel Reservation
                </button>
            </div>
        </div>
    </div>


</template>