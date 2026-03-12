<template>
    <div class="carousel-container">
      <h2 class="carousel-title">حيث كل القصص العالمية بلغة الضاد</h2>
      
      <div class="carousel-viewport" dir="ltr">
        <div 
          class="carousel-track" 
          :style="trackStyle"
          @transitionend="handleTransitionEnd"
        >
          <div
            v-for="(story, idx) in allStories"
            :key="story.key + '-' + idx"
            class="carousel-item"
            :style="{ minWidth: (100 / visibleItems) + '%' }"
            @click="goToStory(story.id)"
          >
            <div class="card-wrapper">
              <img :src="story.image" :alt="story.title" />
              <p class="story-title">{{ story.title }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="carousel-buttons">
        <button class="nav-btn" @click="nextSlide">&#10094;</button> 
        <button class="nav-btn" @click="prevSlide">&#10095;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // حدد id لكل قصة عشان الروتر يعرف أي صفحة يفتح
  const stories = [
    { id: 1, title: 'العائلة', image: '/stories/story1.png' },
    { id: 2, title: 'أشباح بغداد', image: '/stories/story2.png' },
    { id: 3, title: 'من أجلهم', image: '/stories/story3.png' },
    { id: 4, title: 'ظلان لرجل واحد', image: '/stories/story4.png' }
  ]
  
  const visibleItems = ref(3)
  const currentIndex = ref(stories.length)
  const isTransitioning = ref(false)
  let timer = null
  
  // دمج clones + original عشان الانفينيتي كاروسيل
  const allStories = computed(() => {
    const prev = stories.map(s => ({ ...s, key: 'clone-prev' }))
    const next = stories.map(s => ({ ...s, key: 'clone-next' }))
    const original = stories.map(s => ({ ...s, key: 'original' }))
    return [...prev, ...original, ...next]
  })
  
  const trackStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * (100 / visibleItems.value)}%)`,
    transition: isTransitioning.value ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
  }))
  
  const nextSlide = () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    currentIndex.value++
  }
  
  const prevSlide = () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    currentIndex.value--
  }
  
  const handleTransitionEnd = () => {
    isTransitioning.value = false
    if (currentIndex.value >= stories.length * 2) currentIndex.value = stories.length
    if (currentIndex.value <= stories.length - visibleItems.value - 1) 
      currentIndex.value = stories.length * 2 - visibleItems.value - 1
  }
  
  const updateWidth = () => {
    const width = window.innerWidth
    if (width <= 768) visibleItems.value = 1
    else if (width <= 1200) visibleItems.value = 2
    else visibleItems.value = 3
  }
  
  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    timer = setInterval(nextSlide, 5000)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
    clearInterval(timer)
  })
  
  // هنا نوجّه للصفحة الصحيحة حسب id
  const goToStory = (id) => router.push(`/stories/${story.id}`)
  </script>
  
  <style scoped>
  .carousel-container { 
    margin: 4rem auto; 
    max-width: 1200px; 
    text-align: center; 
    padding: 0 20px;
    direction: rtl; /* اتجاه النصوص عربي */
  }
  
  .carousel-title { 
    font-size: 2.2rem; 
    color: gold; 
    margin-bottom: 2rem; 
    font-family: 'Amiri', serif; 
  }
  
  .carousel-viewport { 
    overflow: hidden; 
    border-radius: 20px; 
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 215, 0, 0.1);
  }
  
  .carousel-track { 
    display: flex; 
    will-change: transform;
  }
  
  .carousel-item { 
    box-sizing: border-box; 
    padding: 2rem; 
    cursor: pointer; 
    flex-shrink: 0; 
  }
  
  .card-wrapper { 
    background: rgba(255, 255, 255, 0.03); 
    padding: 1.5rem; 
    border-radius: 15px; 
    transition: all 0.4s ease;
    border: 1px solid transparent;
  }
  
  .card-wrapper:hover { 
    transform: translateY(-10px); 
    background: rgba(255, 215, 0, 0.05);
    border-color: gold;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  }
  
  .carousel-item img { 
    width: 100%; 
    height: 280px; 
    object-fit: contain; 
    border-radius: 10px;
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.5));
  }
  
  .story-title { 
    margin-top: 1.5rem; 
    font-size: 1.4rem; 
    color: white; 
    font-weight: bold;
  }
  
  .carousel-buttons { 
    margin-top: 2.5rem; 
    display: flex; 
    justify-content: center; 
    gap: 2rem; 
  }
  
  .nav-btn { 
    background: gold; 
    border: none; 
    width: 55px; 
    height: 55px; 
    cursor: pointer; 
    border-radius: 50%; 
    font-size: 1.4rem;
    color: #050814;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
  
  .nav-btn:hover { 
    background: white; 
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
  }
  
  /* تحسينات الموبايل */
  @media (max-width: 768px) {
    .carousel-item { padding: 1rem; }
    .carousel-item img { height: 200px; }
    .carousel-title { font-size: 1.8rem; }
  }
  </style>