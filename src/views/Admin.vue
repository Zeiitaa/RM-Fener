<script setup>
import RequestReservation from '@/components/RequestReservation.vue'
import AcceptedReservation from '@/components/AcceptedReservation.vue'
import Feedback from '@/components/Feedback.vue'
import Payment from '@/components/Payment.vue'
import api from '@/helpers/api'
import { useAuthStore } from '@/stores/auth'
import { ref, reactive, onMounted } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const checkRole = () => {
    if (!auth.isPetugas) {
        router.push("/")
    }
}

const state = reactive({
    request: [],
    requestUsers: [],
    requestmeja: [],

    page: 1,
    limit: 10,
    totalPages: 1,
    total: 0,

    reservation: [],
    reservationUser: [],
    reservationMeja: [],

    payment: [],
    paymentResv: [],
    paymentUser: [],
    paymentMeja: [],

    feedback: [],
    feedbackResv: [],
    feedbackUser: [],

    loadReq: true,
    loadRes: true,
    loadPayment: true,
    loadfeedback: true,
})

const currentView = ref("request")
const showReq = () => { currentView.value = "request" }
const showRes = () => { currentView.value = "reservation" }
const showPay = () => (currentView.value = "payment")
const showfeed = () => (currentView.value = "feedback")

const getRequest = async () => {
    state.loadRes = true
    try {
        const [resvRes, userRes, mejaRes] = await Promise.all([
            api.get(`/reservation/?page=${state.page}&limit=${state.limit}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            }),
            api.get(`/user/`, { headers: { Authorization: `Bearer ${auth.token}` } }),
            api.get(`/meja/`, { headers: { Authorization: `Bearer ${auth.token}` } })
        ]);

        const reservations = resvRes.data.data; // data paginated dari backend
        state.total = resvRes.data.total
        state.totalPages = resvRes.data.total_pages

        state.requestUsers = userRes.data
        state.requestmeja = mejaRes.data

        // --- Convert jadi map biar lookup cepat O(1) ---
        const userMap = new Map(state.requestUsers.map(u => [u.user_id, u]));
        const mejaMap = new Map(state.requestmeja.map(m => [m.meja_id, m]));

        // --- join data di frontend ---
        state.request = reservations
            .filter(r => r.status === "menunggu")
            .map(r => ({
                ...r,
                username: userMap.get(r.user_id)?.username || "tidak ditemukan",
                kode_meja: mejaMap.get(r.meja_id)?.kode_meja || "tidak ditemukan",
                lokasi: mejaMap.get(r.meja_id)?.lokasi || "tidak ditemukan",
                kapasitas: mejaMap.get(r.meja_id)?.kapasitas || "-"
            }));

        console.log("Data dengan status menunggu", state.request);

    } catch (err) {
        console.error("Gagal mengambil data", err);
    } finally {
        state.loadReq = false
    }
}

//untuk Reservation ambil data reservasi dengan status berhasil
const getReservation = async () => {
    try {
        const [resvRes, userRes, mejaRes] = await Promise.all([
            api.get(`/reservation/?page=${state.page}&limit=${state.limit}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            }),
            api.get(`/user/`, { headers: { Authorization: `Bearer ${auth.token}` } }),
            api.get(`/meja/`, { headers: { Authorization: `Bearer ${auth.token}` } })
        ]);

        const reservations = resvRes.data.data; // data paginated dari backend
        state.total = resvRes.data.total
        state.totalPages = resvRes.data.total_pages

        state.reservationUser = userRes.data
        state.reservationMeja = mejaRes.data

        // --- Convert jadi map biar lookup cepat O(1) ---
        const userMap = new Map(state.reservationUser.map(u => [u.user_id, u]));
        const mejaMap = new Map(state.reservationMeja.map(m => [m.meja_id, m]));

        // --- join data di frontend ---
        state.reservation = reservations
            .filter(r => r.status === "berhasil")
            .map(r => ({
                ...r,
                username: userMap.get(r.user_id)?.username || "tidak ditemukan",
                kode_meja: mejaMap.get(r.meja_id)?.kode_meja || "tidak ditemukan",
                lokasi: mejaMap.get(r.meja_id)?.lokasi || "tidak ditemukan",
                kapasitas: mejaMap.get(r.meja_id)?.kapasitas || "-"
            }));

        console.log("Data dengan status Berhasil", state.reservation);

    } catch (error) {
        console.error("gagal mengambil data status berhasil", error);
    } finally {
        state.loadRes = false
    }
}

