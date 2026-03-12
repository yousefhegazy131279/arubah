<template>
    <div class="contact-page">
      <Navbar />
      
      <div class="container">
        <div class="contact-wrapper">
          <div class="contact-info">
            <h1 class="golden-text">اتصل بنا</h1>
            <p>يسعدنا سماع آرائكم واقتراحاتكم لتطوير مشروع "عُروبة".</p>
            
            <div class="info-items">
              <div class="item">
                <span class="icon">📧</span>
                <div>
                  <h4>البريد الإلكتروني</h4>
                  <p>info@arubah.com</p>
                </div>
              </div>
              <div class="item">
                <span class="icon">📍</span>
                <div>
                  <h4>المقر</h4>
                  <p>بغداد، العراق / القاهرة، مصر</p>
                </div>
              </div>
            </div>
          </div>
  
          <div class="contact-form">
            <form @submit.prevent="sendMessage">
              <div class="form-group">
                <label>الاسم بالكامل</label>
                <input v-model="formData.name" type="text" placeholder="اكتب اسمك هنا" required />
              </div>
              
              <div class="form-group">
                <label>عنوان الرسالة</label>
                <input v-model="formData.subject" type="text" placeholder="مثلاً: طلب ترجمة رواية" required />
              </div>
  
              <div class="form-group">
                <label>رسالتك</label>
                <textarea v-model="formData.message" rows="5" placeholder="اكتب تفاصيل رسالتك..." required></textarea>
              </div>
  
              <button type="submit" :disabled="loading" class="send-btn">
                {{ loading ? 'جاري الإرسال...' : 'إرسال الرسالة' }}
              </button>
              
              <p v-if="statusMsg" :class="['status', isError ? 'error' : 'success']">
                {{ statusMsg }}
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const formData = ref({
    name: '',
    subject: '',
    message: ''
  })
  
  const loading = ref(false)
  const statusMsg = ref('')
  const isError = ref(false)
  
  const sendMessage = async () => {
    loading.value = true
    statusMsg.value = ''
    
    try {
      // هنا هنستخدم نفس الـ API اللي عملناه مع تعديل بسيط أو جدول جديد
      const response = await $fetch('http://localhost/arubah_api/contact.php', {
        method: 'POST',
        body: formData.value
      })
  
      if (response.success) {
        statusMsg.value = 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.'
        isError.value = false
        formData.value = { name: '', subject: '', message: '' } // تصغير الفورم
      } else {
        throw new Error()
      }
    } catch (err) {
      statusMsg.value = 'حدث خطأ أثناء الإرسال. تأكد من تشغيل XAMPP.'
      isError.value = true
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .contact-page { min-height: 100vh; background: #050814; color: white; direction: rtl; }
  .container { max-width: 1100px; margin: 60px auto; padding: 0 20px; }
  .contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; background: rgba(255,255,255,0.02); padding: 40px; border-radius: 20px; border: 1px solid rgba(255,215,0,0.1); }
  
  .golden-text { color: gold; font-family: 'Amiri', serif; font-size: 3rem; margin-bottom: 20px; }
  .info-items { margin-top: 40px; }
  .item { display: flex; gap: 15px; margin-bottom: 25px; align-items: center; }
  .item .icon { font-size: 2rem; background: rgba(255,215,0,0.1); padding: 10px; border-radius: 12px; }
  .item h4 { color: gold; margin: 0; }
  
  .contact-form form { display: flex; flex-direction: column; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group label { color: #ccc; font-size: 0.9rem; }
  input, textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,215,0,0.2); padding: 12px; border-radius: 8px; color: white; outline: none; transition: 0.3s; }
  input:focus, textarea:focus { border-color: gold; box-shadow: 0 0 10px rgba(255,215,0,0.2); }
  
  .send-btn { background: gold; color: #050814; padding: 15px; border: none; border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s; }
  .send-btn:hover:not(:disabled) { transform: scale(1.02); box-shadow: 0 0 20px rgba(255,215,0,0.4); }
  .send-btn:disabled { background: #555; cursor: not-allowed; }
  
  .status { margin-top: 15px; text-align: center; font-weight: bold; }
  .status.success { color: #2ecc71; }
  .status.error { color: #e74c3c; }
  
  @media (max-width: 768px) {
    .contact-wrapper { grid-template-columns: 1fr; }
  }
  </style>