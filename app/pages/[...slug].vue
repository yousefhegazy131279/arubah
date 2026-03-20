<template>
  <div class="page">
  <Navbar />
    <Hero />
    <StoryCarousel />
    <Suggestions />
    <Footer />
  </div>
</template>

<script setup>
import Hero from "~/components/Hero.vue"
import StoryCarousel from "~/components/StoryCarousel.vue"
import Suggestions from "~/components/Suggestions.vue"

// يمكنك إعادة تفعيل AOS هنا إذا أردت
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from "~/components/Footer.vue"

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
  })
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #050814;
  color: white;
  display: flex;
  flex-direction: column;
}
</style>