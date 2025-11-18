<script setup>

import { RouterLink } from 'vue-router';

</script>


<template>
    <footer class="bg-[#0f172a] text-gray-300 py-12 mt-20">
  <div class="max-w-7xl mx-auto px-6 grid gap-10
              sm:grid-cols-2 md:grid-cols-4">

    <!-- Logo -->
    <div class="sm:col-span-2 md:col-span-1 text-center sm:text-left">
      <h2 class="text-xl font-bold text-white">RM PADANG</h2>
      <p class="mt-3 text-sm leading-relaxed">
        Nikmati hidangan lezat dengan reservasi cepat & tanpa ribet. <br>
        Premium Dining Zero Waiting
      </p>
    </div>

    <!-- Navigate -->
    <div class="text-center sm:text-left">
      <h3 class="font-semibold text-white mb-3">Navigate</h3>
      <ul class="space-y-2 text-sm">
        <li><RouterLink to="#" class="hover:text-white">Home</RouterLink></li>
        <li><RouterLink to="/catalogs" class="hover:text-white">Catalog</RouterLink> </li>
        <li><RouterLink to="/reservations" class="hover:text-white">Reservation</RouterLink></li>
        <li><RouterLink to="about" class="hover:text-white">About Us</RouterLink></li>
      </ul>
    </div>

    <!-- Info -->
    <div class="text-center sm:text-left">
      <h3 class="font-semibold text-white mb-3">Information</h3>
      <ul class="space-y-2 text-sm">
        <li><a class="hover:text-white">FAQ</a></li>
        <li><a class="hover:text-white">Privacy Policy</a></li>
        <li><a class="hover:text-white">Terms & Conditions</a></li>
      </ul>
    </div>

    <!-- Contact -->
    <div class="text-center sm:text-left">
      <h3 class="font-semibold text-white mb-3">Contact</h3>
      <ul class="space-y-2 text-sm">
        <li>📍 Samarinda</li>
        <li>📞 +62 821-5420-6769 </li>
        <li>📧 rmpadang@example.com</li>
      </ul>
    </div>

  </div>

  <div class="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
    © 2025 YourRestaurant. All rights reserved.
  </div>
</footer>
</template>