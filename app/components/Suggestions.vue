<template>
  <section class="suggestions-section">
    <!-- خلفية متحركة -->
    <div class="section-background">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>
      <div class="grid-overlay"></div>
      <div class="floating-shapes">
        <span class="shape shape-1">📚</span>
        <span class="shape shape-2">✨</span>
        <span class="shape shape-3">💭</span>
        <span class="shape shape-4">📖</span>
      </div>
    </div>

    <div class="container">
      <!-- ترويسة القسم -->
      <div class="section-header" 
           data-aos="fade-down" 
           data-aos-duration="1000">
        <span class="section-badge" data-aos="zoom-in" data-aos-delay="200">
          <span class="badge-icon">💡</span>
          شاركنا برأيك
        </span>
        
        <h2 class="section-title">
          <span class="title-word" data-aos="fade-left" data-aos-delay="300">هل لديك</span>
          <span class="title-word gold" data-aos="fade-up" data-aos-delay="400">قصة</span>
          <span class="title-word" data-aos="fade-right" data-aos-delay="500">تود تعريبها؟</span>
        </h2>
        
        <p class="subtitle" data-aos="fade-up" data-aos-delay="600">
          شاركونا اقتراحاتكم لننشر سحر لغة الضاد في قصصكم المفضلة
        </p>

        <div class="title-decoration" data-aos="zoom-in" data-aos-delay="700">
          <span class="decoration-line"></span>
          <span class="decoration-star">✨</span>
          <span class="decoration-line"></span>
        </div>
      </div>

      <div class="flex-layout">
        <!-- الفورم -->
        <div class="form-wrapper" 
             data-aos="fade-left" 
             data-aos-duration="1200" 
             data-aos-delay="200">
          <form class="suggestion-form" @submit.prevent="submitSuggestion">
            <div class="form-header">
              <div class="form-icon-wrapper" data-aos="flip-right" data-aos-delay="300">
                <span class="form-icon">✍️</span>
              </div>
              <h3 data-aos="fade-right" data-aos-delay="400">أضف اقتراحك</h3>
            </div>
            
            <div class="input-group" 
                 v-for="(field, index) in formFields" 
                 :key="field.name"
                 :data-aos="index === 0 ? 'fade-up' : 'fade-up'"
                 :data-aos-delay="500 + (index * 100)">
              <div class="input-wrapper">
                <input 
                  v-if="field.type !== 'textarea'"
                  v-model="form[field.name]" 
                  :type="field.type" 
                  :required="field.required"
                  :placeholder="field.placeholder"
                  class="floating-input"
                  :class="{ 'has-value': form[field.name] }"
                />
                <textarea 
                  v-else
                  v-model="form[field.name]" 
                  :rows="field.rows"
                  :placeholder="field.placeholder"
                  class="floating-input"
                  :class="{ 'has-value': form[field.name] }"
                ></textarea>
                <span class="input-icon">{{ field.icon }}</span>
                <div class="input-border"></div>
              </div>
            </div>

            <transition name="shake">
              <div v-if="errorMessage" class="error-message" data-aos="zoom-in">
                <span class="error-icon">⚠️</span>
                {{ errorMessage }}
              </div>
            </transition>

            <button type="submit" 
                    :disabled="isSubmitting" 
                    class="submit-btn"
                    :data-aos="!isSubmitting ? 'zoom-in' : ''"
                    data-aos-delay="900">
              <span class="btn-content">
                <span v-if="!isSubmitting">
                  إرسال الاقتراح
                  <span class="btn-icon"></span>
                </span>
                <span v-else class="loading-container">
                  <span class="loader-small"></span>
                  جاري الإرسال...
                </span>
              </span>
              <span class="btn-glow"></span>
            </button>

            <transition name="slide-up">
              <div v-if="showSuccess" class="success-message">
                <div class="success-icon">✅</div>
                <div class="success-content">
                  <h4>تم الإرسال بنجاح!</h4>
                  <p>شكراً لمشاركتنا اقتراحك</p>
                </div>
              </div>
            </transition>
          </form>
        </div>

        <!-- جدار الاقتراحات -->
        <div class="comments-wrapper" 
             data-aos="fade-right" 
             data-aos-duration="1200" 
             data-aos-delay="300">
          <div class="comments-wall">
            <div class="wall-header">
              <div class="header-left">
                <span class="wall-icon"></span>
                <h3 class="wall-title">آخر الاقتراحات</h3>
              </div>
              <div class="suggestions-count" :data-aos="suggestions.length > 0 ? 'pulse' : ''">
                <span class="count-number">{{ suggestions.length }}</span>
                <span class="count-label">اقتراح</span>
              </div>
            </div>
            
            <!-- شاشة التحميل -->
            <div v-if="loading" class="loading-wall">
              <div class="loader"></div>
              <p>جاري تحميل الاقتراحات...</p>
              <div class="loading-progress">
                <div class="progress-bar"></div>
              </div>
            </div>
            
            <!-- قائمة الاقتراحات -->
            <div v-else class="comments-list" ref="commentsContainer">
              <transition-group name="list" tag="div" class="list-wrapper">
                <div v-if="suggestions.length === 0" 
                     class="empty-state"
                     key="empty">
                  <div class="empty-animation">
                    <span class="empty-icon"></span>
                    <div class="empty-circles">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                  <h4>لا توجد اقتراحات بعد</h4>
                  <p>كن أول من يقترح قصة لتعريبها!</p>
                </div>

                <div v-for="(item, index) in suggestions" 
                     :key="item.id" 
                     class="comment-card"
                     :data-aos="index % 2 === 0 ? 'flip-right' : 'flip-left'"
                     :data-aos-delay="200 + (index * 50)">
                  <div class="card-glow"></div>
                  
                  <div class="card-header">
                    <div class="user-avatar" :style="{ backgroundColor: getAvatarColor(item.name) }">
                      {{ item.name?.charAt(0) || '?' }}
                      <div class="avatar-glow"></div>
                    </div>
                    <div class="user-info">
                      <span class="user-name">{{ item.name }}</span>
                      <span class="comment-date">
                        <span class="date-icon">⏱️</span>
                        {{ formatDate(item.created_at) }}
                      </span>
                    </div>
                    <div class="card-badge" v-if="index === 0">جديد</div>
                  </div>
                  
                  <div class="comment-content">
                    <div class="story-badge">
                      <span class="badge-icon"></span>
                      <span class="badge-text">رواية مقترحة</span>
                    </div>
                    <p class="story-title">
                      <strong>{{ item.storyTitle }}</strong>
                    </p>
                    <p v-if="item.comment" class="comment-text">
                      <span class="quote-icon">"</span>
                      {{ item.comment }}
                      <span class="quote-icon closing">"</span>
                    </p>
                  </div>

                  <div class="card-footer">
                    <div class="reactions">
    
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- عناصر زخرفية سفلية -->
    <div class="bottom-decoration">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const API_URL = 'http://localhost/arooba/public/api'

