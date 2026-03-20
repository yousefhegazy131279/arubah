<template>
    <div class="auth-page">
      <Navbar />
      <div class="auth-container">
        <div class="auth-card" data-aos="fade-up">
          <h2>إنشاء حساب جديد</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label>اسم المستخدم</label>
              <input type="text" v-model="username" required />
            </div>
            <div class="form-group">
              <label>البريد الإلكتروني</label>
              <input type="email" v-model="email" required />
            </div>
            <div class="form-group">
              <label>كلمة المرور</label>
              <input type="password" v-model="password" required />
            </div>
            <button type="submit" :disabled="loading">تسجيل</button>
            <p v-if="error" class="error">{{ error }}</p>
          </form>
          <p class="switch-link">لديك حساب بالفعل؟ <NuxtLink to="/login">سجل دخول</NuxtLink></p>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '~/stores/user'
  import { useRouter } from 'vue-router'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref('')
  
  // إذا كان المستخدم مسجلاً بالفعل، نعيده للصفحة الرئيسية
  onMounted(() => {
    if (userStore.isLoggedIn) {
      router.push('/')
    }
  })
  
  const handleRegister = async () => {
    loading.value = true
    error.value = ''
    const res = await userStore.register({ username: username.value, email: email.value, password: password.value })
    if (res.success) {
      const loginRes = await userStore.login({ email: email.value, password: password.value })
      if (loginRes.success) {
        router.push('/')
      } else {
        error.value = loginRes.message
      }
    } else {
      error.value = res.message
    }
    loading.value = false
  }
  </script>
  
  <style scoped>
.auth-page {
    min-height: 100vh;
    background: #050814;
    color: white;
    direction: rtl;
  }
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  .auth-card {
    background: rgba(20, 25, 40, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    border: 1px solid rgba(255,215,0,0.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .auth-card h2 {
    color: gold;
    text-align: center;
    margin-bottom: 30px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #aaa;
  }
  .form-group input {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,215,0,0.3);
    background: rgba(0,0,0,0.3);
    color: white;
    outline: none;
  }
  .form-group input:focus {
    border-color: gold;
  }
  button {
    width: 100%;
    padding: 14px;
    background: gold;
    color: #050814;
    border: none;
    border-radius: 30px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255,215,0,0.3);
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .error {
    color: #ff6b6b;
    margin-top: 15px;
    text-align: center;
  }
  .switch-link {
    text-align: center;
    margin-top: 20px;
    color: #aaa;
  }
  .switch-link a {
    color: gold;
    text-decoration: none;
  }  
</style>