const getPayment = async () => {
    try {

        const [paymentRes, resvRes, userRes, mejaRes] = await Promise.all([
            api.get(`/payment/`, { headers: { Authorization: `Bearer ${auth.token}` } }),

            api.get(`/reservation/?page=${state.page}&limit=${state.limit}`, { headers: { Authorization: `Bearer ${auth.token}` } }),

            api.get(`/user/`, { headers: { Authorization: `Bearer ${auth.token}` } }),

            api.get(`/meja/`, { headers: { Authorization: `Bearer ${auth.token}` } })
        ])

        const payment = paymentRes.data

        state.paymentResv = resvRes.data.data
        state.paymentUser = userRes.data
        state.paymentMeja = mejaRes.data

        //Convert Map
        const resvMap = new Map(state.paymentResv.map(r => [r.reservation_id, r]))
        const userMap = new Map(state.paymentUser.map(u => [u.user_id, u]));
        const mejaMap = new Map(state.paymentMeja.map(m => [m.meja_id, m]));

        //join data
        state.payment = payment
            .filter(p => p.status === "menunggu")
            .map(p => {
                const resv = resvMap.get(p.reservation_id);

                return {
                    ...p,
                    ...resv,
                    username: userMap.get(resv?.user_id)?.username || "tidak ditemukan",
                    kode_meja: mejaMap.get(resv?.meja_id)?.kode_meja || "tidak ditemukan",
                    lokasi: mejaMap.get(resv?.meja_id)?.lokasi || "tidak ditemukan",
                    kapasitas: mejaMap.get(resv?.meja_id)?.kapasitas || "-"
                }
            })

        console.log("data payment", state.payment);

    } catch (error) {
        console.error("gagal mengambil data payment", error);
    } finally {
        state.loadPayment = false
    }
}

const getFeedback = async () => {

    try {

        const [feedRes, resvRes, userRes] = await Promise.all([

            api.get(`/feedback/`),
            api.get(`/reservation/`, { headers: { Authorization: `Bearer ${auth.token}` } }),
            api.get(`/user/`, { headers: { Authorization: `Bearer ${auth.token}` } })
        ])

        const feedback = feedRes.data;

        state.feedbackResv = resvRes.data.data
        state.feedbackUser = userRes.data

        const userMap = new Map(state.reservationUser.map(u => [u.user_id, u]));

        state.feedback = feedback
            .map(r => ({
                ...r,
                username: userMap.get(r.user_id)?.username || "tidak ditemukan",
            }));

        console.log("ini data feedback", state.feedback);
    } catch (error) {
        console.error("gagal mengambil data feedback", error);
    } finally {
        state.loadfeedback = false
    }

}

// Navigasi halaman
const goPrev = () => {
    if (state.page > 1) {
        state.page--
        getRequest()
    }
}
const goNext = () => {
    if (state.page < state.totalPages) {
        state.page++
        getRequest()
    }
}

onMounted(() => {
    getRequest()
    getReservation()
    getPayment()
    getFeedback()
    checkRole()
})
</script>

