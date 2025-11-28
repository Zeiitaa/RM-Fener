<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNavStore } from '@/stores/Nav';
import logo from '@/assets/img/logo.png';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import sideNav from './sideNav.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter()

const activeLink = (routePath) => {
    return route.path === routePath
}

const nav = useNavStore();
const isItMobile = ref(false)
onMounted(() => {
    const check = window.matchMedia('(max-width: 767px)')
    isItMobile.value = check.matches

    //fungsi jika ukuran berubah
    const handleResize = (e) => {
        isItMobile.value = e.matches

        if (!isItMobile.value) {
            nav.value = false
        }
    }

    //dengan eventListener fungsi tadi dapat selalu di pantau kebenarannya
    check.addEventListener('change', handleResize)

    onUnmounted(() => {
        check.removeEventListener('change', handleResize)
    })
})

const urusLogout = () => {

    auth.logout()

    localStorage.removeItem("token")
    localStorage.removeItem("decodetoken")
    localStorage.removeItem("profile")
    
    router.push("/login")
}

</script>

<template>

    <nav class="fixed top-0 left-0 w-full z-60 bg-[#232528]">
        <div class="mx-auto max-w-dvw px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between w-full">
                <div class="flex flex-1 justify-between items-center md:items-center">

                    <!-- Collapse sideNav atau apalah buat mobile -->
                    <div class="flex ml-[5vw] md:hidden ">
                        <button @click="nav.show = !nav.show" class="text-black">

                            <XMarkIcon class="size-7 text-white" v-if="nav.show" />
                            <Bars3Icon class="size-7 text-white" v-else />

                        </button>
                    </div>

                    <!-- Logo -->
                    <RouterLink to="/" :class="[(route.name === 'login' || route.name === 'register')
                        ? 'hidden'
                        : 'flex shrink-0 items-center hover:scale-110 transition-all duration-200'
                    ]">
                        <img class="hidden md:block h-15 w-auto scale-80" :src="logo" alt="Perpustakaan Logo" />
                        <span class="sm:block text-white text-xl
                             font-bold font-poppins border-bottom-black">RM PADANG</span>
                    </RouterLink>

                    <div class="hidden md:flex lg:mr-20">
                        <div class="">
                            <RouterLink to="/" :class="[
                                activeLink('/')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>HOME</span>
                            </RouterLink>

                            <RouterLink to="/catalogs" @click="nav.show = false" :class="[
                                activeLink('/catalogs')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>CATALOG</span>
                            </RouterLink>

                            <RouterLink to="/reservations" :class="[
                                activeLink('/reservations')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>RESERVATION</span>
                            </RouterLink>


                            <RouterLink v-if="auth.isAnggota" to="/myReservation" :class="[
                                activeLink('/myReservation')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>MY RESERVATION</span>
                            </RouterLink>

                            <!-- ini khusus petugas -->
                            <RouterLink v-if="auth.isPetugas" to="/Admin" :class="[activeLink('/Admin')
                                ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]"><span>ADMINPAGE</span></RouterLink>

                        </div>
                    </div>

                    <div v-if="!auth.token" class="hidden md:flex items-center space-x-3 text-white">
                        <RouterLink to="/login" :class="[
                            activeLink('/login')
                                ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                : 'text-white font-bold border-b-4 border-transparent scale-100',
                            'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                        ]">
                            <span>LOGIN</span>
                        </RouterLink>
                    </div>

                    <div v-else class="hidden lg:flex items-center space-x-3 text-white relative group cursor-pointer">

                        <div class="w-9 h-9 bg-white rounded-full"></div>
                        <span v-if="auth.profile" class="font-poppins font-semibold">Hi, {{ auth.profile.username }}</span>

                        <!-- DROPDOWN -->
                        <div class="absolute top-full right-0 mt-2 w-40 bg-[#232528] text-white rounded-lg shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-200 ease-out">

                            <button @click="urusLogout"
                                class="w-full text-left px-4 py-3 hover:cursor-pointer rounded hover:bg-gray-700 font-poppins text-sm">
                                Logout
                            </button>

                        </div>
                    </div>

                    <img class=" md:hidden h-15 mb-3 w-auto scale-80" :src="logo" alt="Perpustakaan Logo" />
                </div>


            </div>
        </div>
    </nav>

    <sideNav v-show="isItMobile" />

</template>