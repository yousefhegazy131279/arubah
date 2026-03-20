<template>
  <div class="contact-page">
    <Navbar />

    <!-- خلفية متحركة -->
    <div class="page-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="container">
      <!-- عنوان الصفحة -->
      <div class="page-header" data-aos="fade-down" data-aos-duration="1000">
        <h1 class="page-title">
          <span class="title-word" data-aos="fade-left" data-aos-delay="200">تواصل</span>
          <span class="title-word gold" data-aos="fade-up" data-aos-delay="300">معنا</span>
        </h1>
        <p class="page-subtitle" data-aos="fade-up" data-aos-delay="400">
          يسعدنا سماع آرائكم واقتراحاتكم لتطوير مشروع "عُروبة"
        </p>
        <div class="title-decoration" data-aos="zoom-in" data-aos-delay="500">
          <span class="decoration-line"></span>
          <span class="decoration-star">✨</span>
          <span class="decoration-line"></span>
        </div>
      </div>

      <!-- المحتوى الرئيسي -->
      <div class="contact-content">
        <!-- معلومات الاتصال (الجانب الأيمن) -->
        <div class="contact-info" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
          <div class="info-card">
            <h2 class="info-title">معلومات الاتصال</h2>
            <div class="info-items">
              <div class="info-item" v-for="(item, index) in contactInfo" :key="index">
                <div class="item-icon">{{ item.icon }}</div>
                <div class="item-details">
                  <h4>{{ item.label }}</h4>
                  <p>{{ item.value }}</p>
                </div>
              </div>
            </div>

            <!-- وسائل التواصل الاجتماعي -->
            <div class="social-section">
              <h3 class="social-title">تابعنا على</h3>
              <div class="social-icons">
                <a href="https://www.facebook.com/arubaharabia" target="_blank" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/arubaharabia" target="_blank" class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M7.75 2h8.5C19.097 2 21 3.903 21 6.25v11.5C21 20.097 19.097 22 16.25 22h-8.5C4.903 22 3 20.097 3 17.75V6.25C3 3.903 4.903 2 7.75 2zm0 1.5C5.955 3.5 4.5 4.955 4.5 6.75v10.5c0 1.795 1.455 3.25 3.25 3.25h8.5c1.795 0 3.25-1.455 3.25-3.25V6.75c0-1.795-1.455-3.25-3.25-3.25h-8.5zm4.25 3.25a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- خريطة مبسطة (يمكن استبدالها بصورة خريطة) -->
            <div class="map-preview">
              <img src="/map-preview.png" alt="موقعنا" />
            </div>
          </div>
        </div>

        <!-- نموذج الاتصال (الجانب الأيسر) -->
        <div class="contact-form" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="300">
          <div class="form-card">
            <h2 class="form-title">أرسل لنا رسالة</h2>
            <form @submit.prevent="sendMessage">
              <div class="form-group" v-for="(field, index) in formFields" :key="field.name">
                <label :for="field.name">{{ field.label }}</label>
                <input 
                  v-if="field.type !== 'textarea'"
                  :type="field.type" 
                  :id="field.name"
                  v-model="formData[field.name]" 
                  :placeholder="field.placeholder" 
                  :required="field.required"
                />
                <textarea 
                  v-else
                  :id="field.name"
                  v-model="formData[field.name]" 
                  :rows="field.rows" 
                  :placeholder="field.placeholder" 
                  :required="field.required"
                ></textarea>
              </div>

              <button type="submit" :disabled="loading" class="submit-btn">
                <span v-if="!loading">إرسال الرسالة</span>
                <span v-else class="loading-spinner"></span>
              </button>

              <transition name="slide-fade">
                <div v-if="statusMsg" :class="['status-message', isError ? 'error' : 'success']">
                  <span class="status-icon">{{ isError ? '⚠️' : '✅' }}</span>
                  <p>{{ statusMsg }}</p>
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>

      <!-- قسم إضافي: أسئلة شائعة أو شريط ثقة -->
      <div class="trust-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <div class="trust-item">
          <span class="trust-icon">⚡</span>
          <div>
            <h4>رد سريع</h4>
            <p>نحن نرد على جميع الاستفسارات خلال 24 ساعة</p>
          </div>
        </div>
        <div class="trust-item">
          <span class="trust-icon">🔒</span>
          <div>
            <h4>خصوصية تامة</h4>
            <p>معلوماتك آمنة ومشفرة</p>
          </div>
        </div>
        <div class="trust-item">
          <span class="trust-icon">🤝</span>
          <div>
            <h4>دعم مستمر</h4>
            <p>فريقنا جاهز لمساعدتك دائماً</p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const userStore = useUserStore()

