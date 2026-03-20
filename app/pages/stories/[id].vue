<template>
  <div class="story-page">
    <!-- خلفية متحركة -->
    <div class="animated-bg">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-overlay"></div>
      <div class="floating-particles">
        <span v-for="i in 20" :key="i" class="particle" :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          width: Math.random() * 6 + 2 + 'px',
          height: Math.random() * 6 + 2 + 'px'
        }"></span>
      </div>
    </div>

    <Navbar />

    <div class="container" v-if="novel">
      <!-- رأس الصفحة مع صورة الرواية وتفاصيلها (محسنة) -->
      <div class="novel-header" data-aos="fade-up" data-aos-duration="1200">
        <div class="novel-cover-wrapper" data-aos="fade-left" data-aos-delay="200">
          <div class="novel-cover">
            <img :src="baseURL + novel.cover" :alt="novel.title" />
            <div class="cover-glow"></div>
          </div>
          <div class="cover-badge" v-if="novel.isNew" data-aos="zoom-in" data-aos-delay="400">
            <span class="badge-icon">✨</span>
            <span class="badge-text">جديد</span>
          </div>
        </div>
        <div class="novel-info" data-aos="fade-right" data-aos-delay="200">
          <div class="info-header">
            <h1 class="novel-title">{{ novel.title }}</h1>
            <div class="title-decoration">
              <span></span><span></span><span></span>
            </div>
          </div>
          
          <div class="novel-meta">
            <span class="meta-item">
              <span class="meta-icon">✍️</span>
              {{ novel.author || 'غير محدد' }}
            </span>
            <span class="meta-item">
              <span class="meta-icon">🏷️</span>
              {{ novel.category }}
            </span>
          </div>
          
          <p class="novel-description">{{ novel.description }}</p>
          
          <div class="novel-stats">
            <div class="stat-card" data-aos="zoom-in" data-aos-delay="300">
              <span class="stat-value">{{ novel.chapters_count }}</span>
              <span class="stat-label">فصل</span>
            </div>
            <div class="stat-card" data-aos="zoom-in" data-aos-delay="400">
              <div class="rating-display">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= novel.avg_rating }">★</span>
              </div>
              <span class="stat-label">{{ novel.total_ratings }} تقييم</span>
            </div>
          </div>

          <!-- تقييم الرواية (نجوم قابلة للتقييم) -->
          <div class="rate-section" data-aos="fade-up" data-aos-delay="500">
            <span class="rate-label">قيم هذه الرواية:</span>
            <div class="stars-wrapper">
              <span 
                v-for="i in 5" :key="i" 
                class="star interactive large" 
                :class="{ filled: i <= userNovelRating }"
                @click="submitNovelRating(i)"
                @mouseenter="hoverNovel = i" 
                @mouseleave="hoverNovel = null"
              >★</span>
            </div>
          </div>
        </div>
      </div>

      <!-- قائمة الفصول مع تقييمات الفصول (محسنة) -->
      <div class="chapters-section">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">
            <span class="title-icon">📖</span>
            فصول الرواية
          </h2>
          <div class="section-decoration">
            <span class="line"></span>
            <span class="star">✨</span>
            <span class="line"></span>
          </div>
        </div>
        
        <div v-if="loadingChapters" class="loading-state" data-aos="fade-up">
          <div class="loader"></div>
          <p>جاري تحميل الفصول...</p>
        </div>

        <div v-else-if="chapters.length === 0" class="empty-chapters" data-aos="fade-up">
          <span class="empty-icon">📭</span>
          <p>لا توجد فصول مضافة بعد.</p>
        </div>

        <div v-else class="chapters-list">
          <div 
            v-for="(chapter, index) in chapters" 
            :key="chapter.id" 
            class="chapter-card"
            :class="{ expanded: expandedChapter === chapter.id }"
          >
            <div class="chapter-header" @click="toggleChapter(chapter.id)">
              <div class="chapter-number">
                <span class="num">{{ chapter.chapter_number }}</span>
                <span class="text">الفصل</span>
              </div>
              <div class="chapter-title">{{ chapter.title || 'بدون عنوان' }}</div>
              
              <!-- عرض متوسط تقييم الفصل (نجوم للقراءة فقط) -->
              <div class="chapter-rating">
                <span v-for="i in 5" :key="i" class="star small" :class="{ filled: i <= chapter.avg_rating }">★</span>
                <span class="rating-count">({{ chapter.total_ratings }})</span>
              </div>

              <div class="chapter-actions">
                <a 
                  v-if="chapter.word_file" 
                  :href="downloadUrl(chapter.word_file)" 
                  class="action-btn download"
                  @click.stop
                  title="تحميل الملف"
                >
                  <span>📥</span>
                </a>
                <a 
                  v-if="chapter.word_file" 
                  :href="viewUrl(chapter.word_file)" 
                  target="_blank"
                  class="action-btn read"
                  @click.stop
                  :title="viewMessage(chapter.word_file)"
                >
                  <span>📖</span>
                </a>
              </div>
              <button class="expand-btn">{{ expandedChapter === chapter.id ? '▲' : '▼' }}</button>
            </div>

            <!-- محتوى الفصل الممتد (عند النقر) -->
            <div v-if="expandedChapter === chapter.id" class="chapter-content">
              <!-- تقييم الفصل (نجوم قابلة للتقييم) -->
              <div class="rate-section">
                <span class="rate-label">قيم هذا الفصل:</span>
                <div class="stars-wrapper">
                  <span 
                    v-for="i in 5" :key="i" 
                    class="star interactive" 
                    :class="{ filled: i <= (chapterRatings[chapter.id] || 0) }"
                    @click="submitChapterRating(chapter.id, i)"
                    @mouseenter="hoverChapter = i" 
                    @mouseleave="hoverChapter = null"
                  >★</span>
                </div>
              </div>

              <!-- عرض محتوى الفصل (إذا كان مخزناً نصياً) -->
              <div v-if="chapter.content" class="chapter-text">
                {{ chapter.content }}
              </div>

              <!-- عرض PDF مباشرة إذا كان الملف PDF -->
              <div v-if="chapter.word_file && isPdf(chapter.word_file)" class="pdf-viewer">
                <iframe 
                  :src="baseFileURL + chapter.word_file" 
                  width="100%" 
                  height="500px"
                  frameborder="0"
                ></iframe>
              </div>

              <!-- أزرار إضافية في الجزء الممتد -->
              <div v-if="chapter.word_file" class="chapter-download">
                <a :href="downloadUrl(chapter.word_file)" class="btn-download">
                  <span>📥</span> تحميل الملف
                </a>
                <a :href="viewUrl(chapter.word_file)" target="_blank" class="btn-download read">
                  <span>📖</span> عرض في المتصفح
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- قسم إضافي: اقتراح قصة -->
      <div class="suggestion-section" data-aos="fade-up" data-aos-duration="1000">
        <div class="suggestion-card">
          <div class="suggestion-icon">💡</div>
          <h3>هل لديك قصة تود قراءتها؟</h3>
          <p>اقترح علينا قصة لتعريبها وستجدها قريباً في مكتبتنا</p>
          <button class="suggestion-btn" @click="$router.push('/contact')">
            <span>اقترح الآن</span>
            <span class="btn-icon">←</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="pending" class="loading-state full-page">
      <div class="loader"></div>
      <p>جاري تحميل تفاصيل الرواية...</p>
    </div>

    <div v-else-if="error" class="error-state full-page">
      <span class="error-icon">😞</span>
      <p>عذراً، حدث خطأ في تحميل الرواية.</p>
      <button @click="fetchNovel" class="retry-btn">إعادة المحاولة</button>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AOS from 'aos'
