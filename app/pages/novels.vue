<template>
  <div class="novels-page">
    <!-- خلفية متحركة -->
    <div class="animated-bg">
      <div class="bubble"></div>
      <div class="bubble"></div>
      <div class="bubble"></div>
    </div>

    <Navbar />

    <!-- الهيدر -->
    <header class="page-header" data-aos="fade-down" data-aos-duration="1000">
      <div class="container">
        <h1 class="golden-text">
          <span class="title-icon">📚</span>
          مكتبة عُروبة
        </h1>
        <p class="subtitle">استكشف روائع الأدب العالمي بلسانٍ عربي مبين</p>
        <div class="header-decoration">
          <span></span><span></span><span></span>
        </div>
      </div>
    </header>

    <main class="container">
      <!-- شريط التحكم المتقدم -->
      <div class="control-bar" data-aos="fade-up" data-aos-delay="200">
        <!-- البحث (مصغر) -->
        <div class="search-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ابحث عن رواية..." 
            class="search-input" 
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">✕</button>
        </div>

        <!-- عرض النتائج والترتيب -->
        <div class="results-info">
          <span class="results-count">{{ filteredNovels.length }} نتيجة</span>
          <div class="sort-wrapper">
            <select v-model="sortBy" class="sort-select">
              <option value="newest">الأحدث</option>
              <option value="oldest">الأقدم</option>
              <option value="title">العنوان</option>
            </select>
          </div>
          <button class="view-toggle" @click="viewMode = viewMode === 'grid' ? 'list' : 'grid'">
            <span v-if="viewMode === 'grid'">📋 قائمة</span>
            <span v-else>📱 شبكة</span>
          </button>
        </div>

        <!-- تصنيفات سريعة (قابلة للتمرير) -->
        <div class="categories-scroll">
          <button 
            v-for="cat in categories" 
            :key="cat.name" 
            class="category-chip"
            :class="{ active: selectedCategory === cat.name }"
            @click="selectedCategory = cat.name === selectedCategory ? null : cat.name"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- حالة التحميل -->
      <div v-if="pending" class="loading-state" data-aos="fade-up">
        <div class="loader"></div>
        <p>جاري تحميل الكنوز الأدبية...</p>
        <div class="skeleton-grid">
          <div v-for="n in 6" :key="n" class="skeleton-card"></div>
        </div>
      </div>

      <!-- رسالة خطأ -->
      <div v-else-if="error" class="error-state" data-aos="fade-up">
        <span class="error-icon">😞</span>
        <p>عذراً، حدث خطأ في تحميل الروايات. حاول لاحقاً.</p>
      </div>

      <!-- شبكة/قائمة الروايات -->
      <div v-else :class="['novels-container', viewMode === 'grid' ? 'grid-view' : 'list-view']">
        <transition-group name="stagger" tag="div" class="novels-grid" :class="{ 'list-view': viewMode === 'list' }">
          <div 
            v-for="(novel, index) in sortedNovels" 
            :key="novel.id" 
            class="novel-card-wrapper"
            :data-aos="viewMode === 'grid' ? 'fade-up' : 'fade-right'"
            :data-aos-delay="viewMode === 'grid' ? 50 * (index % 8) : 50 * index"
          >
            <div class="novel-card" @click="goToStory(novel.id)">
              <div class="card-image">
                <img 
                  :src="baseURL + novel.cover" 
                  :alt="novel.title" 
                  loading="lazy"
                  @load="handleImageLoad"
                />
                <div class="image-overlay">
                  <span class="read-now">اقرأ الآن</span>
                </div>
                <div class="card-badge" v-if="novel.category">{{ novel.category }}</div>
                <div class="card-badge left" v-if="novel.isNew">✨ جديد</div>
              </div>
              <div class="card-info">
                <h3>{{ novel.title }}</h3>
                <p class="author">{{ novel.author || 'غير محدد' }}</p>
                <div class="card-footer">
                  <span class="pages">{{ novel.chapters_count || 0 }} فصل</span>
                  <div class="rating">
                    <span class="stars">
                      <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= novel.avg_rating }">★</span>
                    </span>
                    <span class="rating-value">({{ novel.total_ratings || 0 }})</span>
                  </div>
                </div>
              </div>
              <div class="card-glow"></div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- لا توجد نتائج -->
      <div v-if="!pending && filteredNovels.length === 0" class="no-results" data-aos="fade-up">
        <span class="no-results-icon">🔍</span>
        <p>عذراً، لا توجد رواية بهذا الاسم حالياً.</p>
        <button @click="resetSearch" class="reset-btn">مسح البحث</button>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref(null)