// حقول الفورم
const formFields = ref([
  { name: 'name', type: 'text', placeholder: 'اسمك', icon: '', required: true },
  { name: 'storyTitle', type: 'text', placeholder: 'اسم الرواية المقترحة', icon: '', required: true },
  { name: 'comment', type: 'textarea', placeholder: 'لماذا تود رؤية هذه القصة بالعربية؟', icon: '', rows: 3 }
])

const form = ref({ name: '', storyTitle: '', comment: '' })
const suggestions = ref([])
const loading = ref(true)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const commentsContainer = ref(null)

// ألوان مختلفة للصور الرمزية
const avatarColors = ref([
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
])

// جلب الاقتراحات
const loadSuggestions = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await fetch(`${API_URL}/get_suggestions.php`, {
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    suggestions.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('خطأ في جلب الاقتراحات:', error)
    errorMessage.value = 'فشل في تحميل الاقتراحات'
    suggestions.value = []
  } finally {
    loading.value = false
  }
}

// إرسال اقتراح
const submitSuggestion = async () => {
  if (!form.value.name || !form.value.storyTitle) {
    errorMessage.value = 'الرجاء إدخال الاسم واسم الرواية'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
    return
  }
  
  isSubmitting.value = true
  errorMessage.value = ''
  
  try {
    const response = await fetch(`${API_URL}/add_suggestion.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
      credentials: 'include'
    })
    const data = await response.json()
    if (data?.success) {
      suggestions.value = [data.data, ...suggestions.value]
      form.value = { name: '', storyTitle: '', comment: '' }
      showSuccess.value = true
      
      if (commentsContainer.value) {
        commentsContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
      }
      
      setTimeout(() => {
        showSuccess.value = false
      }, 4000)
    } else {
      errorMessage.value = data?.message || 'حدث خطأ في الإرسال'
      setTimeout(() => {
        errorMessage.value = ''
      }, 3000)
    }
  } catch (error) {
    console.error('خطأ في الإرسال:', error)
    errorMessage.value = 'فشل الاتصال بالخادم'
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}

// لون عشوائي للصورة الرمزية
const getAvatarColor = (name) => {
  if (!name) return avatarColors.value[0]
  const index = name.charCodeAt(0) % avatarColors.value.length
  return avatarColors.value[index]
}

// تنسيق التاريخ
const formatDate = (d) => {
  if (!d) return ''
  try {
    const date = new Date(d)
    const now = new Date()
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    
    if (diff === 0) return 'اليوم'
    if (diff === 1) return 'أمس'
    if (diff < 7) return `منذ ${diff} أيام`
    
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom',
  })

  loadSuggestions()

  window.addEventListener('resize', () => {
    AOS.refresh()
  })
})
</script>
<style scoped>
.suggestions-section {
  position: relative;
  padding: 100px 20px;
  background: linear-gradient(135deg, #050814 0%, #0a1020 100%);
  color: white;
  direction: rtl;
  overflow: hidden;
}

/* ===== خلفية متحركة ===== */
.section-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
  animation: floatOrb 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3), transparent);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle at 70% 70%, rgba(255,215,0,0.2), transparent);
  bottom: -200px;
  left: -200px;
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
    linear-gradient(rgba(255,215,0,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: floatShape 15s infinite linear;
}

.shape-1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  top: 70%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: -10s;
}

.shape-4 {
  top: 40%;
  right: 30%;
  animation-delay: -7s;
}

@keyframes floatOrb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, 50px) scale(1.2); }
  50% { transform: translate(0, 100px) scale(1); }
  75% { transform: translate(-50px, 50px) scale(0.9); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
}

@keyframes floatShape {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, 30px) rotate(120deg); }
  66% { transform: translate(-30px, 20px) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

.container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  z-index: 1;
}

/* ===== ترويسة القسم ===== */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2));
  color: gold;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  border: 1px solid rgba(255,215,0,0.3);
  backdrop-filter: blur(10px);
  animation: badgeGlow 2s infinite;
}

@keyframes badgeGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.3); }
  50% { box-shadow: 0 0 20px rgba(255,215,0,0.6); }
}

.section-title {
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.4;
}

.title-word {
  display: inline-block;
  margin: 0 5px;
  color: white;
  font-family: 'Amiri', serif;
}

.title-word.gold {
  background: linear-gradient(135deg, gold, #ffd700, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: 3.5rem;
}

.subtitle {
  color: #aaa;
  font-size: 1.2rem;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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

/* ===== التخطيط المرن ===== */
.flex-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* ===== الفورم ===== */
.form-wrapper {
  position: relative;
}

.suggestion-form {
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 40px;
  border: 1px solid rgba(255,215,0,0.1);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

.suggestion-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.form-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

.form-icon-wrapper {
  background: linear-gradient(135deg, gold, #ffd700);
  width: 60px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.form-icon {
  font-size: 2rem;
}

.form-header h3 {
  color: gold;
  font-size: 2rem;
  font-family: 'Amiri', serif;
  margin: 0;
}

/* حقول الإدخال */
.input-group {
  margin-bottom: 25px;
}

.input-wrapper {
  position: relative;
}

.floating-input {
  width: 100%;
  padding: 18px 25px 18px 60px;
  background: rgba(255,255,255,0.02);
  border: 2px solid rgba(255,215,0,0.1);
  border-radius: 20px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.floating-input:focus {
  border-color: gold;
  box-shadow: 0 0 30px rgba(255,215,0,0.2);
  background: rgba(255,255,255,0.05);
}

.floating-input.has-value {
  border-color: rgba(255,215,0,0.5);
}

.input-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  opacity: 0.5;
  transition: all 0.3s ease;
  pointer-events: none;
}

.floating-input:focus + .input-icon,
.floating-input.has-value + .input-icon {
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: gold;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.floating-input:focus ~ .input-border {
  width: 80%;
}

/* زر الإرسال */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 18px;
  background: linear-gradient(45deg, gold, #ffd700);
  color: #050814;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-icon {
  font-size: 1.3rem;
  animation: bounce 2s infinite;
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.4);
}

.submit-btn:hover .btn-glow {
  opacity: 1;
  animation: rotateGlow 3s linear infinite;
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.submit-btn:disabled {
  background: #555;
  cursor: not-allowed;
}

/* ===== جدار الاقتراحات ===== */
.comments-wrapper {
  position: relative;
  height: fit-content;
}

.comments-wall {
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  border: 1px solid rgba(255,215,0,0.1);
  padding: 30px;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.wall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255,215,0,0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wall-icon {
  font-size: 2.5rem;
  animation: bounce 2s infinite;
}

.wall-title {
  color: gold;
  font-size: 1.8rem;
  font-family: 'Amiri', serif;
  margin: 0;
}

.suggestions-count {
  background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2));
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255,215,0,0.3);
}

.count-number {
  font-size: 2rem;
  font-weight: bold;
  color: gold;
  line-height: 1;
}

.count-label {
  color: #aaa;
  font-size: 0.9rem;
}

.comments-list {
  overflow-y: auto;
  flex: 1;
  padding-left: 5px;
  scroll-behavior: smooth;
}

.comments-list::-webkit-scrollbar {
  width: 5px;
}

.comments-list::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.comments-list::-webkit-scrollbar-thumb {
  background: gold;
  border-radius: 10px;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* بطاقة الاقتراح */
.comment-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,215,0,0.02));
  padding: 25px;
  border-radius: 25px;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,215,0,0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.comment-card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.2);
}

.comment-card:hover .card-glow {
  opacity: 1;
  animation: rotateGlow 6s linear infinite;
}

.card-header {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  position: relative;
}

.user-avatar {
  width: 55px;
  height: 55px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #050814;
  position: relative;
  overflow: hidden;
}

.avatar-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.comment-card:hover .avatar-glow {
  opacity: 1;
  animation: rotateGlow 3s linear infinite;
}

.user-info {
  flex: 1;
}

.user-name {
  color: gold;
  font-weight: bold;
  font-size: 1.2rem;
  display: block;
  margin-bottom: 5px;
}

.comment-date {
  font-size: 0.85rem;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
}

.date-icon {
  font-size: 0.9rem;
}

.card-badge {
  position: absolute;
  top: 0;
  left: 0;
  background: gold;
  color: #050814;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  animation: badgePulse 2s infinite;
}

@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.comment-content {
  padding-right: 70px;
}

.story-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,215,0,0.1);
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 10px;
}

.badge-icon {
  font-size: 1rem;
}

.badge-text {
  color: gold;
  font-size: 0.8rem;
}

.story-title {
  margin-bottom: 10px;
}

.story-title strong {
  color: white;
  font-size: 1.2rem;
}

.comment-text {
  color: #bbb;
  line-height: 1.8;
  font-style: italic;
  position: relative;
  margin: 0;
}

.quote-icon {
  color: gold;
  font-size: 1.5rem;
  opacity: 0.5;
  margin-left: 5px;
}

.quote-icon.closing {
  margin-right: 5px;
}

.card-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255,215,0,0.1);
}

.reactions {
  display: flex;
  gap: 10px;
}

.reaction {
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.reaction:hover {
  opacity: 1;
  transform: scale(1.2);
}

/* شاشة التحميل */
.loading-wall {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #888;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255,215,0,0.1);
  border-top-color: gold;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-progress {
  width: 200px;
  height: 4px;
  background: rgba(255,215,0,0.1);
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-bar {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, gold, #ffd700);
  animation: progress 2s infinite;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

/* الحالة الفارغة */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-animation {
  position: relative;
  margin-bottom: 30px;
}

.empty-icon {
  font-size: 6rem;
  animation: float 3s infinite;
}

.empty-circles {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.empty-circles span {
  width: 8px;
  height: 8px;
  background: gold;
  border-radius: 50%;
  opacity: 0.3;
  animation: circlePulse 2s infinite;
}

.empty-circles span:nth-child(2) {
  animation-delay: 0.5s;
}

.empty-circles span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes circlePulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 1; }
}

.empty-state h4 {
  color: gold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.empty-state p {
  color: #666;
}

/* رسائل الخطأ والنجاح */
.error-message {
  margin: 20px 0;
  padding: 15px 20px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  border-radius: 15px;
  color: #e74c3c;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-icon {
  font-size: 1.3rem;
}

.success-message {
  margin-top: 25px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(46, 204, 113, 0.2));
  border: 1px solid #2ecc71;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  animation: slideUp 0.5s ease;
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

.success-icon {
  font-size: 3rem;
  animation: bounce 2s infinite;
}

.success-content h4 {
  color: #2ecc71;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.success-content p {
  color: #aaa;
  font-size: 0.9rem;
  margin: 0;
}

/* عناصر زخرفية سفلية */
.bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(transparent, rgba(255,215,0,0.05));
}

.wave-1 {
  animation: wave 8s linear infinite;
}

.wave-2 {
  animation: wave 6s linear infinite reverse;
  opacity: 0.5;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

/* ===== استجابة ===== */
@media (max-width: 992px) {
  .flex-layout {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .title-word.gold {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .title-word.gold {
    font-size: 2.5rem;
  }
  
  .suggestion-form {
    padding: 30px;
  }
  
  .form-header h3 {
    font-size: 1.5rem;
  }
  
  .wall-title {
    font-size: 1.5rem;
  }
  
  .comment-content {
    padding-right: 0;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
  }
  
  .title-word.gold {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .suggestion-form {
    padding: 20px;
  }
  
  .form-header {
    flex-direction: column;
    text-align: center;
  }
  
  .comments-wall {
    padding: 20px;
  }
  
  .wall-header {
    flex-direction: column;
    gap: 15px;
  }
}

/* ===== تأثيرات AOS المخصصة ===== */
[data-aos="flip-right"] {
  transform: perspective(2500px) rotateY(-100deg);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="flip-right"].aos-animate {
  transform: perspective(2500px) rotateY(0);
  opacity: 1;
}

[data-aos="flip-left"] {
  transform: perspective(2500px) rotateY(100deg);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="flip-left"].aos-animate {
  transform: perspective(2500px) rotateY(0);
  opacity: 1;
}

[data-aos="pulse"] {
  animation: pulse 1s ease;
}

/* ===== تحسينات الأداء ===== */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>