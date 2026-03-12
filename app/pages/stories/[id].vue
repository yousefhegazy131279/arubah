<template>
  <div class="story-page">
    <Navbar />

    <main class="container">
      <div v-if="loading" class="loading">جاري تحميل الرواية...</div>

      <div v-else-if="story" class="story-layout">

        <!-- صورة الرواية -->
        <div class="cover-box">
          <img :src="baseURL + story.cover" :alt="story.title" class="cover" />
          <!-- زرار القراءة يبقى مجرد ديكور حاليا -->
          <button class="read-btn" disabled>
            📖 قراءة الرواية
          </button>
        </div>

        <!-- معلومات الرواية -->
        <div class="story-info">
          <h1 class="title">{{ story.title }}</h1>

          <div class="author-box">
            <span class="label">المؤلف</span>
            <span class="author">{{ story.author }}</span>
          </div>

          <!-- احصائيات -->
          <div class="stats">
            <div class="stat">👁 {{ story.views || 0 }} قراءة</div>
            <div class="stat">📚 {{ story.chapters || 0 }} فصل</div>
          </div>

          <!-- نبذة -->
          <div class="info-card">
            <h3>نبذة</h3>
            <p>{{ story.description }}</p>
          </div>

          <!-- محتويات -->
          <div class="info-card">
            <h3>المحتويات</h3>
            <p>{{ story.content }}</p>
          </div>

        </div>
      </div>

      <div v-else>
        <p>عذراً، لم يتم العثور على الرواية.</p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const baseURL = '/covers/'

// جلب بيانات الرواية
const { data: story, pending: loading } = await useFetch(
  'http://localhost/arubah_api/get-story.php',
  { params: { id } }
)
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 70px auto;
  padding: 0 20px;
  direction: rtl;
}

.story-layout {
  display: flex;
  gap: 60px;
  align-items: flex-start;
}

.cover-box {
  width: 300px;
  flex-shrink: 0;
  text-align: center;
}

.cover {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.7);
  transition: 0.4s;
  aspect-ratio: 2/3;
  object-fit: cover;
}

.read-btn {
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, gold, #d4af37);
  font-size: 17px;
  font-weight: bold;
  cursor: not-allowed;
  transition: 0.3s;
}

.story-info {
  flex: 1;
  color: white;
}

.title {
  font-size: 42px;
  color: gold;
  margin-bottom: 20px;
}

.author-box {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 30px;
  font-size: 18px;
}

.label {
  color: gold;
  font-weight: bold;
}

.author {
  color: white;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.stat {
  background: rgba(255,255,255,0.05);
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 15px;
}

.info-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(8px);
}

.info-card h3 {
  color: gold;
  margin-bottom: 10px;
}

.info-card p {
  line-height: 1.8;
  color: #ddd;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #aaa;
}

/* موبايل */
@media(max-width:900px) {
  .story-layout {
    flex-direction: column;
    align-items: center;
  }

  .cover-box {
    width: 260px;
  }

  .title {
    text-align: center;
  }
}
</style>