import 'aos/dist/aos.css'

// مكونات التقييم (افترض أنها موجودة)
import StarRatingReadOnly from '@/components/StarRatingReadOnly.vue'
import StarRatingInteractive from '@/components/StarRatingInteractive.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const novelId = route.params.id

const baseURL = '/covers/'
const baseFileURL = 'http://localhost/arooba/public'
const API_URL = 'http://localhost/arooba/public/api'

const pending = ref(true)
const error = ref(false)
const novel = ref(null)
const chapters = ref([])
const loadingChapters = ref(false)

const expandedChapter = ref(null)
const userNovelRating = ref(0)
const chapterRatings = ref({})
const hoverNovel = ref(null)
const hoverChapter = ref(null)

// مراقبة حالة المستخدم
watch(() => userStore.loading, (loading) => {
  if (!loading && !userStore.isLoggedIn) {
    router.push('/login')
  }
})

onMounted(() => {
  if (!userStore.loading && !userStore.isLoggedIn) {
    router.push('/login')
    return
  }
  if (userStore.isLoggedIn) {
    fetchNovel()
    fetchChapters()
    import('aos').then(AOS => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 50,
        delay: 0
      })
    })
  }
})

// جلب الرواية
const fetchNovel = async () => {
  console.log('1. بدء fetchNovel')
  pending.value = true
  error.value = false
  try {
    console.log('2. جلب البيانات من API')
    const data = await $fetch(`${API_URL}/get-novel.php?id=${novelId}`)
    console.log('3. البيانات المستقبلة:', data)
    if (data && data.id) {
      novel.value = {
        ...data,
        isNew: data.created_at ? new Date(data.created_at) > new Date(Date.now() - 7*24*60*60*1000) : false,
        avg_rating: data.avg_rating ? parseFloat(data.avg_rating) : 0,
        total_ratings: data.ratings_count || 0
      }
      console.log('4. تم تعيين novel.value، الآن جلب التقييمات')
      // نستدعي fetchUserRatings ولكن لا ننتظرها إذا فشلت (نستخدم then/catch)
      await fetchUserRatings().catch(err => {
        console.error('خطأ في fetchUserRatings:', err)
        // لا نعيد الخطأ، فقط نسجله
      })
      console.log('5. تم جلب التقييمات (أو فشلت)')
    } else {
      console.log('4. البيانات غير صالحة')
      error.value = true
    }
  } catch (e) {
    console.error('خطأ في جلب الرواية:', e)
    error.value = true
  } finally {
    console.log('6. finally: تعيين pending=false')
    pending.value = false
  }
}

