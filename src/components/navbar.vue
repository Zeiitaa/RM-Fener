<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onMounted, ref, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/counter';
import logo from '@/assets/img/logo.jpeg';
import { UserCircleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import sideNav from './sideNav.vue';

const auth = useAuthStore();
const route = useRoute();

const activeLink = (routePath) => {
    return route.path === routePath
}

const showNav = ref(false)
const isItMobile = ref(false)
onMounted(() => {
    const check = window.matchMedia('(max-width: 767px)')
    isItMobile.value = check.matches

    //fungsi jika ukuran berubah
    const handleResize = (e) => {
        isItMobile.value = e.matches

        if (!isItMobile.value) {
            showNav.value = false
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

    <nav class="bg-[E9F1F7]" style="border: 2px solid red;">
        <div class="mx-auto max-w-dvw px-2 sm:px-6 lg:px-8">
            <div class="flex h-20 items-center justify-between">
                <div class="flex flex-1 justify-between items-center md:items-center md:justify-start">

                    <!-- Collapse sideNav atau apalah buat mobile -->
                    <div class="flex ml-[5vw] md:hidden">
                        <button @click="showNav = !showNav" class="text-black">

                        <XMarkIcon class="size-7 text-black" v-if="showNav"/> <Bars3Icon class="size-7 text-black"  v-else/>

                        </button>
                    </div>

                    <!-- Logo -->
                    <RouterLink to="/" :class="[(route.name === 'login' || route.name === 'register')
                        ? 'hidden'
                        : 'flex shrink-0 items-center mr-4 hover:scale-110 transition-all duration-200'
                    ]">
                        <img class="hidden sm:block h-20 w-auto" :src="logo" alt="Perpustakaan Logo" />
                        <span
                            class=" sm:block text-black text-lg
                             font-bold font-poppins ml-2 ">RM PADANG</span>
                    </RouterLink>
                    
                </div>
            </div>
        </div>
    </nav>

  <sideNav v-show="isItMobile" :show-nav="showNav"/>

</template>