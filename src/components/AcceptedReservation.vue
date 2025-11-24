<script setup>
import { useAuthStore } from '@/stores/auth';
import api from '@/helpers/api';
import { onMounted, ref, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import image from '@/assets/img/family.jpg'
import { useToast } from 'vue-toastification';

const props = defineProps({
    reservation: Object,
})

const emit = defineEmits(['checked-in'])

const auth = useAuthStore()
const toast = useToast()

console.log("data dari admin status berhasil", props.reservation);


const CheckIn = async () => {

    const now = new Date().toISOString();

    const newPayment = {
        reservation_id: props.reservation.reservation_id,
        amount: 0,
        payment_date: now,
        status: "menunggu"
    }

    const updateStatus = {
        status: "berlangsung"
    }

    try{
        const response = await api.patch(`/reservation/id/${props.reservation.reservation_id}`, updateStatus, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        console.log(response);

    } catch(error) {
        console.error(error);
    }

    try {
        const res = await api.post(`/payment/`, newPayment, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
    
        console.log(res);

        toast.success('Mark as Arrived Success')

    } catch (error) {
        console.error("Error posting payment", error);
    }

}

const notCome = async () => {

    const rejection = {
        status: 'dibatalkan'
    }

    try {
        const reject = await api.patch(`/reservation/${props.reservation.reservation_id}`, rejection, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        console.log(reject.data);

        toast.success('Reservation has been Rejected!')

    } catch (error) {
        console.error("gagal membatalkan", error);
    }

}

</script>

<template>
    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[300px]
    sm:w-[35vw]
    md:w-[30vw]
    lg:w-[22.5vw]
    xl:w-[20vw]
    2xl:w-[15vw]
    ">
        <!-- IMAGE -->
        <img :src="image" alt="" class="w-full h-44 object-cover" />

        <!-- CONTENT -->
        <div class="p-4 space-y-2">
            <h2 class="text-lg font-bold uppercase">Kode Meja : {{ props.reservation.kode_meja }}</h2>
            <p class="text-sm text-gray-500"> Customer Name : {{ props.reservation.username }} </p>
            <p class="text-sm text-gray-500">For {{ props.reservation.jumlah_orang }} People</p>
            <p class="text-sm text-gray-500"> Tanggal Reservasi : {{ props.reservation.tanggal_reservasi }} </p>
            <p class="text-sm text-gray-500"> Jam Reservasi {{ props.reservation.jam_reservasi }} </p>
            <p class="text-sm text-gray-500"> Lokasi {{ props.reservation.lokasi }} </p>

            <div class="flex items-center justify-between mt-3">
                <div class="text-xs font-semibold">
                </div>
            </div>

            <div class="flex justify-center gap-3">
                <button @click="CheckIn"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-green-500 text-white rounded-md ">
                    Mark as Arrived
                </button>

                <button @click="notCome"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-[#DB162F] text-white rounded-md">
                    Rejected
                </button>
            </div>
        </div>
    </div>
</template>