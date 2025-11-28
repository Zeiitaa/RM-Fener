<script setup>
import MyReservationCard from '@/components/MyReservationCard.vue';
import { onMounted, reactive } from 'vue';
import api from '@/helpers/api';
import { useAuthStore } from '@/stores/auth';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Footer from '@/components/footer.vue';

const auth = useAuthStore()

const checkRole = () => {
    if (!auth.isAnggota) {
        alert("Anda bukan Anggota")
        router.push("/")
    }
}

const state = reactive({
    reservation: [],
    meja: [],

    loadGet: true
})

const getMyReservation = async () => {
    try {

        const [reservRes, mejaRes] = await Promise.all([
            api.get(`/reservation/me`, { headers: { Authorization: `Bearer ${auth.token}` } }),

            api.get(`/meja/`, { headers: { Authorization: `Bearer ${auth.token}` } }),

        ])

        const reservation = reservRes.data.data
        state.meja = mejaRes.data

        // mapping
        const mejaMap = new Map(state.meja.map(m => [m.meja_id, m]));

        // Join data
        state.reservation = reservation
            .map(p => ({
                ...p,
                kode_meja: mejaMap.get(p.meja_id)?.kode_meja || "tidak ditemukan",
                lokasi: mejaMap.get(p.meja_id)?.lokasi || "tidak ditemukan",
                kapasitas: mejaMap.get(p.meja_id)?.kapasitas || "-"
            }))

        console.log("Data Join => ", state.reservation);

    } catch (error) {
        console.error("error getting data", error);
    } finally {
        state.loadGet = false
    }

}

onMounted(async () => {

    // checkRole()
    getMyReservation()
    
})

const refresh = async () => {
    getMyReservation()
}

</script>

<template>

    <div class="flex flex-col justify-center sm:justify-start mt-35 min-h-screen">
        <div class=" flex flex-col items-center">
            <!-- List reservasi yang Customer/User buat sedang berlangsung -->
            <div class="flex flex-col items-center ">

                <div class="flex flex-col justify-center items-center mb-5">
                    <span class="font-poppins text-2xl font-semibold">
                        Your Reservation
                    </span>
                </div>

                <div v-if="state.loadGet">
                    <PulseLoader color="black" />
                </div>
                <div v-else class="flex flex-col gap-7 sm:flex-row sm:flex-wrap justify-center">

                    <div v-if="!state.reservation.length" class="text-black text-center font-poppins mt-35 sm:mt-15">
                        Kamu mungkin belum ada membuat reservasi
                    </div>

                    <MyReservationCard v-for="reserve in state.reservation" :key="reserve.reservation_id"
                        :reservation="reserve" @refresh-data="refresh"/>
                </div>
            </div>
        </div>

    </div>

    <Footer></Footer>

</template>