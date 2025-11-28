import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import HomeView from '@/views/HomeView.vue'
import Reservations from '@/views/Reservations.vue'
import NotFound from '@/views/NotFound.vue'
import MyReservation from '@/views/MyReservation.vue'
import about from '@/views/About.vue'
import Catalogs from '@/views/Catalogs.vue'
import Admin from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{

      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        hideNavbar: true
      },
      component: Login
    },

    {
      path: '/register',
      name: 'register',
      meta: {
        hideNavbar: true
      },
      component: Register
    },

    {
      path: '/catalogs',
      name: 'catalogs',
      component: Catalogs
    },

    {
      path: '/reservations',
      name: 'reservations',
      component: Reservations
    },

    {
      path:'/myReservation',
      name: 'myReservation',
      component: MyReservation
    },

    {
      path:'/about',
      name: 'about',
      component: about
    },

    {
      path: '/admin',
      name: 'admin-page',
      component: Admin
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },

  ],

})

export default router