const sortBy = ref('newest')
const viewMode = ref('grid') // 'grid' or 'list'
const baseURL = '/covers/'

// تصنيفات مع أيقونات
const categories = [
  { name: 'كلاسيكيات', icon: '🏛️' },
  { name: 'مغامرات', icon: '⚔️' },
  { name: 'خيال علمي', icon: '🚀' },
  { name: 'دراما', icon: '🎭' },
  { name: 'تاريخية', icon: '⏳' },
  { name: 'رومانسية', icon: '❤️' },
  { name: 'غموض', icon: '🔍' }
]

// جلب الروايات من API
const { data: novelsData, pending, error } = useFetch('http://localhost/arooba/public/api/get-novels.php', {
  transform: (data) => Array.isArray(data) ? data : []
})

// إضافة خصائص افتراضية للبيانات
const novels = computed(() => {
  return (novelsData.value || []).map(novel => ({
    ...novel,
    isNew: novel.created_at ? new Date(novel.created_at) > new Date(Date.now() - 7*24*60*60*1000) : false,
    chapters_count: novel.chapters_count || 0,
    description: novel.description || 'رواية مميزة تأخذك في رحلة عبر الزمن والمكان...',
    avg_rating: novel.avg_rating ? parseFloat(novel.avg_rating) : 0,
    total_ratings: novel.ratings_count || 0 // ✅ استخدام ratings_count من API
  }))
})

// فلترة حسب البحث والتصنيف
const filteredNovels = computed(() => {
  let filtered = novels.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(query) ||
      (n.author && n.author.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(n => 
      n.category && n.category.includes(selectedCategory.value)
    )
  }

  return filtered
})

// ترتيب النتائج
const sortedNovels = computed(() => {
  const filtered = filteredNovels.value
  switch (sortBy.value) {
    case 'newest':
      return [...filtered].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    case 'oldest':
      return [...filtered].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    case 'title':
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title, 'ar'))
    default:
      return filtered
  }
})

// إعادة تعيين البحث
const resetSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  sortBy.value = 'newest'
}

// الذهاب لصفحة الرواية
const goToStory = (id) => {
  router.push(`/stories/${id}`)
}

const handleImageLoad = (e) => {
  e.target.classList.add('loaded')
}

// تهيئة AOS
onMounted(() => {
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
})
</script>

<style scoped>
/* الأنماط الحالية + تعديل حجم مربع البحث */

.novels-page {
  min-height: 100vh;
  background: #050814;
  color: white;
  direction: rtl;
  position: relative;
  overflow-x: hidden;
}

/* خلفية متحركة */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.1), transparent 70%);
  animation: float 20s infinite ease-in-out;
}

.bubble:nth-child(1) {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
  animation-duration: 25s;
}

.bubble:nth-child(2) {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
  animation-duration: 30s;
  animation-delay: -5s;
}

.bubble:nth-child(3) {
  width: 200px;
  height: 200px;
  top: 30%;
  left: 10%;
  animation-duration: 22s;
  animation-delay: -2s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -30px) rotate(5deg); }
  50% { transform: translate(-20px, 20px) rotate(-5deg); }
  75% { transform: translate(20px, 30px) rotate(3deg); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

/* الهيدر */
.page-header {
  padding: 60px 0 30px;
  text-align: center;
  position: relative;
}

.golden-text {
  color: gold;
  font-family: 'Amiri', serif;
  font-size: 4rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-shadow: 0 0 20px rgba(255,215,0,0.3);
}

.title-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 15px gold);
}

