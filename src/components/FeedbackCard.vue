<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/helpers/api';
import image from '@/assets/img/family.jpg'
import router from '@/router';

const auth = useAuthStore()
const toast = useToast()
const showPopup = ref(false)
const showCard = ref(false)

const props = defineProps({
    reservation: Object
})
console.log(props.reservation);

const form = reactive({
    rating: '',
    comments: ''
})

const emit = defineEmits(['refresh-data'])

const newFeedback = async () => {

    try {

        const newData = ({
            user_id: auth.profile.user_id,
            reservation_id: props.reservation.reservation_id,
            rating: form.rating,
            comments: form.comments
        })

        const res = api.post(`/feedback/`, newData, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })

        toast.success("Berhasil Memberi Feedback \n Terima Kasih!!")


    } catch (error) {
        console.error("error canceling reservation", error);
    } finally {
        emit('refresh-data')
    }

}

const check = () => {
    if (props.reservation.status == "berlangsung")
        return showPopup.value = true
    else
        return showPopup.value = false
}

</script>

<template>
    <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[250px]
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
            <h2 class="text-sm font-bold uppercase">Kode Meja {{ props.reservation.kode_meja }}</h2>
            <p class="text-xs text-gray-500">For {{ props.reservation.kapasitas }} People</p>
            <p class="text-xs text-gray-500"> {{ props.reservation.status }} </p>

            <div class="flex items-center justify-between mt-3">
                <div class="text-xs font-semibold">
                    <span class="text-red-500">Lokasi {{ props.reservation.lokasi }}</span>
                </div>
            </div>

            <div class="flex justify-center gap-4">
                <button v-if="props.reservation.status === 'berlangsung'" @click="check"
                    class="px-4 py-2 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center bg-green-500 text-white rounded-md ">
                    Give us Feedback
                </button>
            </div>

        </div>
    </div>

    <div v-if="showPopup" class="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50"
        @click.self="showPopup = false">

        <!-- isi popup -->
        <div class="bg-[#232528] p-6 rounded-xl shadow-xl w-[85%] h-[55%] 2xl:h-[53%] max-w-md max-h-md">
            <h2 class="text-xl text-white font-bold">Kode Meja {{ props.reservation.kode_meja }}</h2>
            <p class="text-xs text-white">For {{ props.reservation.kapasitas }} People</p>
            <span class="text-white">Lokasi {{ props.reservation.lokasi }}</span>

            <form @submit.prevent="newFeedback" class="flex flex-col">
                <input v-model="form.rating" type="number" placeholder="Masukan Rating 1-5"
                    class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

                <input v-model="form.comments" type="text" placeholder="Masukan Komentar"
                    class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

                <button v-if="auth.token" type="submit"
                    class="px-4 py-2 mt-15 max-w-[200px] w-full bg-green-500 text-white rounded-lg mx-auto flex justify-center hover:scale-105 hover:cursor-pointer">
                    Submit Reservation
                </button>
                <button v-else
                    class="px-4 py-2 mt-15 max-w-[200px] w-full bg-blue-500 text-white rounded-lg mx-auto flex justify-center hover:scale-105 hover:cursor-pointer">
                    <RouterLink to="/login">Login</RouterLink>
                </button>
            </form>

        </div>
    </div>
</template>