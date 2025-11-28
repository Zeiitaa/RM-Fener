<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';
import api from '@/helpers/api';
import router from '@/router';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const toast = useToast()

const emit = defineEmits(['refresh-data'])

const props = defineProps({
    reservation: Object
})

console.log("data dari Admin status menunggu", props.reservation);

const approveRequest = async () => {

    const approve = {
        status: 'berhasil'
    }

    try {
        const request = await api.patch(`/reservation/id/${props.reservation.reservation_id}`, approve,
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            }
        )
        console.log(request.data);

        toast.success('Request Reservation Approved')
        router.push("/admin")

    } catch (error) {
        console.error("gagal aprove", error);
    } finally {
        emit('refresh-data')
    }
}

const rejectRequest = async () => {

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
        toast.success('Request Reservation Rejected')

    } catch (error) {
        console.error("gagal membatalkan", error);
    } finally {
        emit('refresh-data')
    }
}

onMounted(() => {



})

</script>

<template>

    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[300px]
    sm:w-[35vw]
    md:w-[30vw]
    ">

        <!-- CONTENT -->
        <div class="p-4 space-y-2">
            <h2 class="text-sm lg:text-xl font-bold uppercase">Kode Meja : {{ props.reservation.kode_meja }}</h2>
            <p class="text-xs lg:text-lg text-gray-500"> Customer Name : {{ props.reservation.username }} </p>
            <p class="text-xs lg:text-lg text-gray-500">For {{ props.reservation.jumlah_orang }} People</p>
            <p class="text-xs lg:text-lg text-gray-500"> Tanggal Reservasi : {{ props.reservation.tanggal_reservasi }} </p>
            <p class="text-xs lg:text-lg text-gray-500"> Jam Reservasi {{ props.reservation.jam_reservasi }} </p>
            <p class="text-xs lg:text-lg text-gray-500"> Lokasi {{ props.reservation.lokasi }} </p>

            <div class="flex items-center justify-between mt-3">
                <div class="text-xs font-semibold">
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button @click="approveRequest"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-green-500 text-white rounded-md ">
                    Approve
                </button>

                <button @click="rejectRequest"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-[#DB162F] text-white rounded-md">
                    Reject
                </button>
            </div>
        </div>
    </div>

</template>