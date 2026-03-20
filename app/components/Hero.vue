<template>
  <div class="hero-section">
    <!-- خلفية متحركة موحدة وجذابة -->
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- محتوى الهيرو -->
    <div class="hero-container">
      <div class="logo-wrapper" data-aos="fade-down" data-aos-duration="1000">
        <div class="floating-logo">
          <img src="/logo.png" alt="عُروبة" class="logo-image" />
        </div>
      </div>

      <h1 ref="heroText" class="hero-title" :style="{ fontFamily: currentFont }" 
          data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
        <span class="title-line">
          <span class="light-text">أهلاً بك في</span>
        </span>
        <span class="title-line">
          <span class="golden-text">موقع عُروبة</span>
          <span class="exclamation">!</span>
        </span>
      </h1>

      <p class="hero-description" 
         data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
         حين تتكلم القصص بلغة الضاد .     </p>

      <div class="stats-container" 
           data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="cta-container" 
           data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
        <NuxtLink to="/novels" class="cta-button primary">
          <span>استكشف الروايات</span>
          <span class="button-icon">→</span>
        </NuxtLink>
        <NuxtLink to="/about" class="cta-button secondary">
          <span>تعرف علينا</span>
          <span class="button-icon">✨</span>
        </NuxtLink>
      </div>
    </div>

    <div class="decorative-elements">
      <div class="decor-circle circle-1"></div>
      <div class="decor-circle circle-2"></div>
      <div class="decor-line line-1"></div>
      <div class="decor-line line-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const fonts = ["Cairo", "Amiri", "Scheherazade"]
const currentFont = ref(fonts[0])
const heroText = ref(null)

const stats = ref([
  { icon: '📖', number: '٤+', label: 'روايات معربة' },
  { icon: '👥', number: '١٠٠+', label: 'مقترحات القراء' },
  { icon: '🌟', number: '3', label: ' أعمال أصلية' },
  { icon: '📝', number: '٢٠+', label: 'قيد التعريب' }
])