// جلب تقييمات المستخدم
// جلب تقييمات المستخدم مع معالجة الأخطاء
const fetchUserRatings = async () => {
  try {
    const response = await fetch(`${API_URL}/get-user-ratings.php?novel_id=${novelId}`, {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('fetchUserRatings data:', data);
    if (data.success) {
      userNovelRating.value = data.novel_rating || 0;
      chapterRatings.value = data.chapter_ratings || {};
    } else {
      console.warn('فشل جلب تقييمات المستخدم:', data.message);
    }
  } catch (e) {
    console.error('خطأ في جلب تقييمات المستخدم:', e);
  }
};

// جلب الفصول
const fetchChapters = async () => {
  loadingChapters.value = true
  try {
    const url = `${API_URL}/get-chapters.php?novel_id=${novelId}`
    console.log('Fetching chapters from:', url)
    const data = await $fetch(url)
    console.log('Chapters data received:', data)
    chapters.value = (Array.isArray(data) ? data : []).map(ch => ({
  ...ch,
  avg_rating: ch.avg_rating ? parseFloat(ch.avg_rating) : 0,
  total_ratings: ch.ratings_count || 0   // <-- التعديل هنا
}))
  } catch (e) {
    console.error('خطأ في جلب الفصول:', e)
  } finally {
    loadingChapters.value = false
  }
}

// إرسال تقييم الرواية
// إرسال تقييم الرواية
const submitNovelRating = async (rating) => {
  try {
    const response = await fetch(`${API_URL}/add-rating.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ novel_id: novel.value.id, rating }),
      credentials: 'include' // هذا السطر هو الحل
    })
    const data = await response.json()
    if (data.success) {
      userNovelRating.value = rating
      const updated = await $fetch(`${API_URL}/get-novel.php?id=${novelId}`)
      novel.value.avg_rating = updated.avg_rating ? parseFloat(updated.avg_rating) : 0
      novel.value.total_ratings = updated.ratings_count || 0
      alert('تم تقييم الرواية بنجاح')
    } else {
      alert('فشل التقييم: ' + data.message)
    }
  } catch (e) {
    console.error('خطأ في الاتصال:', e)
    alert('خطأ في الاتصال بالخادم: ' + e.message)
  }
}

// إرسال تقييم الفصل
const submitChapterRating = async (chapterId, rating) => {
  try {
    const response = await fetch(`${API_URL}/add-rating.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        novel_id: novel.value.id, 
        chapter_id: chapterId, 
        rating 
      }),
      credentials: 'include' // هذا السطر ضروري
    })
    const data = await response.json()
    if (data.success) {
      chapterRatings.value[chapterId] = rating
      await fetchChapters()
      alert('تم تقييم الفصل بنجاح')
    } else {
      alert('فشل التقييم: ' + data.message)
    }
  } catch (e) {
    console.error('خطأ في الاتصال:', e)
    alert('خطأ في الاتصال بالخادم: ' + e.message)
  }
}