// مراقبة حالة المستخدم
watch(() => userStore.loading, (loading) => {
  if (!loading && !userStore.isLoggedIn) {
    router.push('/login')
  }
})

onMounted(() => {
  if (!userStore.loading && !userStore.isLoggedIn) {
    router.push('/login')
  }
  if (userStore.isLoggedIn) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
    })
  }
})

const API_BASE = 'http://localhost/arooba/public/api'

// بيانات نموذج الاتصال
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const statusMsg = ref('')
const isError = ref(false)

// حقول النموذج
const formFields = ref([
  { name: 'name', type: 'text', label: 'الاسم الكامل', placeholder: 'أدخل اسمك', required: true },
  { name: 'email', type: 'email', label: 'البريد الإلكتروني', placeholder: 'example@domain.com', required: true },
  { name: 'subject', type: 'text', label: 'عنوان الرسالة', placeholder: 'مثلاً: استفسار عن رواية', required: true },
  { name: 'message', type: 'textarea', label: 'الرسالة', placeholder: 'اكتب تفاصيل رسالتك هنا...', rows: 5, required: true }
])

// معلومات الاتصال
const contactInfo = ref([
  { icon: '📧', label: 'البريد الإلكتروني', value: 'arubaharabia@gmail.com' },
  { icon: '📍', label: 'المقر', value: ' الجيزة, مصر' },
  { icon: '📱', label: 'الهاتف', value: '+20 111 708 1077' },
  { icon: '⏰', label: 'ساعات العمل', value: ' من الاحد إلى الخميس , 12م-9م  ' }
])

// دالة إرسال الرسالة
const sendMessage = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
    statusMsg.value = 'جميع الحقول مطلوبة'
    isError.value = true
    setTimeout(() => { statusMsg.value = '' }, 5000)
    return
  }

  loading.value = true
  statusMsg.value = ''
  
  try {
    const response = await $fetch(`${API_BASE}/contact.php`, {
      method: 'POST',
      body: formData.value,
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.success) {
      statusMsg.value = 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.'
      isError.value = false
      formData.value = { name: '', email: '', subject: '', message: '' }
    } else {
      throw new Error(response.message || 'فشل الإرسال')
    }
  } catch (err) {
    console.error(err)
    statusMsg.value = err.message || 'حدث خطأ أثناء الإرسال. الرجاء المحاولة لاحقاً.'
    isError.value = true
  } finally {
    loading.value = false
    setTimeout(() => {
      statusMsg.value = ''
    }, 5000)
  }
}
</script>
<style scoped>
/* نفس الأنماط السابقة تمامًا، لم تتغير */
.contact-page {
  min-height: 100vh;
  background-color: #050814;
  color: white;
  direction: rtl;
  position: relative;
  overflow-x: hidden;
}

/* خلفية متحركة */
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3), rgba(255,215,0,0.1));
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle at 70% 70%, rgba(255,215,0,0.2), rgba(255,165,0,0.1));
  bottom: -150px;
  left: -150px;
  animation-delay: -5s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at 50% 50%, rgba(255,215,0,0.25), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 8s infinite;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,215,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, 50px) scale(1.1); }
  50% { transform: translate(0, 100px) scale(1); }
  75% { transform: translate(-50px, 50px) scale(0.9); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  z-index: 2;
}

/* ترويسة الصفحة */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-family: 'Amiri', serif;
}

.title-word {
  display: inline-block;
  margin: 0 5px;
  color: white;
}

