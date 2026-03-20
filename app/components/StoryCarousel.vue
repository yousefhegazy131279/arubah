<template>
  <section class="story-section">
    <!-- خلفية متحركة (مثل الهيرو) -->
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="container">
      <!-- عنوان القسم -->
      <div class="section-header" 
           data-aos="fade-up" 
           data-aos-duration="1000">
        <span class="section-badge" data-aos="fade-down" data-aos-delay="200">اعمالنا</span>
        <h2 class="section-title">
          <span class="title-word" data-aos="fade-left" data-aos-delay="300">استمتع بالقصص العالمية</span>
          <span class="title-word gold" data-aos="fade-up" data-aos-delay="400">بلغة الضاد</span>
        </h2>
        <div class="title-decoration" data-aos="zoom-in" data-aos-delay="600">
          <span class="decoration-line"></span>
          <span class="decoration-star">✨</span>
          <span class="decoration-line"></span>
        </div>
      </div>

      <!-- حالة التحميل -->
      <div v-if="pending" class="loading-state" data-aos="fade-up">
        <div class="loader"></div>
        <p>جاري تحميل القصة المميزة...</p>
      </div>

      <!-- رسالة خطأ -->
      <div v-else-if="error" class="error-state" data-aos="fade-up">
        <span class="error-icon">😞</span>
        <p>عذراً، حدث خطأ في تحميل القصة.</p>
      </div>

      <!-- بطاقة القصة (من قاعدة البيانات) -->
      <div v-else class="story-card" 
           data-aos="fade-up" 
           data-aos-duration="1200" 
           data-aos-delay="200">
        <div class="card-wrapper" @click="goToStory">
          <!-- صورة الرواية -->
          <div class="image-container">
            <div class="image-overlay"></div>
            <img :src="baseURL + story.cover" :alt="story.title" />
            <div class="image-glow"></div>
            
            <!-- شارة مميزة (يمكن جعلها ديناميكية حسب التصنيف) -->
            <div class="story-badge" data-aos="zoom-in" data-aos-delay="800">
              <span class="badge-icon">🌟</span>
              <span class="badge-text">{{ story.category || 'الأكثر قراءة' }}</span>
            </div>
          </div>
          
          <!-- محتوى البطاقة -->
          <div class="card-content">
            <h3 class="story-title">{{ story.title }}</h3>
            
            <p class="story-description">{{ story.description }}</p>
            
            <!-- إحصائيات سريعة -->
            <div class="story-stats">
              <div class="stat">
                <span class="stat-icon">📖</span>
                <span class="stat-value">{{ story.chapters_count || 0 }} فصل</span>
              </div>
              <div class="stat">
                <span class="stat-icon">⭐</span>
                <span class="stat-value">{{ story.avg_rating ? story.avg_rating.toFixed(1) : '0' }} ({{ story.total_ratings || 0 }} تقييم)</span>
              </div>
            </div>
            
            <button class="read-button">
              <span>اقرأ القصة</span>
              <span class="button-icon">←</span>
            </button>
          </div>
        </div>
      </div>

      <!-- قسم "لماذا هذه القصة؟" (ثابت) -->
      <div class="why-section" 
           data-aos="fade-up" 
           data-aos-duration="1000" 
           data-aos-delay="400">
        <div class="why-grid">
          <div class="why-card" 
               v-for="(item, index) in whyItems" 
               :key="index"
               :data-aos="index % 2 === 0 ? 'fade-left' : 'fade-right'"
               :data-aos-delay="500 + (index * 100)">
            <div class="why-icon">{{ item.icon }}</div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const baseURL = '/covers/' // مسار صور الأغلفة

// بيانات القصة من API
const story = ref(null)
const pending = ref(true)
const error = ref(false)

// جلب الرواية المميزة (مثلاً الرواية الأولى أو رواية محددة id=1)
const fetchStory = async () => {
  pending.value = true
  error.value = false
  try {
    // يمكن تغيير الرابط حسب ما هو مراد: مثلاً نعرض رواية ذات id=1 أو رواية عشوائية
    const response = await fetch('http://localhost/arooba/public/api/get-novel.php?id=1')
    const data = await response.json()
    if (data && data.id) {
      story.value = data
      // إضافة خصائص إضافية إن لم تكن موجودة
      story.value.chapters_count = data.chapters_count || 0
      story.value.avg_rating = data.avg_rating ? parseFloat(data.avg_rating) : 0
      story.value.total_ratings = data.ratings_count || 0 // ✅ استخدام ratings_count من API
    } else {
      error.value = true
    }
  } catch (e) {
    console.error('خطأ في جلب القصة:', e)
    error.value = true
  } finally {
    pending.value = false
  }
}

// عناصر قسم "لماذا" (ثابتة)
const whyItems = [
  {
    icon: '🌟',
    title: 'قصص خالدة',
    description: 'روايات صعب أن تنسى'
  },
  {
    icon: '🎭',
    title: 'تعريب كما قال الكتاب',
    description: 'نحاول أن يكون التعريب على أعلى مستوى ليحظى القارئ بأفضل تجربة ممكنة'
  },
  {
    icon: '💫',
    title: 'نستمع للجمهور',
    description: 'رأيك هو أكثر ما يهمنا لذا لا تكن خجولاً واقترح ما تشاء!'
  }
]

