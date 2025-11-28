<script setup>
import { useAuthStore } from '@/stores/auth';
import api from '@/helpers/api';
import { onMounted, ref, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import image from '@/assets/img/family.jpg'
import { useToast } from 'vue-toastification';

const props = defineProps({
    payment: Object
})

// console.log(props.payment);

const emit = defineEmits(['refresh-data'])

const auth = useAuthStore()
const toast = useToast()

const form = reactive({
    amount: 0
})

const finished = async () => {

    const updatePayment = {
        amount: form.amount,
        status: "berhasil"
    }

    const updateMeja = {
        status: "tersedia"
    }

    try {

        const res = await api.patch(`/meja/${props.payment.kode_meja}`, updateMeja, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        try {
            const finish = await api.patch(`/payment/${props.payment.payment_id}`, updatePayment, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            console.log(res.data);
            console.log(finish.data);

        } catch (error) {
            console.error("gagal menyelesaikan pembayaran", error);
        }

        toast.success('Payment Done!')

    } catch (error) {
        console.error("gagal update status meja", error);
    } finally {
        showPopup.value = false
        emit('refresh-data')
    }

}

const showPopup = ref(false)

</script>

<template>

    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[300px]
    sm:w-[35vw]
    md:w-[30vw]
    ">


        <!-- CONTENT -->
        <div class="p-4 space-y-2">
            <h2 class="text-lg lg:text-xl font-bold uppercase">Kode Meja : {{ props.payment.kode_meja }}</h2>
            <p class="text-sm lg:text-lg text-gray-500"> Customer Name : {{ props.payment.username }} </p>
            <p class="text-sm lg:text-lg text-gray-500">For {{ props.payment.jumlah_orang }} People</p>
            <p class="text-sm lg:text-lg text-gray-500"> Tanggal Reservasi : {{ props.payment.tanggal_reservasi }} </p>
            <p class="text-sm lg:text-lg text-gray-500"> Jam Reservasi {{ props.payment.jam_reservasi }} </p>
            <p class="text-sm lg:text-lg text-gray-500"> Lokasi {{ props.payment.lokasi }} </p>

            <div class="flex items-center justify-between mt-3">
                <div class="text-xs font-semibold">
                </div>
            </div>

            <div class="flex justify-center gap-3">
                <button @click="showPopup = true"
                    class="px-10 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-green-500 text-white rounded-md ">
                    Finished
                </button>
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50"
        @click.self="showPopup = false">

        <!-- isi popup -->
        <div class="bg-[#232528] p-6 rounded-xl shadow-xl w-[85%] h-[55%] max-w-md max-h-md">
            <h2 class="text-xl text-white font-bold">Under the Name of {{ props.payment.username }}</h2>
            <p class="text-xs text-white">Table Code {{ props.payment.kode_meja }}</p>
            <span class="text-white">Lokasi {{ props.payment.lokasi }}</span>

            <form @submit.prevent="finished">
                <input v-model="form.amount" type="number" placeholder="Total Biaya"
                    class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

                <button v-if="auth.token" type="submit" class="px-4 py-2 mt-10 ml-7 bg-green-500 text-white rounded-lg">
                    Finish Payment
                </button>
                <RouterLink v-else to="/login" class="px-4 py-2 mt-10 bg-blue-500 text-white rounded-lg"
                    style="border: 2px solid;">
                    Login
                </RouterLink>
            </form>

        </div>
    </div>

</template>