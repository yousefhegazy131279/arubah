<template>
  <div class="page">
    <Navbar />
    <Hero />
    <div class="section-divider">
      <div class="line"></div>
      <div class="diamond"></div>
      <div class="line"></div>
    </div>
    <StoryCarousel />
    <div class="section-divider">
      <div class="line"></div>
      <div class="diamond"></div>
      <div class="line"></div>
    </div>
    <Suggestions />
    <main class="main-content">
      </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue"
import Footer from "~/components/Footer.vue"
import Hero from "~/components/Hero.vue"
import StoryCarousel from "~/components/StoryCarousel.vue"
import Suggestions from "~/components/Suggestions.vue" // استيراد المكون الجديد
</script>

<style scoped>
.page {
  min-height: 100vh;
  color: white;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,215,0,0.04), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255,215,0,0.03), transparent 40%),
    #0b0f1a;
  background-size: 200% 200%;
  animation: bgMove 20s ease infinite;
}

/* فاصل أنيق بين الأقسام */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  gap: 15px;
  opacity: 0.6;
}

.section-divider .line {
  height: 1px;
  width: 100px;
  background: linear-gradient(to right, transparent, gold, transparent);
}

.section-divider .diamond {
  width: 10px;
  height: 10px;
  background: gold;
  transform: rotate(45deg);
  box-shadow: 0 0 10px gold;
}

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
}
</style>