.subtitle {
  color: rgba(255,255,255,0.7);
  font-size: 1.3rem;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.header-decoration span {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  border-radius: 3px;
  animation: pulseWidth 3s infinite;
}

.header-decoration span:nth-child(2) {
  animation-delay: 0.5s;
  width: 100px;
}

.header-decoration span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes pulseWidth {
  0%, 100% { opacity: 0.3; width: 60px; }
  50% { opacity: 1; width: 120px; }
}

/* control bar */
.control-bar {
  margin-bottom: 40px;
  background: rgba(10, 15, 30, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 20px;
  border: 1px solid rgba(255,215,0,0.1);
}

/* مربع البحث - مصغر */
.search-wrapper {
  position: relative;
  margin: 0 auto 15px auto;
  max-width: 500px;
  width: 100%;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: gold;
  z-index: 3;
}

.search-input {
  width: 100%;
  padding: 12px 45px 12px 45px; /* تصغير padding الرأسي قليلاً */
  border-radius: 50px;
  border: 2px solid rgba(255,215,0,0.2);
  background: rgba(0,0,0,0.3);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: gold;
  box-shadow: 0 0 30px rgba(255,215,0,0.2);
}

.clear-search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
}

.clear-search:hover {
  color: gold;
}

.results-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.results-count {
  color: gold;
  font-weight: bold;
  font-size: 1.1rem;
  background: rgba(255,215,0,0.1);
  padding: 5px 15px;
  border-radius: 20px;
}

.sort-select {
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,215,0,0.3);
  color: white;
  padding: 8px 15px;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
}

.sort-select option {
  background: #050814;
}

.view-toggle {
  background: rgba(255,215,0,0.1);
  border: 1px solid gold;
  color: gold;
  padding: 8px 15px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.9rem;
}

.view-toggle:hover {
  background: gold;
  color: #050814;
}

.categories-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 5px;
  scrollbar-width: thin;
  scrollbar-color: gold #050814;
  justify-content: center; /* توسيط التصنيفات */
}

.categories-scroll::-webkit-scrollbar {
  height: 5px;
}

.categories-scroll::-webkit-scrollbar-track {
  background: rgba(255,215,0,0.1);
  border-radius: 10px;
}

.categories-scroll::-webkit-scrollbar-thumb {
  background: gold;
  border-radius: 10px;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 40px;
  border: 1px solid rgba(255,215,0,0.3);
  background: rgba(0,0,0,0.3);
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-size: 0.95rem;
  backdrop-filter: blur(5px);
}

.category-chip:hover {
  border-color: gold;
  color: gold;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255,215,0,0.2);
}

.category-chip.active {
  background: gold;
  color: #050814;
  border-color: gold;
  font-weight: bold;
}

.cat-icon {
  font-size: 1.1rem;
}

/* شبكة الروايات */
.novels-container {
  margin-bottom: 80px;
}

.novels-grid {
  display: grid;
  gap: 30px;
}

.grid-view .novels-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.list-view .novels-grid {
  grid-template-columns: 1fr;
}

.novel-card-wrapper {
  transition: all 0.3s;
}