onMounted(() => {
  AOS.init({ duration: 800, easing: 'ease-in-out', once: false, mirror: true })

  if (heroText.value) {
    heroText.value.style.opacity = 0
    heroText.value.style.transform = 'translateY(50px)'
    setTimeout(() => {
      heroText.value.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      heroText.value.style.opacity = 1
      heroText.value.style.transform = 'translateY(0)'
    }, 100)
  }

  let i = 0
  setInterval(() => {
    i = (i + 1) % fonts.length
    currentFont.value = fonts[i]
  }, 2000)

  window.addEventListener('resize', () => AOS.refresh())
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #050814;
  color: white;
  direction: rtl;
}

/* ===== خلفية متحركة موحدة وجذابة ===== */
.animated-background {
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

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

/* باقي الأنماط كما هي (الشعار، العنوان، الإحصائيات، الأزرار، العناصر الزخرفية) */
.logo-wrapper {
  margin-bottom: 2rem;
}

.floating-logo {
  display: inline-block;
  animation: floatLogo 3s ease-in-out infinite;
}

.logo-image {
  width: 120px;
  height: auto;
  border-radius: 50%;
  filter: drop-shadow(0 0 20px rgba(255,215,0,0.5));
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

@keyframes floatLogo {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-2deg); }
  75% { transform: translateY(10px) rotate(2deg); }
}

.hero-title {
  font-size: 4.5rem;
  margin: 0 0 1.5rem;
  line-height: 1.3;
  transition: font-family 0.5s ease;
}

.title-line {
  display: block;
}

.light-text {
  font-weight: 300;
  color: rgba(255,255,255,0.9);
  font-size: 3rem;
}

.golden-text {
  background: linear-gradient(135deg, gold, #ffd700, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
  font-size: 5rem;
  font-weight: bold;
  display: inline-block;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.exclamation {
  font-size: 5rem;
  color: gold;
  animation: bounce 2s infinite;
  display: inline-block;
  margin-right: 10px;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.hero-description {
  font-size: 1.5rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 3rem;
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding: 0 20px;
}

.hero-description::before,
.hero-description::after {
  content: '❝';
  font-size: 3rem;
  color: gold;
  opacity: 0.3;
  position: absolute;
}

.hero-description::before {
  top: -20px;
  right: -20px;
}

.hero-description::after {
  content: '❞';
  bottom: -40px;
  left: -20px;
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 1.5rem 2rem;
  background: rgba(255,255,255,0.02);
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 150px;
}

.stat-item:hover {
  transform: translateY(-10px);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  animation: bounce 2s infinite;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: gold;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #aaa;
}

.cta-container {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
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

.cta-button:hover::before {
  width: 300px;
  height: 300px;
}

.cta-button.primary {
  background: gold;
  color: #050814;
  box-shadow: 0 10px 30px rgba(255,215,0,0.3);
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(255,215,0,0.5);
}

.cta-button.secondary {
  background: transparent;
  color: gold;
  border: 2px solid gold;
}

.cta-button.secondary:hover {
  background: gold;
  color: #050814;
  transform: translateY(-3px);
}

.button-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(5px);
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decor-circle {
  position: absolute;
  border: 2px solid rgba(255,215,0,0.1);
  border-radius: 50%;
  animation: rotateSlow 20s linear infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  right: 5%;
  animation-direction: reverse;
}

.decor-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, gold, transparent);
  height: 2px;
  width: 200px;
  opacity: 0.1;
  animation: slideLine 10s linear infinite;
}

.line-1 {
  top: 20%;
  right: 10%;
  transform: rotate(45deg);
}

.line-2 {
  bottom: 30%;
  left: 15%;
  transform: rotate(-45deg);
  animation-delay: -5s;
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes slideLine {
  0% { opacity: 0.1; width: 200px; }
  50% { opacity: 0.3; width: 300px; }
  100% { opacity: 0.1; width: 200px; }
}

/* استجابة للشاشات */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3.5rem;
  }
  .light-text {
    font-size: 2.5rem;
  }
  .golden-text {
    font-size: 4rem;
  }
  .exclamation {
    font-size: 4rem;
  }
  .stats-container {
    gap: 1.5rem;
  }
  .stat-item {
    min-width: 130px;
    padding: 1rem 1.5rem;
  }
  .logo-image {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .light-text {
    font-size: 1.8rem;
  }
  .golden-text {
    font-size: 3rem;
  }
  .exclamation {
    font-size: 3rem;
  }
  .hero-description {
    font-size: 1.2rem;
  }
  .stats-container {
    gap: 1rem;
  }
  .stat-item {
    min-width: 100px;
    padding: 0.8rem 1rem;
  }
  .stat-icon {
    font-size: 2rem;
  }
  .stat-number {
    font-size: 1.5rem;
  }
  .stat-label {
    font-size: 0.8rem;
  }
  .cta-container {
    gap: 1rem;
  }
  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  .decor-circle {
    display: none;
  }
  .logo-image {
    width: 80px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  .light-text {
    font-size: 1.5rem;
  }
  .golden-text {
    font-size: 2.2rem;
  }
  .exclamation {
    font-size: 2.2rem;
  }
  .stats-container {
    flex-direction: column;
    align-items: center;
  }
  .stat-item {
    width: 100%;
    max-width: 200px;
  }
  .cta-container {
    flex-direction: column;
  }
  .cta-button {
    width: 100%;
    justify-content: center;
  }
  .hero-description::before,
  .hero-description::after {
    display: none;
  }
  .logo-image {
    width: 60px;
  }
}

/* تأثيرات AOS المخصصة */
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
[data-aos="fade"] {
  opacity: 0;
  transition-property: opacity;
}
[data-aos="fade"].aos-animate {
  opacity: 1;
}

/* تحسينات الأداء */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>