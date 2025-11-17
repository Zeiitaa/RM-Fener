<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNavStore } from '@/stores/Nav';
import { defineProps } from 'vue';

const auth = useAuthStore();
// const props = defineProps({
//   showNav: Boolean
// })
const nav = useNavStore()

const activeLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath
}

const urusLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("decodedToken")
  localStorage.removeItem("profile")
}

</script>

<template>

  <aside :class="[
    'fixed z-50 bg-[#E9F1F7]/95 flex flex-col rounded-r-xl w-[65vw] h-[90%] transition-transform duration-400 ease-in-out pt-25 sm:w-[37vw] lg:w-[25vw] xl:w-[20vw]',
    nav.show ? 'translate-x-0' : '-translate-x-full md:translate-x-0',

    'pt- md:static h-[90vh] md:z-auto md:translate-x-0 md:w-[25vw] md:bg-transparent lg:w-[20vw] xl:ml-5 ',

  ]">


    <div class="flex flex-col gap-4 space-y-3 grow fixed z-50" >

      <RouterLink to="/"  :class="[activeLink('/')
        ? 'ml-[10vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold sm:ml-[3vw] sm:w-[25vw] md:w-[15vw] md:ml-[5vw] xl:w-[12vw] xl:ml-[4vw] '
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Home</span></RouterLink>

      <RouterLink to="/catalog" @click="nav.show = false" :class="[activeLink('/catalog')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] sm:w-[25vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Catalog</span></RouterLink>

      <RouterLink  to="/reservations" :class="[activeLink('/reservations')
        ? 'ml-[5vw] w-[45vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[3vw] sm:w-[25vw] md:w-[20vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Reservation</span></RouterLink>

      <RouterLink v-if="auth.anggota" to="/contact" :class="[activeLink('/contact')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#547792] text-white font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Contact Us!</span></RouterLink>

      <RouterLink v-if="auth.isPetugas" to="/users" :class="[activeLink('/users')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Users</span></RouterLink>

      <RouterLink v-if="auth.isPetugas" to="/approve" :class="[activeLink('/approve')
        ? 'ml-[5vw] w-[45vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] md:w-[18vw] lg:w-[14vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[45vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[18vw] lg:w-[14vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Peminjaman</span></RouterLink>

      <RouterLink v-if="auth.isPetugas" to="/kembali" :class="[activeLink('/kembali')
        ? 'ml-[5vw] w-[48vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] md:w-[20vw] lg:w-[16vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[48vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[20vw] lg:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Pengembalian</span></RouterLink>
    </div>

    <!-- LOGOUT di paling bawah -->
    <RouterLink to="/login" @click.prevent="urusLogout" :class="[activeLink('/login')
      ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text- font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw]'
      : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
      'px-4', 'py-3', 'rounded-md', 'font-poppins', 'mt-auto', 'mb-15']">
      Login
    </RouterLink>


  </aside>

  <!-- <div class="md:ml-auto ">
        <div :class="[activeLink('/login')
            ? 'hidden'
            : 'flex space-x-5'
        ]">
            <RouterLink v-if="!auth.token" to="/login"
                class=" hover:scale-105 transition-all duration-200 text-white bg-[#36393b] font-semibold mr-2 px-4 text-sm sm:text-lg md:px-6 py-2 rounded-md font-poppins">
                Sign up </RouterLink>
            <h2 class="text-black text-xl font-poppins mr-5" v-else>{{ auth.profile.username }}
            </h2>
        </div>
    </div> -->

</template>