<template>
    <div class="flex flex-col w-screen  flex-wrap md:flex-row mt-30">

        <div class="flex flex-col md:col-span-2 w-full">
            <!-- tombol view -->
            <div class="flex flex-row flex-wrap gap-2 my-2 justify-center items-center">
                <button @click="showReq"
                    :class="currentView === 'request' ? 'bg-[#232528] text-white' : 'bg-[#232528]/70 text-white'"
                    class="w-[40%] max-w-[200px] px-2 py-2 rounded-lg text-sm font-semibold transition hover:scale-105 hover:cursor-pointer">
                    Request Reservation
                </button>
                <button @click="showRes"
                    :class="currentView === 'reservation' ? 'bg-[#232528] text-white' : 'bg-[#232528]/70 text-white'"
                    class="w-[40%] max-w-[200px] px-2 py-2 rounded-lg text-sm font-semibold transition hover:scale-105 hover:cursor-pointer">
                    Accepted Reservation
                </button>
                <button @click="showPay"
                    :class="currentView === 'payment' ? 'bg-[#232528] text-white' : 'bg-[#232528]/70 text-white'"
                    class="w-[40%] max-w-[200px] px-2 py-2 rounded-lg text-sm font-semibold transition hover:scale-105 hover:cursor-pointer">
                    Reservation Payment
                </button>
                <button @click="showfeed"
                    :class="currentView === 'feedback' ? 'bg-[#232528] text-white' : 'bg-[#232528]/70 text-white'"
                    class="w-[40%] max-w-[200px] px-2 py-2 rounded-lg text-sm font-semibold transition hover:scale-105 hover:cursor-pointer">
                    Feedback
                </button>
            </div>
        </div>
    </div>

    <div class="flex flex-col justify-center sm:justify-start mt-5">

        <div class="flex flex-col items-center ">

            <!-- Request Reservation -->
            <div v-if="currentView === 'request'">

                <div class="flex flex-col justify-center items-center mb-5">
                    <span class="font-poppins text-2xl font-semibold">
                        Request Reservation
                    </span>
                </div>

                <div v-if="state.loadReq">
                    <PulseLoader color="black" />
                </div>
                <div v-else class="flex flex-col gap-7 sm:flex-row sm:flex-wrap justify-center">

                    <div v-if="!state.request.length" class="text-black text-center font-poppins mt-35 sm:mt-15">
                        Belum ada Request Reservasi baru
                    </div>

                    <RequestReservation v-for="reserve in state.request" :key="reserve.reservation_id"
                        :reservation="reserve" />
                </div>
                <!-- Pagination -->
                <div v-if="state.request.length" class="flex justify-center mt-4 space-x-2 mb-10">
                    <button :disabled="state.page === 1" @click="goPrev"
                        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Prev
                    </button>
                    <span>Halaman {{ state.page }} / {{ state.totalPages }}</span>
                    <button :disabled="state.page === state.totalPages" @click="goNext"
                        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>


            <!-- Accepted Reservation -->
            <div v-if="currentView === 'reservation'">

                <div class="flex flex-col justify-center items-center mb-5">
                    <span class="font-poppins text-2xl font-semibold">
                        Accepted Reservation
                    </span>
                </div>

                <div v-if="!state.reservation.length" class="text-black text-center font-poppins mt-10">
                    Belum ada Reservasi baru
                </div>


                <div v-if="state.loadRes">
                    <PulseLoader color="red" />
                </div>
                <div v-else class="flex flex-col gap-7 sm:flex-row sm:flex-wrap justify-center">
                    <!-- Reservation content -->
                    <AcceptedReservation v-for="resAcc in state.reservation" :key="resAcc.reservation_id"
                        :reservation="resAcc" />
                </div>

                <!-- Pagination -->
                <div v-if="state.reservation.length" class="flex justify-center mt-4 space-x-2 mb-10">
                    <button :disabled="state.page === 1" @click="goPrev"
                        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Prev
                    </button>
                    <span>Halaman {{ state.page }} / {{ state.totalPages }}</span>
                    <button :disabled="state.page === state.totalPages" @click="goNext"
                        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>

            </div>

            <!-- Payment -->
            <div v-if="currentView === 'payment'">

                <div class="flex flex-col justify-center items-center mb-5">
                    <span class="font-poppins text-2xl font-semibold">
                        Reservation Payment
                    </span>
                </div>

                

                <div v-if="state.loadPayment">
                    <PulseLoader color="blue" />
                </div>
                <div v-else class="flex flex-col gap-7 sm:flex-row ">
                    <!-- Payment content -->
                    <Payment v-for="pay in state.payment" :key="pay.payment_id" :payment="pay" />
                </div>
            </div>

            <!-- Feedback -->
            <div v-if="currentView === 'feedback'">
                <div v-if="state.loadfeedback">
                    <PulseLoader color="blue" />
                </div>
                <div v-else>
                    <!-- Feedback content -->
                    <Feedback v-for="feed in state.feedback" :key="feed.feedback_id" :feedback="feed" />
                </div>
            </div>

        </div>

    </div>

</template>
