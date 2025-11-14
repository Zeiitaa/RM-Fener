<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNavStore } from '@/stores/Nav';
import logo from '@/assets/img/logo.jpeg';
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

    <nav class="bg-[E9F1F7]">
        <div class="mx-auto max-w-dvw px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 justify-between items-center md:items-center md:justify-start">

                    <!-- Collapse sideNav atau apalah buat mobile -->
                    <div class="flex ml-[5vw] md:hidden">
                        <button @click="nav.show = !nav.show" class="text-black">

                            <XMarkIcon class="size-7 text-black" v-if="nav.show" />
                            <Bars3Icon class="size-7 text-black" v-else />

                        </button>
                    </div>

                    <!-- Logo -->
                    <RouterLink to="/" :class="[(route.name === 'login' || route.name === 'register')
                        ? 'hidden'
                        : 'flex shrink-0 items-center mr-4 hover:scale-110 transition-all duration-200'
                    ]">
                        <img class="hidden sm:block h-20 w-auto" :src="logo" alt="Perpustakaan Logo" />
                        <span class=" sm:block text-black text-xl
                             font-bold font-poppins ml-2  border-bottom-black">RM PADANG</span>
                    </RouterLink>

                    <MagnifyingGlassIcon class="size-7 mr-2 mb-2"/>

                </div>
            </div>
        </div>
    </nav>

    <sideNav v-show="isItMobile" />

</template>