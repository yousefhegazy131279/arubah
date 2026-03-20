// middleware/guest.js
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  // إذا كان المستخدم مسجلاً بالفعل، امنعه من الدخول لصفحات الدخول/التسجيل
  if (process.client && !userStore.loading && userStore.isLoggedIn) {
    return navigateTo('/')
  }
})