/* بطاقة الرواية */
.novel-card {
  background: rgba(20, 25, 40, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(255,215,0,0.1);
  position: relative;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-view .novel-card {
  flex-direction: row;
  height: auto;
  max-height: 250px;
}

.list-view .card-image {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
}

.list-view .card-info {
  flex: 1;
  text-align: right;
}

.list-view .card-footer {
  justify-content: flex-start;
}

.novel-card:hover {
  transform: translateY(-15px) scale(1.02);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.2), 0 0 0 2px rgba(255,215,0,0.1) inset;
}

.list-view .novel-card:hover {
  transform: translateY(-5px) scale(1.01);
}

.card-image {
  position: relative;
  height: 350px;
  overflow: hidden;
}

.list-view .card-image {
  height: 250px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  opacity: 0;
}

.card-image img.loaded {
  opacity: 1;
}

.novel-card:hover .card-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 0%, rgba(5,8,20,0.9) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.novel-card:hover .image-overlay {
  opacity: 1;
}

.read-now {
  color: gold;
  border: 2px solid gold;
  padding: 12px 30px;
  border-radius: 40px;
  font-weight: bold;
  font-size: 1.1rem;
  background: rgba(5,8,20,0.7);
  backdrop-filter: blur(5px);
  transform: translateY(20px);
  transition: transform 0.3s ease;
  margin-bottom: 15px;
}

.card-actions {
  display: flex;
  gap: 10px;
  transform: translateY(20px);
  transition: transform 0.3s ease 0.1s;
}

.novel-card:hover .read-now,
.novel-card:hover .card-actions {
  transform: translateY(0);
}

.action-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid gold;
  background: rgba(5,8,20,0.7);
  backdrop-filter: blur(5px);
  color: gold;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.action-btn:hover {
  background: gold;
  color: #050814;
  transform: scale(1.1);
}

.card-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: gold;
  color: #050814;
  padding: 5px 15px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(255,215,0,0.3);
}

.card-badge.left {
  left: 15px;
  right: auto;
  background: #e74c3c;
  color: white;
}

.card-info {
  padding: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.card-info h3 {
  color: gold;
  font-size: 1.5rem;
  margin-bottom: 5px;
  font-family: 'Amiri', serif;
}

.author {
  color: #aaa;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.card-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
  align-items: center;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stars {
  display: inline-flex;
  gap: 2px;
  color: #555;
}

.star {
  color: #555;
  font-size: 1rem;
}

.star.filled {
  color: gold;
}

.rating-value {
  color: #fff;
}

.pages {
  color: #888;
}

.card-glow {
  position: absolute;
  bottom: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255,215,0,0.15), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.novel-card:hover .card-glow {
  opacity: 1;
}

/* Skeleton loading */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.skeleton-card {
  height: 450px;
  background: rgba(255,255,255,0.05);
  border-radius: 25px;
  position: relative;
  overflow: hidden;
}

.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,215,0,0.1), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* حالات التحميل والخطأ */
.loading-state, .error-state, .no-results {
  text-align: center;
  padding: 100px 20px;
  color: #888;
  background: rgba(0,0,0,0.2);
  border-radius: 30px;
  backdrop-filter: blur(5px);
  margin: 40px 0;
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

.error-icon, .no-results-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 20px;
  opacity: 0.7;
}

.reset-btn {
  margin-top: 20px;
  padding: 10px 30px;
  background: gold;
  color: #050814;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.reset-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255,215,0,0.3);
}

/* انتقالات AOS */
.stagger-enter-active,
.stagger-leave-active {
  transition: all 0.4s ease;
}

.stagger-enter-from,
.stagger-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.stagger-leave-active {
  position: absolute;
}

/* استجابة */
@media (max-width: 768px) {
  .golden-text {
    font-size: 2.8rem;
  }
  
  .grid-view .novels-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .card-image {
    height: 250px;
  }
  
  .list-view .card-image {
    width: 150px;
    height: 200px;
  }
  
  .card-info h3 {
    font-size: 1.2rem;
  }
  
  .control-bar {
    padding: 15px;
  }
  
  .results-info {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .golden-text {
    font-size: 2.2rem;
    flex-direction: column;
    gap: 5px;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .search-input {
    padding: 12px 40px 12px 40px;
    font-size: 0.95rem;
  }
  
  .list-view .novel-card {
    flex-direction: column;
    max-height: none;
  }
  
  .list-view .card-image {
    width: 100%;
    height: 200px;
  }
}
</style>