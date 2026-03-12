<template>
    <div class="hero-container">
      <h1 ref="heroText" :style="{ fontFamily: currentFont }">
        ! أهلاً بك في موقع <span class="golden">عُروبة</span>
      </h1>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const fonts = ["Cairo", "Amiri", "Scheherazade"]
  const currentFont = ref(fonts[0])
  const heroText = ref(null)
  
  onMounted(() => {
    heroText.value.style.opacity = 0
    heroText.value.style.transform = 'translateY(50px)'
    setTimeout(() => {
      heroText.value.style.transition = 'all 1s ease'
      heroText.value.style.opacity = 1
      heroText.value.style.transform = 'translateY(0)'
    }, 100)
  
    let i = 0
    setInterval(() => {
      i = (i + 1) % fonts.length
      currentFont.value = fonts[i]
    }, 1300)
  })
  </script>
  
  <style scoped>
  .hero-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    text-align: center;
    padding: 0 1rem;
  }
  
  h1 {
    font-size: 3rem;
    color: white;
    transition: all 0.5s ease;
  }
  
  .golden { color: gold; }
  
  /* Responsive */
  @media (max-width: 768px) { h1 { font-size: 2rem; } }
  @media (max-width: 480px) { h1 { font-size: 1.5rem; } }
  </style>