const goToStory = () => {
  if (story.value) {
    router.push(`/stories/${story.value.id}`)
  }
}

onMounted(() => {
  fetchStory()
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom',
  })

  window.addEventListener('resize', () => {
    AOS.refresh()
  })
})
</script>

<style scoped>
/* نفس الأنماط السابقة مع إضافة أنماط لحالات التحميل والخطأ */

.loading-state, .error-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(0,0,0,0.3);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  margin: 40px 0;
  color: #888;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255,215,0,0.1);
  border-top-color: gold;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
  opacity: 0.7;
}

/* باقي الأنماط كما هي من الكود الأصلي - لم يتم تغيير شيء */
.hero-background {
  position: absolute;
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

.story-section {
  position: relative;
  padding: 100px 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  direction: rtl;
}

.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  width: 100%;
}

/* ===== ترويسة القسم ===== */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(255,215,0,0.1);
  color: gold;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-bottom: 20px;
  border: 1px solid rgba(255,215,0,0.3);
  backdrop-filter: blur(10px);
  animation: glowPulse 2s infinite;
}

@keyframes glowPulse {
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

/* ===== بطاقة القصة ===== */
.story-card {
  max-width: 1000px;
  margin: 0 auto 60px;
}

.card-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,215,0,0.03) 100%);
  border-radius: 30px;
  padding: 30px;
  border: 1px solid rgba(255,215,0,0.2);
  transition: all 0.5s ease;
  cursor: pointer;
}

.card-wrapper:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: gold;
  box-shadow: 0 30px 60px rgba(255,215,0,0.2);
}

/* صورة الرواية */
.image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 2/3;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-wrapper:hover img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.image-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,215,0,0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 2;
}

.card-wrapper:hover .image-glow {
  opacity: 1;
  animation: rotateGlow 10s linear infinite;
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* شارة القصة */
.story-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, gold, #ffd700);
  color: #050814;
  padding: 8px 15px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 3;
  font-weight: bold;
  box-shadow: 0 5px 15px rgba(255,215,0,0.4);
  animation: badgeFloat 3s infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.badge-icon {
  font-size: 1.2rem;
}

/* محتوى البطاقة */
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

.story-title {
  font-size: 3rem;
  color: gold;
  margin-bottom: 20px;
  font-family: 'Amiri', serif;
  position: relative;
  display: inline-block;
}

.story-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 0;
  width: 80px;
  height: 3px;
  background: gold;
  border-radius: 3px;
  animation: titleLine 3s infinite;
}

@keyframes titleLine {
  0%, 100% { width: 80px; }
  50% { width: 150px; }
}

.story-description {
  color: #ccc;
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.2rem;
}

/* إحصائيات القصة */
.story-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

.stat-value {
  color: white;
  font-size: 1.1rem;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* زر القراءة */
.read-button {
  background: linear-gradient(45deg, gold, #ffd700);
  color: #050814;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  position: relative;
  overflow: hidden;
}

.read-button::before {
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

.read-button:hover::before {
  width: 300px;
  height: 300px;
}

.read-button:hover {
  transform: translateX(-10px);
  box-shadow: 0 10px 30px rgba(255,215,0,0.4);
}

.button-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.read-button:hover .button-icon {
  transform: translateX(-5px);
}

/* ===== قسم "لماذا هذه القصة؟" ===== */
.why-section {
  margin-top: 80px;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.why-card {
  background: rgba(255,255,255,0.02);
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.why-card:hover {
  transform: translateY(-10px);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.why-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

.why-card h4 {
  color: gold;
  font-size: 1.5rem;
  margin-bottom: 15px;
  font-family: 'Amiri', serif;
}

.why-card p {
  color: #aaa;
  line-height: 1.8;
}

/* ===== استجابة ===== */
@media (max-width: 992px) {
  .card-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .image-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .story-title {
    font-size: 2.5rem;
  }
  
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2.2rem;
  }
  
  .story-title {
    font-size: 2rem;
  }
  
  .story-description {
    font-size: 1rem;
  }
  
  .story-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .why-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .card-wrapper {
    padding: 20px;
  }
  
  .story-title {
    font-size: 1.8rem;
  }
}

/* تأثيرات AOS */
[data-aos="fade-up"] {
  transform: translate3d(0, 40px, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-up"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

[data-aos="fade-down"] {
  transform: translate3d(0, -40px, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-down"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

[data-aos="fade-right"] {
  transform: translate3d(40px, 0, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-right"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

[data-aos="fade-left"] {
  transform: translate3d(-40px, 0, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-left"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

[data-aos="zoom-in"] {
  transform: scale(0.6);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="zoom-in"].aos-animate {
  transform: scale(1);
  opacity: 1;
}
</style>