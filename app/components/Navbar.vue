<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <!-- خلفية متحركة للشريط -->
    <div class="navbar-bg">
      <div class="bg-glow"></div>
    </div>

    <!-- القائمة اليمنى -->
    <ul class="nav-right" :class="{ open: menuOpen }">
      <li v-for="(item, index) in navItems.right" :key="index" :data-aos="'fade-down'" :data-aos-delay="100 * (index + 1)" data-aos-duration="600">
        <NuxtLink :to="item.path" class="nav-link" :class="{ active: isActive(item.path) }">
          <span class="link-icon">{{ item.icon }}</span>
          <span class="link-text">{{ item.name }}</span>
          <span class="link-glow"></span>
        </NuxtLink>
      </li>
    </ul>

    <!-- اللوجو مع تأثيرات أنيقة -->
    <div class="logo-wrapper" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="300">
      <NuxtLink to="/" class="logo">
        <div class="logo-inner">
          <img src="/logo.png" alt="عُروبة" />
          <div class="logo-glow"></div>
        </div>
      </NuxtLink>
    </div>

    <!-- القائمة اليسرى + زر الهامبرغر -->
    <div class="nav-left">
      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }" aria-label="القائمة">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <ul :class="{ open: menuOpen }">
        <li v-for="(item, index) in navItems.left" :key="index" :data-aos="'fade-down'" :data-aos-delay="100 * (index + 3)" data-aos-duration="600">
          <NuxtLink :to="item.path" class="nav-link" :class="{ active: isActive(item.path) }">
            <span class="link-icon">{{ item.icon }}</span>
            <span class="link-text">{{ item.name }}</span>
            <span class="link-glow"></span>
          </NuxtLink>
        </li>
        <!-- تم إزالة جميع عناصر المصادقة من القائمة الجانبية للموبايل -->
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

// عناصر القائمة
const navItems = {
  right: [
    { name: 'الرئيسية', path: '/', icon: '🏠' },
    { name: 'من نحن', path: '/about', icon: '📜' }
  ],
  left: [
    { name: 'الروايات', path: '/novels', icon: '📚' },
    { name: 'تواصل معنا', path: '/contact', icon: '✉️' }
  ]
}

// التحقق من الرابط النشط
const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

// إغلاق القوائم عند تغيير المسار
watch(() => route.path, () => {
  menuOpen.value = false
})

// مراقبة التمرير
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 50
  })

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', () => AOS.refresh())
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', () => AOS.refresh())
})
</script>

<style scoped>
/* إضافة مسافة في أعلى الصفحة لمنع تغطية المحتوى */
:global(body) {
  padding-top: 100px;
}

.navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 2rem;
  background: rgba(5, 8, 20, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 50px;
  z-index: 999;
  direction: rtl;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  top: 10px;
  background: rgba(5, 8, 20, 0.9);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.2) inset;
}

/* خلفية متحركة للنافبار */
.navbar-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  overflow: hidden;
  z-index: -1;
}

.bg-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.08) 0%, transparent 60%);
  animation: rotateBg 25s linear infinite;
  opacity: 0.6;
}

@keyframes rotateBg {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* القوائم */
.nav-right, .nav-left ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* تنسيق الروابط العامة */
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 1.1rem;
  border-radius: 40px;
  transition: all 0.25s ease;
  overflow: hidden;
  border: 1px solid transparent;
  background: transparent;
  letter-spacing: 0.3px;
}

.link-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 2px 5px rgba(255, 215, 0, 0.2));
  transition: transform 0.25s ease;
}

.link-text {
  position: relative;
  z-index: 2;
}

.link-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.25), transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease, opacity 0.3s ease;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.nav-link:hover {
  color: gold;
  border-color: rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.03);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.15);
}

.nav-link:hover .link-icon {
  transform: scale(1.15) rotate(2deg);
}

.nav-link:hover .link-glow {
  width: 120px;
  height: 120px;
  opacity: 0.8;
}

/* الرابط النشط */
.nav-link.active {
  color: #050814;
  background: gold;
  border-color: gold;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
}

.nav-link.active .link-icon {
  color: #050814;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.nav-link.active .link-glow {
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.6), transparent 70%);
}

/* تنسيق اللوجو */
.logo-wrapper {
  position: relative;
  margin: 0 0.8rem;
}

.logo {
  display: block;
  text-decoration: none;
}

.logo-inner {
  position: relative;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-inner img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(255, 215, 0, 0.4));
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  border-radius: 50%;
}

.logo-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.15), transparent 70%);
  border-radius: 50%;
  animation: glowPulse 4s ease-in-out infinite;
  z-index: 1;
}

@keyframes glowPulse {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
  100% { opacity: 0.3; transform: scale(1); }
}

.logo-wrapper:hover .logo-inner img {
  transform: scale(1.1) rotate(3deg);
}

/* زر الهامبرغر */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2.5px;
  background: gold;
  border-radius: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* ========== نسخة الموبايل ========== */
@media (max-width: 992px) {
  .navbar {
    padding: 0.5rem 1.5rem;
  }

  .nav-link {
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
  }

  .nav-right, .nav-left ul {
    gap: 0.4rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    top: 10px;
    padding: 0.5rem 1.2rem;
  }

  .hamburger {
    display: flex;
  }

  .nav-right, .nav-left ul {
    display: none;
    position: absolute;
    top: calc(100% + 10px);
    flex-direction: column;
    background: rgba(5, 8, 20, 0.95);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 20px;
    padding: 1rem;
    min-width: 200px;
    gap: 0.6rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }

  .nav-right {
    right: 0;
  }

  .nav-left ul {
    left: 0;
  }

  .nav-right.open, .nav-left ul.open {
    display: flex;
    animation: slideIn 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-15px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  .logo-inner {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.4rem 1rem;
  }

  .nav-right.open, .nav-left ul.open {
    min-width: 170px;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  .link-icon {
    font-size: 1rem;
  }

  .logo-inner {
    width: 42px;
    height: 42px;
  }

  .hamburger {
    width: 24px;
    height: 18px;
  }

  .hamburger-line {
    height: 2px;
  }

  .hamburger.active .hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.active .hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}

/* تأثيرات AOS مخصصة */
[data-aos="fade-down"] {
  transform: translate3d(0, -20px, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-down"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

[data-aos="zoom-in"] {
  transform: scale(0.7);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="zoom-in"].aos-animate {
  transform: scale(1);
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