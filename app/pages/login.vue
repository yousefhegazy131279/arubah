<template>
  <div class="login-page">
    <!-- خلفية متحركة -->
    <div class="animated-bg">
      <div class="bg-glow"></div>
      <div class="bg-particles">
        <span v-for="i in 30" :key="i" class="particle"></span>
      </div>
    </div>

    <div class="login-container">
      <div class="login-card" data-aos="fade-up" data-aos-duration="800">
        <!-- الشعار -->
        <div class="logo-wrapper" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="200">
          <img src="/logo.png" alt="عُروبة" class="logo">
        </div>

        <h2 data-aos="fade-left" data-aos-delay="300">تسجيل الدخول</h2>

        <form @submit.prevent="handleLogin">
          <div v-if="error" class="error-message" data-aos="fade-in">
            {{ error }}
          </div>

          <div class="form-group" data-aos="fade-left" data-aos-delay="400">
            <label for="email">البريد الإلكتروني</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="أدخل بريدك الإلكتروني"
              required
            />
          </div>

          <div class="form-group" data-aos="fade-left" data-aos-delay="500">
            <label for="password">كلمة المرور</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            data-aos="zoom-in" 
            data-aos-delay="600"
          >
            <span v-if="loading" class="spinner"></span>
            <span v-else>دخول</span>
          </button>

          <p class="switch-link" data-aos="fade-up" data-aos-delay="700">
            ليس لديك حساب؟ 
            <NuxtLink to="/register">سجل الآن</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  const result = await userStore.login({ email: email.value, password: password.value })
  loading.value = false
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || 'فشل تسجيل الدخول'
  }
}

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 50
  })
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #050814;
  position: relative;
  overflow: hidden;
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* خلفية متحركة */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%);
  animation: rotateBg 25s linear infinite;
}

@keyframes rotateBg {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.bg-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: gold;
  border-radius: 50%;
  opacity: 0.3;
  animation: float 8s infinite ease-in-out;
}

.particle:nth-child(1) { top: 10%; left: 20%; animation-duration: 7s; }
.particle:nth-child(2) { top: 30%; left: 80%; animation-duration: 9s; }
.particle:nth-child(3) { top: 70%; left: 10%; animation-duration: 11s; }
.particle:nth-child(4) { top: 90%; left: 90%; animation-duration: 8s; }
.particle:nth-child(5) { top: 40%; left: 40%; animation-duration: 10s; }
.particle:nth-child(6) { top: 20%; left: 60%; animation-duration: 12s; }
.particle:nth-child(7) { top: 80%; left: 30%; animation-duration: 7.5s; }
.particle:nth-child(8) { top: 50%; left: 70%; animation-duration: 9.5s; }
/* يمكن إضافة المزيد */

@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
  50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
}

/* الحاوية */
.login-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

/* البطاقة */
.login-card {
  background: rgba(10, 12, 25, 0.7);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 40px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.2) inset;
  transition: transform 0.3s;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px gold inset;
}

/* الشعار */
.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(0 4px 15px rgba(255, 215, 0, 0.5));
  border-radius: 50%;
  border: 2px solid gold;
  padding: 5px;
  background: rgba(5, 8, 20, 0.5);
}

.login-card h2 {
  color: gold;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
}

/* رسالة الخطأ */
.error-message {
  background: rgba(231, 76, 60, 0.2);
  color: #ff6b6b;
  padding: 12px;
  border-radius: 30px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #ff6b6b;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

/* حقول النموذج */
.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.form-group input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 50px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
  backdrop-filter: blur(5px);
}

.form-group input:focus {
  border-color: gold;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  background: rgba(0, 0, 0, 0.5);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}

/* زر الدخول */
button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(145deg, #ffd700, #f0c000);
  color: #050814;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
}

button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

button:hover:not(:disabled)::after {
  opacity: 1;
}

button:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.5);
}

button:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* سبينر التحميل */
.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(5, 8, 20, 0.3);
  border-radius: 50%;
  border-top-color: #050814;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* رابط التبديل */
.switch-link {
  text-align: center;
  margin-top: 25px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.switch-link a {
  color: gold;
  text-decoration: none;
  font-weight: 600;
  margin-right: 5px;
  transition: all 0.2s;
  border-bottom: 1px solid transparent;
}

.switch-link a:hover {
  border-bottom-color: gold;
  text-shadow: 0 0 10px gold;
}

/* تأثيرات AOS */
[data-aos="fade-up"] {
  transform: translateY(30px);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-up"].aos-animate {
  transform: translateY(0);
  opacity: 1;
}

[data-aos="fade-left"] {
  transform: translateX(-30px);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-left"].aos-animate {
  transform: translateX(0);
  opacity: 1;
}

[data-aos="zoom-in"] {
  transform: scale(0.8);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="zoom-in"].aos-animate {
  transform: scale(1);
  opacity: 1;
}

[data-aos="fade-in"] {
  opacity: 0;
  transition-property: opacity;
}

[data-aos="fade-in"].aos-animate {
  opacity: 1;
}

/* تحسينات للأجهزة الصغيرة */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  .logo {
    width: 70px;
    height: 70px;
  }
  .login-card h2 {
    font-size: 1.8rem;
  }
  button {
    padding: 14px;
  }
}
</style>