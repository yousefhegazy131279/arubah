<template>
  <div class="login-page">
    <h1>تسجيل دخول Admin</h1>
    <input v-model="username" placeholder="اسم المستخدم" />
    <input v-model="password" type="password" placeholder="كلمة المرور" />
    <button @click="login">تسجيل دخول</button>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const res = await $fetch('http://localhost/arubah_api/login.php', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    if(res.success) router.push('/admin')
    else error.value = res.message
  } catch(e) { error.value = 'حدث خطأ أثناء الاتصال بالسيرفر' }
}
</script>

<style scoped>
.login-page { max-width: 400px; margin: 8rem auto; text-align: center; color: white; }
input { width: 100%; margin-bottom: 15px; padding: 10px; border-radius: 8px; border: 1px solid gold; background: rgba(255,255,255,0.05); color: white; }
button { padding: 10px 20px; border:none; border-radius:8px; background: gold; cursor:pointer; color:#050814; font-weight:bold; }
.error { color: #e74c3c; margin-top: 10px; }
</style>