.title-word.gold {
  background: linear-gradient(135deg, gold, #ffd700, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 4rem;
}

.page-subtitle {
  color: #aaa;
  font-size: 1.3rem;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.8;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.decoration-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  animation: lineWidth 3s infinite;
}

@keyframes lineWidth {
  0%, 100% { width: 80px; opacity: 0.5; }
  50% { width: 120px; opacity: 1; }
}

.decoration-star {
  color: gold;
  font-size: 1.5rem;
  animation: spinStar 4s linear infinite;
}

@keyframes spinStar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* المحتوى الرئيسي */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

/* بطاقة معلومات الاتصال */
.contact-info {
  position: relative;
}

.info-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  padding: 40px;
  height: 100%;
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,215,0,0.3);
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.info-title {
  color: gold;
  font-size: 2rem;
  margin-bottom: 30px;
  font-family: 'Amiri', serif;
  text-align: center;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.item-icon {
  font-size: 2rem;
  background: rgba(255,215,0,0.1);
  padding: 12px;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.info-item:hover .item-icon {
  transform: scale(1.1);
  background: rgba(255,215,0,0.2);
}

.item-details h4 {
  color: gold;
  margin: 0 0 5px 0;
  font-size: 1.1rem;
}

.item-details p {
  color: #ccc;
  margin: 0;
  line-height: 1.6;
}

/* وسائل التواصل الاجتماعي */
.social-section {
  margin-bottom: 30px;
  text-align: center;
}

.social-title {
  color: #aaa;
  font-size: 1rem;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icon svg {
  width: 24px;
  height: 24px;
  fill: gold;
  transition: transform 0.3s ease;
}

.social-icon:hover {
  background: gold;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

.social-icon:hover svg {
  fill: #050814;
  transform: scale(1.1);
}

/* صورة الخريطة (يمكن استبدالها بصورة فعلية) */
.map-preview {
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255,215,0,0.2);
  transition: all 0.3s ease;
}

.map-preview:hover {
  border-color: gold;
  transform: scale(1.02);
}

.map-preview img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

/* بطاقة النموذج */
.contact-form {
  position: relative;
}

.form-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 30px;
  padding: 40px;
  height: 100%;
  transition: transform 0.3s ease;
}

.form-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,215,0,0.3);
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.form-title {
  color: gold;
  font-size: 2rem;
  margin-bottom: 30px;
  font-family: 'Amiri', serif;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #aaa;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: gold;
  box-shadow: 0 0 15px rgba(255,215,0,0.2);
  background: rgba(255,255,255,0.08);
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(45deg, gold, #ffd700);
  color: #050814;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.submit-btn:hover:not(:disabled)::before {
  width: 300px;
  height: 300px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255,215,0,0.4);
}

.submit-btn:disabled {
  background: #555;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #050814;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-message {
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideUp 0.5s ease;
}

.status-message.success {
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid #2ecc71;
  color: #2ecc71;
}

.status-message.error {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  color: #e74c3c;
}

.status-icon {
  font-size: 1.5rem;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* قسم الثقة */
.trust-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
}

.trust-item {
  background: rgba(255,255,255,0.02);
  padding: 30px 20px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.trust-item:hover {
  transform: translateY(-5px);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.trust-icon {
  font-size: 2.5rem;
  background: rgba(255,215,0,0.1);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.trust-item:hover .trust-icon {
  background: gold;
  color: #050814;
}

.trust-item h4 {
  color: gold;
  font-size: 1.3rem;
  margin: 0;
}

.trust-item p {
  color: #aaa;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* استجابة */
@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .trust-section {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 60px 15px 30px;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .title-word.gold {
    font-size: 3rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .info-card, .form-card {
    padding: 25px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .title-word.gold {
    font-size: 2.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .item-details {
    text-align: center;
  }
}

/* تأثيرات AOS مخصصة */
[data-aos="fade-left"] {
  transform: translateX(-30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-left"].aos-animate {
  transform: translateX(0);
  opacity: 1;
}

[data-aos="fade-right"] {
  transform: translateX(30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-right"].aos-animate {
  transform: translateX(0);
  opacity: 1;
}

[data-aos="fade-up"] {
  transform: translateY(30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-up"].aos-animate {
  transform: translateY(0);
  opacity: 1;
}

[data-aos="fade-down"] {
  transform: translateY(-30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-down"].aos-animate {
  transform: translateY(0);
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>