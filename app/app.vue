<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUser()
})
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #050814;
  color: white;
  font-family: 'Cairo', sans-serif;
}
</style>