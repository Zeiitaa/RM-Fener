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



</script>

<template>

    <nav class="fixed top-0 left-0 w-full z-60 bg-[#232528]">
        <div class="mx-auto max-w-dvw px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
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
                        : 'flex shrink-0 items-center mr-4 hover:scale-110 transition-all duration-200'
                    ]">
                        <img class="hidden md:block h-15 w-auto scale-80" :src="logo" alt="Perpustakaan Logo" />
                        <span class="sm:block text-white text-xl
                             font-bold font-poppins ml-2  border-bottom-black">RM PADANG</span>
                    </RouterLink>

                    <div class="hidden md:flex">
                        <div class="">
                            <RouterLink to="/" :class="[
                                activeLink('/')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>Home</span>
                            </RouterLink>

                            <RouterLink to="/catalogs" @click="nav.show = false" :class="[
                                activeLink('/catalogs')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>Catalog</span>
                            </RouterLink>

                            <RouterLink to="/reservations" :class="[
                                activeLink('/reservations')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>Reservation</span>
                            </RouterLink>

                            <RouterLink to="/about" :class="[
                                activeLink('/about')
                                    ? 'bg-[#232528] text-white font-bold border-b-4 border-white scale-100'
                                    : 'text-white font-bold border-b-4 border-transparent scale-100',
                                'px-4 py-3 font-poppins transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:border-white'
                            ]">
                                <span>About</span>
                            </RouterLink>

                        </div>
                    </div>

                    <!-- <MagnifyingGlassIcon class="size-7 mr-2 mb-2 text-white" /> -->
                    <img class=" md:hidden h-15 mb-3 w-auto scale-80" :src="logo" alt="Perpustakaan Logo" />
                </div>


            </div>
        </div>
    </nav>

    <sideNav v-show="isItMobile" />

</template>