// دوال مساعدة للملفات
const getFileType = (filePath) => {
  if (!filePath) return 'unknown';
  const ext = filePath.split('.').pop().toLowerCase();
  return ext;
};
const isPdf = (filePath) => getFileType(filePath) === 'pdf';
const viewMessage = (filePath) => {
  const ext = getFileType(filePath);
  if (ext === 'pdf') return 'سيتم عرض الملف في المتصفح (PDF)';
  if (ext === 'doc' || ext === 'docx') return 'سيتم عرض الملف عبر Google Docs (قد لا يعمل محلياً)';
  return 'فتح الملف في نافذة جديدة';
};
const downloadUrl = (filePath) => `${baseFileURL}/api/download.php?file=${encodeURIComponent(filePath)}&download=1`
const viewUrl = (filePath) => {
  const full = baseFileURL + filePath
  return isPdf(filePath) ? full : `https://docs.google.com/viewer?url=${encodeURIComponent(full)}`
}

// توسيع/طي فصل
const toggleChapter = (id) => {
  expandedChapter.value = expandedChapter.value === id ? null : id
}
</script>



<style scoped>
/* الأنماط كما هي - لم يتم تغييرها */
/* ===== الخلفية المتحركة ===== */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
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

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(255,215,0,0.3);
  border-radius: 50%;
  animation: particleFloat 10s infinite ease-in-out;
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

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

