<template>
  <div class="auth-container">
    <button class="auth-toggle-btn" @click="toggleSidebar" :class="{ open: isOpen }">
      <span class="arrow-icon">{{ isOpen ? '✕' : '☰' }}</span>
    </button>

    <aside class="auth-sidebar" :class="{ open: isOpen }">
      <div class="sidebar-content" v-if="!userStore.loading">
        <div class="user-profile" data-aos="fade-left" data-aos-duration="600">
          <div class="avatar-wrapper">
            <!-- عرض الصورة إذا كانت موجودة -->
            <img
              v-if="userStore.isLoggedIn && userStore.user?.avatar"
              :src="`/avatars/${userStore.user.avatar}`"
              alt="Avatar"
              class="avatar-img"
            />
            <div v-else-if="!userStore.isLoggedIn" class="avatar guest-avatar">👤</div>
            <div v-else class="avatar user-avatar">{{ userStore.user?.username?.charAt(0) || '?' }}</div>
            <div class="avatar-glow"></div>
          </div>
          <div class="user-info">
            <template v-if="!userStore.isLoggedIn">
              <span class="user-status">زائر</span>
              <span class="user-greeting">مرحباً بك</span>
            </template>
            <template v-else>
              <span class="user-name">{{ userStore.user?.username || 'مستخدم' }}</span>
              <span class="user-role">{{ userStore.user?.role === 'admin' ? 'مسؤول' : 'مستخدم' }}</span>
            </template>
          </div>
        </div>

        <div class="actions-list" data-aos="fade-left" data-aos-delay="100">
          <template v-if="!userStore.isLoggedIn">
            <NuxtLink to="/login" class="action-btn login-btn">
              <span class="btn-icon">🔑</span>
              <span class="btn-text">دخول</span>
            </NuxtLink>
            <NuxtLink to="/register" class="action-btn register-btn">
              <span class="btn-icon">📝</span>
              <span class="btn-text">تسجيل</span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink v-if="userStore.isAdmin" to="/admin-arubah" class="action-btn admin-btn">
              <span class="btn-icon">⚙️</span>
              <span class="btn-text">لوحة التحكم</span>
            </NuxtLink>
            <button @click="handleLogout" class="action-btn logout-btn">
              <span class="btn-icon">🚪</span>
              <span class="btn-text">تسجيل خروج</span>
            </button>
          </template>
        </div>
      </div>
      <div v-else class="loading-state">جاري التحميل...</div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import AOS from 'aos'

const userStore = useUserStore()
const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const handleLogout = async () => {
  await userStore.logout()
  isOpen.value = false
  // يمكن إعادة توجيه المستخدم إلى الصفحة الرئيسية إذا أردت
  // navigateTo('/')
}

onMounted(async () => {
  AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true, offset: 0 })
  // تحميل بيانات المستخدم إذا لم تكن موجودة
  if (!userStore.user && !userStore.loading) {
    await userStore.fetchUser()
  }
})
</script>

<style scoped>
/* الأنماط كما هي تماماً، فقط أضف class للتحميل */
.loading-state {
  text-align: center;
  padding: 2rem;
  color: gold;
  font-size: 0.9rem;
}

/* باقي الأنماط (لم تتغير) */
.auth-container {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 998;
  direction: rtl;
}

.auth-toggle-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(145deg, #ffd700, #f0c000);
  border: none;
  border-radius: 50%;
  color: #050814;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  z-index: 999;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.auth-toggle-btn:hover {
  transform: translateY(-50%) scale(1.08);
  background: linear-gradient(145deg, #f0c000, #ffd700);
  box-shadow: 0 12px 28px rgba(255, 215, 0, 0.8), 0 0 0 2px rgba(255, 255, 255, 0.4) inset;
}

.auth-toggle-btn.open {
  right: 260px;
}

.arrow-icon {
  display: block;
  transition: transform 0.3s ease;
}

.auth-toggle-btn:hover .arrow-icon {
  transform: rotate(15deg);
}

.auth-sidebar {
  position: absolute;
  top: 50%;
  right: -320px;
  transform: translateY(-50%);
  width: 260px;
  background: rgba(10, 12, 25, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 30px 0 0 30px;
  box-shadow: -10px 10px 40px rgba(0, 0, 0, 0.5), -5px 0 20px rgba(255, 215, 0, 0.2);
  padding: 1.5rem 1rem;
  transition: right 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  color: white;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid gold;
}

.auth-sidebar.open {
  right: 0;
}

.auth-sidebar:not(.open) {
  overflow: hidden;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: 0.3rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  z-index: 2;
  background: rgba(255, 215, 0, 0.15);
  border: 2px solid gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
}

.avatar-wrapper:hover .avatar {
  transform: scale(1.05);
  border-color: white;
}

.guest-avatar {
  background: rgba(255, 215, 0, 0.1);
  color: gold;
}

.user-avatar {
  background: gold;
  color: #050814;
  font-weight: bold;
  border: 3px solid white;
}

.avatar-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.6), transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s infinite;
  z-index: 1;
}

@keyframes pulseGlow {
  0% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.7; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(0.9); }
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-status {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  letter-spacing: 0.5px;
}

.user-greeting {
  color: gold;
  font-size: 1rem;
  font-weight: bold;
}

.user-name {
  color: gold;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2;
}

.user-role {
  color: rgba(255, 215, 0, 0.7);
  font-size: 0.75rem;
  background: rgba(255, 215, 0, 0.15);
  padding: 0.2rem 0.8rem;
  border-radius: 50px;
  display: inline-block;
  margin-top: 0.2rem;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0 5px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 215, 0, 0.2);
  width: 100%;
  text-align: right;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
}

.btn-icon {
  font-size: 1.1rem;
  min-width: 24px;
  filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
  transition: transform 0.2s ease;
}

.action-btn:hover .btn-icon {
  transform: scale(1.1);
}

.btn-text {
  flex: 1;
  text-align: right;
}

.login-btn:hover,
.register-btn:hover,
.admin-btn:hover {
  background: gold;
  color: #050814;
  border-color: gold;
  transform: translateX(-3px);
  box-shadow: 0 8px 18px rgba(255, 215, 0, 0.6);
}

.logout-btn:hover {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
  transform: translateX(-3px);
  box-shadow: 0 8px 18px rgba(231, 76, 60, 0.6);
}

[data-aos="fade-left"] {
  opacity: 0;
  transform: translateX(30px);
  transition-property: opacity, transform;
}

[data-aos="fade-left"].aos-animate {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .auth-toggle-btn {
    width: 42px;
    height: 42px;
    font-size: 1.3rem;
  }
  .auth-sidebar {
    width: 220px;
    padding: 1.5rem 0.8rem;
    min-height: 320px;
  }
  .auth-toggle-btn.open {
    right: 220px;
  }
  .avatar-wrapper {
    width: 60px;
    height: 60px;
  }
  .avatar {
    font-size: 1.8rem;
  }
  .action-btn {
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
  }
  .btn-icon {
    font-size: 1rem;
    min-width: 20px;
  }
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>