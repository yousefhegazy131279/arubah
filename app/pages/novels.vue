<template>
    <div class="novels-page">
      <Navbar />
  
      <!-- Header -->
      <header class="page-header">
        <div class="container">
          <h1 class="golden-text">مكتبة عُروبة</h1>
          <p>استكشف روائع الأدب العالمي المترجمة بلسانٍ عربي مبين</p>
        </div>
      </header>
  
      <!-- Search -->
      <main class="container">
        <div class="filter-bar">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="ابحث عن رواية..." 
            class="search-input" 
          />
        </div>
  
        <!-- Novels Grid -->
        <div class="novels-grid">
          <div 
            v-for="novel in filteredNovels" 
            :key="novel.id" 
            class="novel-card" 
            @click="goToStory(novel.id)"
          >
            <div class="card-image">
                <img :src="baseURL + novel.cover" :alt="novel.title" />
              <div class="overlay">
                <span>اقرأ الآن</span>
              </div>
            </div>
            <div class="card-info">
              <h3>{{ novel.title }}</h3>
              <p class="genre">{{ novel.genre || 'عام' }}</p>
            </div>
          </div>
        </div>
  
        <!-- No results -->
        <div v-if="filteredNovels.length === 0" class="no-results">
          <p>عذراً، لا توجد رواية بهذا الاسم حالياً.</p>
        </div>
      </main>
  
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const searchQuery = ref('')
  const baseURL = '/covers/'


  // --- جلب الروايات من الـ API ---
  const { data: novelsData, error } = await useFetch('http://localhost/arubah_api/get-novels.php')
  
  // --- تحويل البيانات إلى array مضمون ---
  const novels = ref([])
  watchEffect(() => {
    if (novelsData.value) {
      novels.value = Array.isArray(novelsData.value) ? novelsData.value : []
    }
  })
  
  // --- البحث ---
  const filteredNovels = computed(() => {
  return novels.value.filter(n =>
    n.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
  
  // --- الذهاب لصفحة الرواية ---
  const goToStory = (id) => {
    router.push(`/stories/${id}`)
  }
  </script>
  
  <style scoped>
  .novels-page { min-height: 100vh; background: #050814; color: white; direction: rtl; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
  
  /* Header */
  .page-header { padding: 60px 0; text-align: center; background: linear-gradient(to bottom, rgba(255,215,0,0.05), transparent); }
  .golden-text { color: gold; font-family: 'Amiri', serif; font-size: 3.5rem; margin-bottom: 10px; }
  
  /* Search */
  .filter-bar { margin-bottom: 40px; text-align: center; }
  .search-input { 
    width: 100%; max-width: 500px; padding: 12px 25px; border-radius: 30px; 
    border: 1px solid rgba(255,215,0,0.3); background: rgba(255,255,255,0.05); 
    color: white; outline: none; transition: 0.3s;
  }
  .search-input:focus { border-color: gold; box-shadow: 0 0 15px rgba(255,215,0,0.2); }
  
  /* Grid */
  .novels-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    gap: 30px; 
    margin-bottom: 80px;
  }
  
  /* Card */
  .novel-card { 
    background: rgba(255,255,255,0.02); border-radius: 15px; overflow: hidden; 
    cursor: pointer; transition: transform 0.3s ease; border: 1px solid rgba(255,255,255,0.05);
  }
  .novel-card:hover { transform: translateY(-10px); border-color: gold; }
  
  .card-image { position: relative; height: 350px; overflow: hidden; }
  .card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .novel-card:hover img { transform: scale(1.1); }
  
  .overlay { 
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(5, 8, 20, 0.7); display: flex; align-items: center; 
    justify-content: center; opacity: 0; transition: 0.3s; 
  }
  .novel-card:hover .overlay { opacity: 1; }
  .overlay span { color: gold; border: 2px solid gold; padding: 10px 20px; border-radius: 20px; font-weight: bold; }
  
  .card-info { padding: 20px; text-align: center; }
  .card-info h3 { color: gold; font-size: 1.4rem; margin-bottom: 5px; }
  .genre { color: #888; font-size: 0.9rem; }
  
  .no-results { text-align: center; padding: 100px; color: #666; }
  
  @media (max-width: 768px) {
    .novels-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 15px; }
    .card-image { height: 240px; }
    .golden-text { font-size: 2.5rem; }
  }
  </style>