/* ===== تنسيقات الصفحة ===== */
.story-page {
  min-height: 100vh;
  background: #050814;
  color: white;
  direction: rtl;
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

/* ===== رأس الرواية ===== */
.novel-header {
  display: flex;
  gap: 50px;
  margin-bottom: 80px;
  background: rgba(10, 15, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  padding: 40px;
  border: 1px solid rgba(255,215,0,0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  transition: transform 0.3s;
}

.novel-header:hover {
  border-color: gold;
  box-shadow: 0 30px 60px rgba(255,215,0,0.15);
}

.novel-cover-wrapper {
  position: relative;
  flex: 0 0 300px;
}

.novel-cover {
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  border: 3px solid rgba(255,215,0,0.3);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
  transition: all 0.3s;
}

.novel-cover img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s;
}

.novel-cover:hover img {
  transform: scale(1.05);
}

.cover-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,215,0,0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.novel-cover:hover .cover-glow {
  opacity: 1;
  animation: rotateGlow 10s linear infinite;
}

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.cover-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  color: #050814;
  padding: 8px 15px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  box-shadow: 0 5px 20px rgba(255,215,0,0.5);
  z-index: 10;
  animation: badgeFloat 3s infinite;
}

@keyframes badgeFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.novel-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-header {
  margin-bottom: 20px;
}

.novel-title {
  color: gold;
  font-family: 'Amiri', serif;
  font-size: 3.5rem;
  margin-bottom: 5px;
  line-height: 1.2;
  text-shadow: 0 0 20px rgba(255,215,0,0.3);
}

.title-decoration {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.title-decoration span {
  height: 3px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  border-radius: 3px;
}

.title-decoration span:nth-child(1) { width: 50px; animation: linePulse 2s infinite; }
.title-decoration span:nth-child(2) { width: 100px; animation: linePulse 2s infinite 0.5s; }
.title-decoration span:nth-child(3) { width: 50px; animation: linePulse 2s infinite 1s; }

@keyframes linePulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.novel-meta {
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #aaa;
  font-size: 1.1rem;
}

.meta-icon {
  font-size: 1.3rem;
}

.novel-description {
  line-height: 1.8;
  color: #ddd;
  margin-bottom: 30px;
  font-size: 1.1rem;
  border-right: 3px solid gold;
  padding-right: 20px;
}

.novel-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.stat-card {
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: 20px;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: gold;
  box-shadow: 0 10px 20px rgba(255,215,0,0.2);
}

.stat-value {
  font-size: 2.2rem;
  color: gold;
  font-weight: bold;
}

.stat-label {
  font-size: 0.95rem;
  color: #aaa;
}

.rating-display {
  display: flex;
  gap: 2px;
  margin-bottom: 5px;
}

/* ===== تقييم الرواية/الفصل ===== */
.rate-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 15px 20px;
  background: rgba(0,0,0,0.3);
  border-radius: 50px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,215,0,0.2);
}

.rate-label {
  color: gold;
  font-weight: bold;
  font-size: 1.1rem;
}

.stars-wrapper {
  display: flex;
  gap: 5px;
}

/* ===== قائمة الفصول ===== */
.chapters-section {
  margin-top: 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  color: gold;
  font-family: 'Amiri', serif;
  font-size: 2.8rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.title-icon {
  font-size: 2.5rem;
  animation: bounce 2s infinite;
}

.section-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.section-decoration .line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
}

.section-decoration .star {
  color: gold;
  font-size: 1.5rem;
  animation: spinStar 4s linear infinite;
}

@keyframes spinStar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chapter-card {
  background: rgba(20, 25, 40, 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
}

.chapter-card:hover {
  border-color: gold;
  background: rgba(30, 35, 50, 0.8);
  transform: translateX(-5px);
}

.chapter-card.expanded {
  border-color: gold;
  box-shadow: 0 10px 30px rgba(255,215,0,0.2);
}

.chapter-header {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  gap: 15px;
}

.chapter-number {
  background: linear-gradient(135deg, gold, #ffd700);
  color: #050814;
  padding: 5px 15px;
  border-radius: 40px;
  font-weight: bold;
  min-width: 90px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  box-shadow: 0 5px 15px rgba(255,215,0,0.3);
}

.chapter-number .num {
  font-size: 1.2rem;
}

.chapter-number .text {
  font-size: 0.85rem;
  opacity: 0.9;
}

.chapter-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 500;
}

.chapter-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.rating-count {
  color: #888;
  font-size: 0.9rem;
}

.chapter-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid;
}

.action-btn.download {
  background: rgba(255,215,0,0.1);
  border-color: gold;
  color: gold;
}

.action-btn.download:hover {
  background: gold;
  color: #050814;
  transform: translateY(-3px);
}

.action-btn.read {
  background: rgba(52, 152, 219, 0.1);
  border-color: #3498db;
  color: #3498db;
}

.action-btn.read:hover {
  background: #3498db;
  color: white;
  transform: translateY(-3px);
}

