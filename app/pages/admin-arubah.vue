<template>
    <div class="admin-page">
      <Navbar />
      <div class="container">
        <h1 class="page-title">لوحة تحكم عُروبة 🏛️</h1>
        <p class="subtitle">إدارة اقتراحات القراء والتعليقات + الروايات</p>
  
        <!-- قسم الاقتراحات -->
        <h2 class="section-title">اقتراحات القراء</h2>
        <div class="stats-bar">
          <div class="stat-card">
            <span>إجمالي الاقتراحات</span>
            <strong>{{ suggestions.length }}</strong>
          </div>
        </div>
  
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الرواية المقترحة</th>
                <th>التعليق</th>
                <th>التاريخ</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in suggestions" :key="item.id">
                <td>{{ item.name }}</td>
                <td><strong>{{ item.story_title }}</strong></td>
                <td class="comment-cell">{{ item.comment }}</td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                  <button @click="deleteSuggestion(item.id)" class="delete-btn">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="suggestions.length === 0" class="no-data">
          لا توجد اقتراحات حالياً في قاعدة البيانات.
        </div>
  
        <hr />
  
        <!-- قسم إدارة الروايات -->
        <h2 class="section-title">إدارة الروايات</h2>
  
        <form @submit.prevent="saveNovel" class="add-form">
          <div class="form-row">
            <input v-model="newNovel.title" placeholder="عنوان الرواية" required />
            <input v-model="newNovel.author" placeholder="المؤلف" required />
          </div>
          <div class="form-row">
            <input v-model="newNovel.cover" placeholder="اسم ملف الغلاف (مثلاً story1.png)" required />
          </div>
          <div class="form-row">
            <textarea v-model="newNovel.description" placeholder="نبذة عن الرواية"></textarea>
          </div>
          <div class="form-row">
            <textarea v-model="newNovel.content" placeholder="المحتوى أو عدد الفصول"></textarea>
          </div>
          <button type="submit" class="submit-btn">{{ isEditing ? 'تحديث الرواية' : 'أضف الرواية' }}</button>
        </form>
  
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>العنوان</th>
                <th>المؤلف</th>
                <th>صورة الغلاف</th>
                <th>خيارات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="novel in novels" :key="novel.id">
                <td>{{ novel.title }}</td>
                <td>{{ novel.author || 'غير محدد' }}</td>
                <td><img :src="baseURL + novel.cover" alt="" width="80" /></td>
                <td>
                  <button @click="editNovel(novel)" class="edit-btn">تعديل</button>
                  <button @click="deleteNovel(novel.id)" class="delete-btn">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="novels.length === 0" class="no-data">
          لا توجد روايات حالياً في قاعدة البيانات.
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const suggestions = ref([])
  const novels = ref([])
  const baseURL = '/covers/'
  
  const newNovel = ref({ title:'', author:'', cover:'', description:'', content:'' })
  const isEditing = ref(false)
  const editingId = ref(null)
  
  // جلب الاقتراحات
  const fetchSuggestions = async () => {
    try {
      const data = await $fetch('http://localhost/arubah_api/suggestions.php')
      suggestions.value = data
    } catch (e) { console.error(e) }
  }
  
  // حذف اقتراح
  const deleteSuggestion = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الاقتراح؟')) return
    try {
      const res = await $fetch(`http://localhost/arubah_api/suggestions.php?id=${id}`, { method: 'DELETE' })
      if(res.success) suggestions.value = suggestions.value.filter(s => s.id !== id)
    } catch (e) { alert('حدث خطأ أثناء الاتصال بالسيرفر') }
  }
  
  // جلب الروايات
  const fetchNovels = async () => {
    try {
      const data = await $fetch('http://localhost/arubah_api/get-novels.php')
      novels.value = data.map(n => ({ ...n, author: n.author || 'غير محدد' }))
    } catch(e){ console.error(e) }
  }
  
  // اضافة / تعديل
  const saveNovel = async () => {
    try {
      const url = isEditing.value
        ? `http://localhost/arubah_api/edit-novel.php?id=${editingId.value}`
        : 'http://localhost/arubah_api/add-novel.php'
      const method = isEditing.value ? 'PUT' : 'POST'
      const res = await $fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNovel.value)
      })
      if(res.success){
        alert(res.message)
        newNovel.value = { title:'', author:'', cover:'', description:'', content:'' }
        isEditing.value = false
        editingId.value = null
        fetchNovels()
      } else alert(res.message)
    } catch(e){ console.error(e); alert('حدث خطأ أثناء الاتصال بالسيرفر') }
  }
  
  // تفعيل تعديل
  const editNovel = (novel) => {
    newNovel.value = { ...novel }
    isEditing.value = true
    editingId.value = novel.id
  }
  
  // حذف رواية
  const deleteNovel = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرواية؟')) return
    try { await fetch(`http://localhost/arubah_api/delete-novel.php?id=${id}`); fetchNovels() } 
    catch(e){ console.error(e) }
  }
  
  onMounted(() => { fetchSuggestions(); fetchNovels(); })
  
  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('ar-EG', { year:'numeric', month:'long', day:'numeric' }) : '-'
  </script>
  
  <style scoped>
  .admin-page { min-height: 100vh; background: #0b0f1a; color: white; direction: rtl; }
  .container { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
  .page-title { color: gold; font-family: 'Amiri', serif; font-size: 2.5rem; margin-bottom: 10px; }
  .subtitle { color: #888; margin-bottom: 30px; }
  .section-title { color: gold; font-size: 1.8rem; margin: 30px 0 15px 0; }
  .stats-bar { margin-bottom: 20px; }
  .stat-card { background: rgba(255, 215, 0, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 215, 0, 0.3); display: inline-block; min-width: 200px; }
  .stat-card span { display: block; font-size: 0.9rem; color: #ccc; }
  .stat-card strong { font-size: 2rem; color: gold; }
  .table-responsive { overflow-x: auto; background: rgba(255,255,255,0.02); border-radius: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 30px; }
  .admin-table { width: 100%; border-collapse: collapse; text-align: right; }
  th, td { padding: 18px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  th { background: rgba(255, 215, 0, 0.1); color: gold; font-weight: bold; }
  tr:hover { background: rgba(255,255,255,0.03); }
  .comment-cell { max-width: 300px; font-size: 0.9rem; color: #bbb; line-height: 1.4; }
  .delete-btn { background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: 0.3s; font-weight: bold; }
  .delete-btn:hover { background: #c0392b; transform: translateY(-2px); }
  .edit-btn { background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: 0.3s; font-weight: bold; margin-right: 5px; }
  .edit-btn:hover { background: #2980b9; transform: translateY(-2px); }
  
  /* --- الفورم العصري --- */
  .add-form { background: rgba(255,215,0,0.05); padding: 25px; border-radius: 15px; box-shadow: 0 4px 15px rgba(255,215,0,0.1); margin-bottom: 30px; }
  .add-form .form-row { display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap; }
  .add-form input, .add-form textarea { flex: 1 1 100%; padding: 12px 15px; border-radius: 10px; border: 1px solid rgba(255,215,0,0.3); background: rgba(0,0,0,0.2); color: white; outline: none; transition: 0.3s; resize: none; }
  .add-form input:focus, .add-form textarea:focus { border-color: gold; box-shadow: 0 0 12px rgba(255,215,0,0.3); }
  .add-form textarea { min-height: 80px; }
  .submit-btn { padding: 12px 25px; background: gold; color: black; font-weight: bold; border: none; border-radius: 12px; cursor: pointer; transition: 0.3s; }
  .submit-btn:hover { background: #f0c000; transform: translateY(-2px); }
  
  .no-data { text-align: center; padding: 40px; color: #666; font-size: 1.2rem; }
  @media (max-width: 768px){
    .page-title { font-size: 2rem; }
    .section-title { font-size: 1.4rem; }
    .add-form .form-row { flex-direction: column; }
  }
  </style>