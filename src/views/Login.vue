<script setup>

import { onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores/counter';

const form = reactive({
    Username: '',
    Password: '',
})

const tmplPass = ref(false)
</script>

<template>
    <div class="flex flex-col items-center bg-[#232528] w-[72vw] mt-[23vh] mx-auto my-auto p-8 shadow-2xl rounded-xl
            sm:w-[50vw]
            md:w-[43vw]
            lg:w-[35vw]
            xl:w-[25vw]
            2xl:w-[21vw] 2xl:p-10
        ">
        <!-- flex flex-col items-center w-[21vw] h-[47vh] mx-auto mt-[25vh] p-6 bg-[#547792] shadow-lg rounded-2xl -->


        <RouterLink to="/">
            <img class=" mx-auto mt-[-0.5vh] h-25 w-auto hover:scale-110" :src="logo" alt="Perpustakaan Logo" />
        </RouterLink>
        <h2 class="text-xl text-white text-center font-bold font-poppins mb-2">Welcome to Perpustakaan</h2>

        <span class="text-sm text-white font-poppins">Belum punya akun? <RouterLink to="/register"
                class="text-[#9dd1f1] font-poppins">Sign
                Up</RouterLink></span>

        <form @submit.prevent="urusLogin" class="mt-8 flex flex-col gap-6 items-center w-[60vw]
            sm:w-[38vw]
            md:w-[34vw]
            lg:w-[28vw]
            xl:w-[20vw]
            2xl:w-[18vw]
        ">
            <input v-model="form.Username" type="text" placeholder="Username"
                class="w-[95%] ml-2 mr-2 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

            <div class="relative w-[95%]">
                <!-- input -->
                <input v-model="form.Password" :type="tmplPass ? 'text' : 'password'" placeholder="Password" class="w-full bg-[#E9F1F7] border border-[#7895B2] rounded p-2 pr-10 font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

                <!-- icon -->
                <i :class="tmplPass ? 'pi pi-eye-slash' : 'pi pi-eye'"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                    @click="tmplPass = !tmplPass"></i>
            </div>
            <button type="submit" class="py-2 w-[75%] mt-5 bg-[#E9F1F7] hover:bg-[#c6cacd] hover:cursor-pointer text-black rounded hover:scale-102 transition-all duration-100 hover:font-semibold
                    sm:w-[70%]
                ">
                Login
            </button>

        </form>

    </div>
</template>