.expand-btn {
  background: none;
  border: none;
  color: gold;
  font-size: 1.2rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.expand-btn:hover {
  transform: scale(1.2);
}

.chapter-content {
  padding: 30px;
  border-top: 2px solid rgba(255,215,0,0.2);
  background: rgba(0,0,0,0.3);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.chapter-text {
  line-height: 1.8;
  color: #ddd;
  margin: 20px 0;
  padding: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 15px;
  border: 1px solid rgba(255,215,0,0.1);
}

.pdf-viewer {
  margin: 20px 0;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255,215,0,0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.chapter-download {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  border-radius: 40px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  border: 1px solid;
  background: rgba(255,215,0,0.1);
  border-color: gold;
  color: gold;
}

.btn-download.read {
  background: rgba(52, 152, 219, 0.1);
  border-color: #3498db;
  color: #3498db;
}

.btn-download:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

.btn-download.read:hover {
  background: #3498db;
  color: white;
}

/* ===== قسم الاقتراحات ===== */
.suggestion-section {
  margin: 80px 0;
}

.suggestion-card {
  background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,165,0,0.05));
  border: 1px solid gold;
  border-radius: 40px;
  padding: 50px 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.2);
  animation: glowPulse 3s infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 20px 40px rgba(255,215,0,0.2); }
  50% { box-shadow: 0 30px 60px rgba(255,215,0,0.4); }
}

.suggestion-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
}

.suggestion-card h3 {
  color: gold;
  font-size: 2rem;
  margin-bottom: 15px;
  font-family: 'Amiri', serif;
}

.suggestion-card p {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.suggestion-btn {
  background: gold;
  color: #050814;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.suggestion-btn:hover {
  transform: translateX(-10px);
  box-shadow: 0 10px 30px rgba(255,215,0,0.4);
}

.btn-icon {
  font-size: 1.3rem;
  transition: transform 0.3s;
}

.suggestion-btn:hover .btn-icon {
  transform: translateX(-5px);
}

/* ===== النجوم ===== */
.star {
  color: #555;
  font-size: 24px;
  transition: all 0.2s;
}

.star.filled {
  color: gold;
  text-shadow: 0 0 10px gold;
}

.star.small {
  font-size: 16px;
}

.star.large {
  font-size: 30px;
}

.star.interactive {
  cursor: pointer;
}

.star.interactive:hover,
.star.interactive:hover ~ .star {
  color: gold;
  transform: scale(1.2);
}

/* ===== حالات التحميل والخطأ ===== */
.loading-state.full-page,
.error-state.full-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  padding: 40px;
}

.loader {
  width: 70px;
  height: 70px;
  border: 5px solid rgba(255,215,0,0.1);
  border-top-color: gold;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 30px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.retry-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: gold;
  color: #050814;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.retry-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

.empty-chapters {
  text-align: center;
  padding: 80px;
  background: rgba(255,255,255,0.02);
  border-radius: 30px;
  border: 1px dashed gold;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
  opacity: 0.5;
}

/* ===== استجابة ===== */
@media (max-width: 992px) {
  .novel-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .novel-cover-wrapper {
    width: 100%;
    max-width: 350px;
  }

  .novel-meta {
    justify-content: center;
  }

  .novel-description {
    border-right: none;
    border-bottom: 3px solid gold;
    padding-right: 0;
    padding-bottom: 20px;
  }

  .novel-stats {
    justify-content: center;
  }

  .rate-section {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .novel-title {
    font-size: 2.8rem;
  }

  .chapter-header {
    flex-wrap: wrap;
    padding: 15px;
  }

  .chapter-number {
    order: 1;
  }

  .chapter-title {
    order: 2;
    width: 100%;
    margin-top: 10px;
  }

  .chapter-rating {
    order: 3;
  }

  .chapter-actions {
    order: 4;
    width: 100%;
    justify-content: center;
  }

  .expand-btn {
    order: 5;
  }

  .chapter-download {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-download {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .novel-title {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .suggestion-card h3 {
    font-size: 1.5rem;
  }

  .suggestion-btn {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>