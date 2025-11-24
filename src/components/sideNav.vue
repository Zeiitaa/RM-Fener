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
    'fixed md:static top-0 left-0 h-screen bg-[#E9F1F7]/95 md:bg-transparent rounded-r-xl z-50 flex flex-col pt-24 transition-transform duration-300',
    'w-[70vw] sm:w-[50vw] md:w-[22vw] lg:w-[18vw]',
    nav.show ? 'translate-x-0' : '-translate-x-full md:translate-x-0'

  ]">


    <div class="flex flex-col gap-4 space-y-3 grow ">

      <!-- ini visible ke semua role termasuk yang belum login -->
      <RouterLink to="/" @click="nav.show = false" :class="[activeLink('/')
        ? 'ml-[10vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold sm:ml-[3vw] sm:w-[25vw] md:w-[15vw] md:ml-[5vw] xl:w-[12vw] xl:ml-[4vw] '
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Home</span></RouterLink>

      <RouterLink to="/catalogs" @click="nav.show = false" :class="[activeLink('/catalogs')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] sm:w-[25vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Catalog</span></RouterLink>

      <RouterLink to="/reservations" @click="nav.show = false" :class="[activeLink('/reservations')
        ? 'ml-[5vw] w-[45vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[3vw] sm:w-[25vw] md:w-[20vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Reservation</span></RouterLink>

      <!-- ini khusus anggota yang sudah login -->
      <RouterLink v-if="auth.isAnggota" to="/myReservation" :class="[activeLink('/myReservation')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>My Reservation</span></RouterLink>

      <!-- ini khusus petugas -->
      <RouterLink to="/Admin" :class="[activeLink('/Admin')
        ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text-white font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw] xl:ml-[4vw]'
        : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
        'px-4', 'py-3', 'rounded-md', 'font-poppins']"><span>Admin Page</span></RouterLink>
    </div>

    <!-- LOGOUT di paling bawah -->
    <RouterLink v-if="!auth.token" to="/login" @click.prevent="urusLogout" :class="[activeLink('/login')
      ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text- font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw]'
      : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
      'px-4', 'py-3', 'rounded-md', 'font-poppins', 'mt-auto', 'mb-15']">
      Login
    </RouterLink>
    <RouterLink v-else to="/login" @click.prevent="urusLogout" :class="[activeLink('/login')
      ? 'ml-[5vw] w-[35vw] hover:scale-115 transition-all duration-200 bg-[#232528] text- font-bold md:ml-[2vw] md:w-[15vw] xl:w-[12vw]'
      : 'ml-[2vw] w-[35vw] hover:bg-[#232528] hover:text-white hover:scale-115 transition-all duration-200 text-black font-bold md:w-[15vw] xl:w-[12vw]',
      'px-4', 'py-3', 'rounded-md', 'font-poppins', 'mt-auto', 'mb-15']">
      Logout
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