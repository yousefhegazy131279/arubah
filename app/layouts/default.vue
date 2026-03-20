<template>
    <div>
      <Navbar />
      <SidebarAuth />  <!-- هنا -->
      <slot />
      
    </div>
  </template>
  
<!-- layouts/default.vue -->
<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})
</script>