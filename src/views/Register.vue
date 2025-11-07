<script setup>
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/counter';
import { useToast } from 'vue-toastification';
import api from '@/helpers/api';

const auth = useAuthStore();
const router = useRouter();
const toast = useToast();
const form = reactive({
    Nama: '',
    Username: '',
    Alamat: '',
    No_Telp: '',
    Email: '',
    Password: '',
    VPassword: '',
})

const errorMsg = ref("")

const urusRegis = async () => {
    if (form.Password !== form.VPassword){
        errorMsg.value = "Password tidak sama!"
        return
    }

    errorMsg.value = ""

    const newUser = {
        nama: form.Nama,
        username: form.Username,
        alamat: form.Alamat,
        no_telp: form.no_telp,
        email: form.email,
        password: form.Password
    }

    try{
        const response = await api.post(`/`, newUser) 

        if(auth.token) {
            toast.success("Sukses Tambah User")
            
            //kembali ke page sebelumnya
            router.push('/')
        } else {
            // customer
            router.push('/login')
        }

    } catch (error) {
        if(error.response) {
            console.error("Error response", error.responnse.data);
        } else {
            console.error("Error Registering", error);
        }
    }
    
}

const tmplPass = ref(false)
</script>

<template>
    <div class="flex flex-col items-center max-w-3xl p-8 rounded-2xl mx-auto md:mt-[15vh]
  ">
    <RouterLink to="/">
            <img class=" mx-auto mt-[-0.5vh] h-25 w-auto hover:scale-110" :src="logo" alt="Perpustakaan Logo" />
        </RouterLink>

    <!-- Title -->
    <h2 class="text-2xl text-black text-center font-bold font-poppins mt-4">Welcome to Perpustakaan</h2>
    <span class="text-sm text-black font-poppins">
      Sudah punya akun?
      <RouterLink to="/login" class="text-black font-bold hover:underline">Login</RouterLink>
    </span>

    <!-- Form -->
    <form @submit.prevent="urusRegis" class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
      <!-- Username -->
      <div>
        <label class="block text- font-poppins mb-1">Username</label>
        <input v-model="form.Username" type="text" placeholder="Username"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Nama -->
      <div>
        <label class="block text- font-poppins mb-1">Nama Lengkap</label>
        <input v-model="form.Nama" type="text" placeholder="Nama Lengkap"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Email -->
      <div>
        <label class="block text- font-poppins mb-1">Email</label>
        <input v-model="form.Email" type="email" placeholder="Email"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- No Telp -->
      <div>
        <label class="block text- font-poppins mb-1">Nomor Telepon</label>
        <input v-model="form.No_Telp" type="tel" placeholder="Nomor Telepon"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Alamat (full width) -->
      <div class="md:col-span-2">
        <label class="block text- font-poppins mb-1">Alamat</label>
        <input v-model="form.Alamat" type="text" placeholder="Alamat"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <!-- Password -->
      <div>
        <label class="block text- font-poppins mb-1">Password</label>
        <div class="flex items-center bg- border border-gray-500 rounded-md">
          <input v-model="form.Password" :type="tmplPass ? 'text' : 'password'" placeholder="Password"
            class="flex-1 bg-transparent p-2 font-poppins focus:outline-none" />
          <i :class="tmplPass ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-black cursor-pointer px-3"
            @click="tmplPass = !tmplPass"></i>
        </div>
      </div>

      <!-- Verify Password -->
      <div>
        <label class="block text-white font-poppins mb-1">Konfirmasi Password</label>
        <input v-model="form.VPassword" type="password" placeholder="Konfirmasi Password"
          class="w-full bg- p-2 border border-gray-500 rounded-md font-poppins focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>



      <!-- Error message -->
      <div class="" v-if="errorMsg">
        <p class="text-red-500 text-center font-poppins">{{ errorMsg }}</p>
      </div>

      <!-- Button -->
      <div class="flex md:col-span-2 mt-3 md:mt-5 justify-center">
        <button type="submit"
          class="py-3 text-center w-[50vw] bg-[#232528] hover:bg-[#383a3d] hover:scale-105 hover:cursor-pointer text-white rounded-xl transition-all duration-200
          md:w-[30vw]
          lg:w-[23vw]
          xl:w-[16vw]
          2xl:w-[13vw]
          ">
          Register
        </button>
      </div>
    </form>
  </div>
</template>