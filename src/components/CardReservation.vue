<script setup>
import { defineProps, reactive, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import image from '@/assets/img/family.jpg'
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';
import api from '@/helpers/api';
import { useToast } from 'vue-toastification';

const props = defineProps({
  meja: Object
})

const auth = useAuthStore()
const toast = useToast()
const showPopup = ref(false)

console.log(showPopup.value);

const form = reactive({
  tgl_reservasi: null,
  jam: null,
  jumlah: ''
})



//Endpoint API request reservation
const reqReservation = async () => {

  const newReservation = {
    user_id: auth.profile.user_id,
    meja_id: props.meja.meja_id,
    tanggal_reservasi: form.tgl_reservasi,
    jam_reservasi: form.jam,
    jumlah_orang: form.jumlah,
    status: "menunggu"
  }

  console.log(newReservation);

  try {
    // kirim ke endpoint
    const response = await api.post(`/reservation/`, newReservation,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )
    console.log(response.data);

    showPopup.value = false
    toast.success('Reservaation has been made!')
  } catch (error) {
    console.error(error);
  }
}

const check = () => {
  if(props.meja.status == "tidaktersedia")
  return showPopup.value = false
  else 
  return showPopup.value = true
}

</script>

<template>
  <div @click="check" class="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:cursor-pointer transition-all duration-200 w-[80vw] max-w-[250px]
    sm:w-[35vw]
    md:w-[30vw]
    lg:w-[22.5vw]
    xl:w-[20vw]
    2xl:w-[15vw]
    ">
    <!-- IMAGE -->
    <img :src="image" alt="" class="w-full h-44 object-cover" />

    <!-- CONTENT -->
    <div class="p-4 space-y-2">
      <h2 class="text-sm font-bold uppercase">Kode Meja {{ props.meja.kode_meja }}</h2>
      <p class="text-xs text-gray-500">For {{ props.meja.kapasitas }} People</p>
      <p class="text-xs text-gray-500"> {{ props.meja.status }} </p>

      <div class="flex items-center justify-between mt-3">
        <div class="text-xs font-semibold">
          <span class="text-red-500">Lokasi {{ props.meja.lokasi }}</span>
        </div>

        <button
          class="w-8 h-8 flex hover:scale-105 hover:cursor-pointer transition-all duration-200 items-center justify-center border border-black rounded-full">
          <PlusIcon class="size-4" />
        </button>
      </div>
    </div>
  </div>

  <div v-if="showPopup" class="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50"
    @click.self="showPopup = false">

    <!-- isi popup -->
    <div class="bg-[#232528] p-6 rounded-xl shadow-xl w-[85%] h-[55%] 2xl:h-[53%] max-w-md max-h-md">
      <h2 class="text-xl text-white font-bold">Kode Meja {{ props.meja.kode_meja }}</h2>
      <p class="text-xs text-white">For {{ props.meja.kapasitas }} People</p>
      <span class="text-white">Lokasi {{ props.meja.lokasi }}</span>

      <form @submit.prevent="reqReservation" class="flex flex-col">
        <input v-model="form.tgl_reservasi" type="date" placeholder="Pilih Tanggal"
          class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

        <input v-model="form.jam" type="time" placeholder="Jam Reservasi"
          class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

        <input v-model="form.jumlah" type="number" placeholder="Jumlah Orang"
          class="w-full mt-10 bg-[#E9F1F7] p-2 border-[#7895B2] rounded font-poppins hover:scale-102 transition-all duration-100 focus:outline-none" />

        <button v-if="auth.token" type="submit" class="px-4 py-2 mt-15 max-w-[200px] w-full bg-green-500 text-white rounded-lg mx-auto flex justify-center hover:scale-105 hover:cursor-pointer">
          Submit Reservation
        </button>
        <button v-else
          class="px-4 py-2 mt-15 max-w-[200px] w-full bg-blue-500 text-white rounded-lg mx-auto flex justify-center hover:scale-105 hover:cursor-pointer">
          <RouterLink to="/login">Login</RouterLink>
        </button>
      </form>

    </div>
  </div>
</template>