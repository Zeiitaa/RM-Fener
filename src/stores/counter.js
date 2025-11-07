import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/helpers/api'

export const useAuthStore = defineStore('auth', {
  
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
    profile: JSON.parse(localStorage.getItem("profile")) || null,
  }),

 
})
