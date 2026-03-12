<template>
    <section class="suggestions-section">
      <div class="container">
        <h2 class="section-title">هل لديك قصة تود تعريبها؟</h2>
        <p class="subtitle">شاركونا اقتراحاتكم لننشر سحر لغة الضاد في قصصكم المفضلة</p>
  
        <div class="flex-layout">
          <form class="suggestion-form" @submit.prevent="submitSuggestion">
            <div class="input-group">
              <input v-model="form.name" type="text" placeholder="اسمك" required />
            </div>
            <div class="input-group">
              <input v-model="form.storyTitle" type="text" placeholder="اسم الرواية المقترحة" required />
            </div>
            <div class="input-group">
              <textarea v-model="form.comment" placeholder="لماذا تود رؤية هذه القصة بالعربية؟" rows="4"></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'جاري الإرسال...' : 'إرسال الاقتراح' }}
            </button>
          </form>
  
          <div class="comments-wall">
            <h3 class="wall-title">آخر الاقتراحات</h3>
            <div class="comments-container">
              <div v-for="(item, index) in suggestionsList" :key="index" class="comment-card">
                <span class="user-name">{{ item.name }}</span>
                <p class="story-suggested">اقترح تعريب: <strong>{{ item.storyTitle }}</strong></p>
                <p class="user-comment">"{{ item.comment }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const form = ref({
    name: '',
    storyTitle: '',
    comment: ''
  })
  
  const suggestionsList = ref([])
  const isSubmitting = ref(false) // تعريف المتغير اللي كان ناقص
  
  // دالة جلب البيانات من XAMPP
  const loadSuggestions = async () => {
    try {
      const data = await $fetch('http://localhost/arubah_api/suggestions.php')
      suggestionsList.value = data
    } catch (e) {
      console.error("تاكد من تشغيل XAMPP (Apache & MySQL)")
    }
  }
  
  // دالة إرسال البيانات (الموحدة)
  const submitSuggestion = async () => {
    if (!form.value.name || !form.value.storyTitle) return
    
    isSubmitting.value = true
    try {
      const response = await $fetch('http://localhost/arubah_api/suggestions.php', {
        method: 'POST',
        body: form.value
      })
  
      if (response.success) {
        // تحديث القائمة فوراً بالبيانات الراجعة
        suggestionsList.value.unshift(response.data)
        // تفريغ الحقول
        form.value = { name: '', storyTitle: '', comment: '' }
        alert('تم إرسال اقتراحك بنجاح!')
      }
    } catch (error) {
      console.error(error)
      alert("حدث خطأ. تأكد من تشغيل XAMPP وتفعيل الـ Database")
    } finally {
      isSubmitting.value = false
    }
  }
  
  // تشغيل جلب البيانات عند تحميل الصفحة
  onMounted(() => {
    loadSuggestions()
  })
  </script>
  
  <style scoped>
  /* التنسيقات (الـ CSS) زي ما هي بدون تغيير */
  .loader {
  width: 20px;
  height: 20px;
  border: 3px solid #050814;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  .suggestions-section { padding: 60px 20px; background: rgba(5, 8, 20, 0.5); border-top: 1px solid rgba(255, 215, 0, 0.1); }
  .container { max-width: 1100px; margin: 0 auto; text-align: center; }
  .section-title { color: gold; font-size: 2.2rem; margin-bottom: 10px; font-family: 'Amiri', serif; }
  .subtitle { color: #ccc; margin-bottom: 40px; }
  .flex-layout { display: flex; gap: 40px; align-items: flex-start; text-align: right; direction: rtl; }
  .suggestion-form { flex: 1; background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
  .input-group { margin-bottom: 20px; }
  input, textarea { width: 100%; padding: 12px 15px; background: #0b0f1a; border: 1px solid rgba(255, 215, 0, 0.3); color: white; border-radius: 8px; font-family: 'Cairo', sans-serif; outline: none; transition: 0.3s; }
  input:focus, textarea:focus { border-color: gold; box-shadow: 0 0 10px rgba(255, 215, 0, 0.2); }
  .submit-btn { width: 100%; padding: 15px; background: gold; color: #050814; border: none; border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s; }
  .submit-btn:disabled { background: #555; cursor: not-allowed; }
  .submit-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4); }
  .comments-wall { flex: 1; max-height: 450px; }
  .wall-title { color: gold; margin-bottom: 20px; font-size: 1.5rem; }
  .comments-container { overflow-y: auto; max-height: 400px; padding-left: 10px; }
  .comments-container::-webkit-scrollbar { width: 5px; }
  .comments-container::-webkit-scrollbar-thumb { background: gold; border-radius: 10px; }
  .comment-card { background: rgba(255, 215, 0, 0.05); padding: 15px; border-radius: 12px; margin-bottom: 15px; border-right: 4px solid gold; animation: fadeIn 0.5s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .user-name { color: gold; font-weight: bold; display: block; margin-bottom: 5px; }
  .story-suggested { font-size: 0.9rem; margin-bottom: 5px; color: #eee; }
  .user-comment { font-size: 0.85rem; font-style: italic; color: #bbb; }
  @media (max-width: 850px) { .flex-layout { flex-direction: column; } .suggestion-form, .comments-wall { width: 100%; } }
  </style>