<template>
  <div class="admin-page">
    <Navbar />
    <div class="container">
      <h1 class="page-title">لوحة تحكم عُروبة 🏛️</h1>
      <p class="subtitle">إدارة اقتراحات القراء والروايات والرسائل والمستخدمين</p>

      <!-- إحصائيات سريعة -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">💭</span>
          <div class="stat-info">
            <span class="stat-label">إجمالي الاقتراحات</span>
            <strong class="stat-value">{{ suggestions.length }}</strong>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📚</span>
          <div class="stat-info">
            <span class="stat-label">إجمالي الروايات</span>
            <strong class="stat-value">{{ novels.length }}</strong>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">✉️</span>
          <div class="stat-info">
            <span class="stat-label">إجمالي الرسائل</span>
            <strong class="stat-value">{{ messages.length }}</strong>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">👥</span>
          <div class="stat-info">
            <span class="stat-label">إجمالي المستخدمين</span>
            <strong class="stat-value">{{ users.length }}</strong>
          </div>
        </div>
      </div>

      <!-- تبويبات التنقل -->
      <div class="admin-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-text">{{ tab.name }}</span>
        </button>
      </div>

      <!-- قسم الاقتراحات -->
      <div v-if="activeTab === 'suggestions'" class="tab-pane">
        <div class="section-header">
          <h2 class="section-title"><span class="section-icon">🗣️</span> اقتراحات القراء</h2>
          <div class="section-actions">
            <button @click="refreshSuggestions" class="refresh-btn" :disabled="loadingSuggestions">
              <span>🔄</span> تحديث
            </button>
          </div>
        </div>

        <div v-if="loadingSuggestions" class="loading-state">
          <div class="loader"></div>
          <p>جاري تحميل الاقتراحات...</p>
        </div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>الرواية المقترحة</th>
                <th>التعليق</th>
                <th>التاريخ</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in suggestions" :key="item.id" class="fade-in">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="user-cell">
                    <span class="user-avatar">{{ item.name?.charAt(0) || '?' }}</span>
                    {{ item.name }}
                  </div>
                </td>
                <td><strong class="story-highlight">{{ item.storyTitle || item.story_title }}</strong></td>
                <td class="comment-cell">
                  <span v-if="item.comment">{{ item.comment }}</span>
                  <span v-else class="no-comment">-</span>
                </td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="deleteSuggestion(item.id)" class="delete-btn" title="حذف">
                      <span>🗑️</span> حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="suggestions.length === 0" class="empty-state">
            <span class="empty-icon">💭</span>
            <p>لا توجد اقتراحات بعد</p>
          </div>
        </div>
      </div>

      <!-- قسم الرسائل -->
      <div v-if="activeTab === 'messages'" class="tab-pane">
        <div class="section-header">
          <h2 class="section-title"><span class="section-icon">✉️</span> الرسائل الواردة</h2>
          <div class="section-actions">
            <button @click="refreshMessages" class="refresh-btn" :disabled="loadingMessages">
              <span>🔄</span> تحديث
            </button>
          </div>
        </div>

        <div v-if="loadingMessages" class="loading-state">
          <div class="loader"></div>
          <p>جاري تحميل الرسائل...</p>
        </div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الموضوع</th>
                <th>الرسالة</th>
                <th>الحالة</th>
                <th>التاريخ</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(msg, index) in messages" :key="msg.id" class="fade-in">
                <td>{{ index + 1 }}</td>
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td><strong>{{ msg.subject }}</strong></td>
                <td class="message-cell">{{ msg.message }}</td>
                <td>
                  <select v-model="msg.status" @change="updateMessageStatus(msg.id, msg.status)" class="status-select" :class="msg.status">
                    <option value="unread">غير مقروء</option>
                    <option value="read">مقروء</option>
                    <option value="replied">تم الرد</option>
                  </select>
                </td>
                <td>{{ formatDate(msg.created_at) }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="deleteMessage(msg.id)" class="delete-btn" title="حذف">
                      <span>🗑️</span> حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="messages.length === 0" class="empty-state">
            <span class="empty-icon">✉️</span>
            <p>لا توجد رسائل بعد</p>
          </div>
        </div>
      </div>

      <!-- قسم إدارة الروايات -->
      <div v-if="activeTab === 'novels'" class="tab-pane">
        <div class="section-header">
          <h2 class="section-title"><span class="section-icon">📚</span> إدارة الروايات</h2>
        </div>

        <!-- فورم إضافة/تعديل رواية -->
        <form @submit.prevent="saveNovel" class="add-form">
          <h3 class="form-title">{{ isEditing ? 'تعديل الرواية' : 'إضافة رواية جديدة' }}</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>عنوان الرواية</label>
              <input v-model="newNovel.title" placeholder="مثال: العائلة" required />
            </div>
            <div class="form-group">
              <label>المؤلف</label>
              <input v-model="newNovel.author" placeholder="اسم المؤلف" required />
            </div>
            <div class="form-group">
              <label>التصنيف</label>
              <select v-model="newNovel.category" required>
                <option value="">اختر التصنيف</option>
                <option value="كلاسيكيات">كلاسيكيات</option>
                <option value="مغامرات">مغامرات</option>
                <option value="خيال علمي">خيال علمي</option>
                <option value="دراما">دراما</option>
                <option value="تاريخية">تاريخية</option>
                <option value="رومانسية">رومانسية</option>
                <option value="غموض">غموض</option>
              </select>
            </div>
            <div class="form-group">
              <label>عدد الفصول</label>
              <input type="number" v-model.number="newNovel.chapters_count" min="0" placeholder="مثال: 12" />
            </div>
            <div class="form-group full-width">
              <label>صورة الغلاف</label>
              <input v-model="newNovel.cover" placeholder="اسم الملف (مثل: story1.png)" required />
            </div>
            <div class="form-group full-width">
              <label>نبذة عن الرواية</label>
              <textarea v-model="newNovel.description" rows="3" placeholder="اكتب نبذة مختصرة..."></textarea>
            </div>
          </div>
          <div class="form-actions">
            <button v-if="isEditing" type="button" @click="cancelEdit" class="cancel-btn">إلغاء</button>
            <button type="submit" class="submit-btn">
              {{ isEditing ? 'تحديث الرواية' : 'إضافة الرواية' }}
            </button>
          </div>
        </form>

        <!-- جدول الروايات -->
        <div v-if="loadingNovels" class="loading-state">
          <div class="loader"></div>
          <p>جاري تحميل الروايات...</p>
        </div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الغلاف</th>
                <th>العنوان</th>
                <th>المؤلف</th>
                <th>التصنيف</th>
                <th>الفصول</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(novel, index) in novels" :key="novel.id" class="fade-in">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="baseURL + novel.cover" :alt="novel.title" class="cover-thumb" />
                </td>
                <td><strong>{{ novel.title }}</strong></td>
                <td>{{ novel.author || 'غير محدد' }}</td>
                <td>{{ novel.category || 'غير محدد' }}</td>
                <td>{{ novel.chapters_count || 0 }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="editNovel(novel)" class="edit-btn" title="تعديل">
                      <span>✏️</span> تعديل
                    </button>
                    <button @click="deleteNovel(novel.id)" class="delete-btn" title="حذف">
                      <span>🗑️</span> حذف
                    </button>
                    <button @click="manageChapters(novel)" class="chapters-btn" title="إدارة الفصول">
                      <span>📖</span> فصول
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="novels.length === 0" class="empty-state">
            <span class="empty-icon">📚</span>
            <p>لا توجد روايات مضافة بعد</p>
          </div>
        </div>

        <!-- قسم إدارة الفصول -->
        <div v-if="selectedNovelForChapters" class="chapters-section">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-icon">📖</span>
              فصول: {{ selectedNovelForChapters.title }}
            </h2>
            <button @click="cancelChapters" class="close-btn">✕</button>
          </div>

          <!-- نموذج إضافة فصل -->
          <form @submit.prevent="addChapter" class="chapter-form" enctype="multipart/form-data">
            <div class="form-grid">
              <div class="form-group">
                <label>رقم الفصل</label>
                <input type="number" v-model.number="newChapter.chapter_number" placeholder="مثال: 1" required min="1" />
              </div>
              <div class="form-group">
                <label>عنوان الفصل</label>
                <input type="text" v-model="newChapter.title" placeholder="مثال: البداية" required />
              </div>
              <div class="form-group full-width">
                <label>ملف الفصل (PDF, Word)</label>
                <input type="file" ref="chapterFile" accept=".doc,.docx,.pdf" />
                <small style="color: #aaa;">يمكنك رفع ملف PDF أو Word</small>
              </div>
              <div class="form-group full-width">
                <label>محتوى الفصل (اختياري - إذا لم ترفع ملف)</label>
                <textarea v-model="newChapter.content" rows="3" placeholder="يمكنك كتابة النص هنا..."></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="submit-btn">➕ إضافة الفصل</button>
              <button type="button" @click="resetChapterForm" class="reset-btn">إعادة تعيين</button>
            </div>
          </form>

          <!-- قائمة الفصول -->
          <div v-if="loadingChapters" class="loading-state">
            <div class="loader"></div>
            <p>جاري تحميل الفصول...</p>
          </div>

          <div v-else class="chapters-list">
            <div v-if="chaptersList.length === 0" class="empty-state">
              <span class="empty-icon">📭</span>
              <p>لا توجد فصول مضافة بعد لهذه الرواية.</p>
            </div>

            <div v-for="chapter in chaptersList" :key="chapter.id" class="chapter-card">
              <div class="chapter-info">
                <span class="chapter-number">الفصل {{ chapter.chapter_number }}</span>
                <span class="chapter-title">{{ chapter.title }}</span>
                <span class="file-type" v-if="chapter.word_file">
                  <span v-if="isPdf(chapter.word_file)" title="ملف PDF">📄</span>
                  <span v-else-if="isDoc(chapter.word_file)" title="ملف Word">📝</span>
                  <span v-else>📁</span>
                </span>
              </div>
              <div class="chapter-actions">
                <a v-if="chapter.word_file" :href="chapter.word_file" target="_blank" class="download-link" title="تحميل الملف">
                  📥 تحميل
                </a>
                <button @click="deleteChapter(chapter.id)" class="delete-btn small" title="حذف الفصل">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- قسم المستخدمين -->
      <div v-if="activeTab === 'users'" class="tab-pane">
        <div class="section-header">
          <h2 class="section-title"><span class="section-icon">👥</span> إدارة المستخدمين</h2>
          <div class="section-actions">
            <button @click="fetchUsers" class="refresh-btn" :disabled="loadingUsers">
              <span>🔄</span> تحديث
            </button>
          </div>
        </div>

        <div v-if="loadingUsers" class="loading-state">
          <div class="loader"></div>
          <p>جاري تحميل المستخدمين...</p>
        </div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>اسم المستخدم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور</th>
                <th>تاريخ التسجيل</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id" class="fade-in">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="user-cell">
                    <span class="user-avatar">{{ user.username?.charAt(0) || '?' }}</span>
                    {{ user.username }}
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <select
                    v-model="user.role"
                    @change="updateUserRole(user.id, user.role)"
                    class="status-select"
                    :class="user.role"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>{{ formatDate(user.created_at) }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="deleteUser(user.id)" class="delete-btn" title="حذف">
                      <span>🗑️</span> حذف
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="users.length === 0" class="empty-state">
            <span class="empty-icon">👥</span>
            <p>لا توجد مستخدمين بعد</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_URL = 'http://localhost/arooba/public/api'

// ========== البيانات ==========
const suggestions = ref([])
const loadingSuggestions = ref(false)

const messages = ref([])
const loadingMessages = ref(false)

const novels = ref([])
const loadingNovels = ref(false)
const baseURL = '/covers/'

const users = ref([])
const loadingUsers = ref(false)

// إدارة التبويبات
const tabs = [
  { id: 'suggestions', name: 'الاقتراحات', icon: '🗣️' },
  { id: 'messages', name: 'الرسائل', icon: '✉️' },
  { id: 'novels', name: 'الروايات', icon: '📚' },
  { id: 'users', name: 'المستخدمين', icon: '👥' }
]
const activeTab = ref('suggestions')

// بيانات الروايات والفصول
const newNovel = ref({
  title: '',
  author: '',
  cover: '',
  category: '',
  chapters_count: 0,
  description: ''
})
const isEditing = ref(false)
const editingId = ref(null)

const selectedNovelForChapters = ref(null)
const chaptersList = ref([])
const loadingChapters = ref(false)
const newChapter = ref({ chapter_number: null, title: '', content: '' })
const chapterFile = ref(null)

// دوال مساعدة للملفات
const getFileExt = (fileName) => {
  if (!fileName) return ''
  const parts = fileName.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

const isPdf = (fileName) => getFileExt(fileName) === 'pdf'
const isDoc = (fileName) => {
  const ext = getFileExt(fileName)
  return ext === 'doc' || ext === 'docx'
}

// ========== دوال الاقتراحات ==========
const fetchSuggestions = async () => {
  loadingSuggestions.value = true
  try {
    const response = await fetch(`${API_URL}/get_suggestions.php`, {
      credentials: 'include'
    })
    if (!response.ok) throw new Error('فشل جلب الاقتراحات')
    const data = await response.json()
    suggestions.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('خطأ في جلب الاقتراحات:', e)
    suggestions.value = []
  } finally {
    loadingSuggestions.value = false
  }
}
const refreshSuggestions = () => fetchSuggestions()

const deleteSuggestion = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذا الاقتراح؟')) return
  try {
    const response = await fetch(`${API_URL}/delete_suggestion.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await response.json()
    if (data.success) {
      suggestions.value = suggestions.value.filter(s => s.id !== id)
      alert('تم حذف الاقتراح بنجاح')
    } else {
      alert(data.message || 'فشل في حذف الاقتراح')
    }
  } catch (e) {
    console.error('خطأ:', e)
    alert('حدث خطأ أثناء الحذف')
  }
}

// ========== دوال الرسائل ==========
const fetchMessages = async () => {
  loadingMessages.value = true
  try {
    const response = await fetch(`${API_URL}/get-messages.php`, {
      credentials: 'include'
    })
    if (!response.ok) throw new Error('فشل جلب الرسائل')
    const data = await response.json()
    messages.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('خطأ في جلب الرسائل:', error)
    messages.value = []
  } finally {
    loadingMessages.value = false
  }
}

const refreshMessages = () => fetchMessages()

const updateMessageStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/update-message.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
      credentials: 'include'
    })
    const data = await response.json()
    if (data.success) {
      await fetchMessages() // إعادة تحميل الرسائل لتحديث الواجهة
    } else {
      alert('فشل تحديث الحالة')
    }
  } catch (e) {
    console.error('خطأ في تحديث الحالة:', e)
    alert('فشل تحديث الحالة')
  }
}

const deleteMessage = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return
  try {
    const response = await fetch(`${API_URL}/delete-message.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await response.json()
    if (data.success) {
      messages.value = messages.value.filter(m => m.id !== id)
      alert('تم الحذف بنجاح')
    } else {
      alert(data.message || 'فشل الحذف')
    }
  } catch (e) {
    console.error('خطأ:', e)
    alert('حدث خطأ: ' + e.message)
  }
}

// ========== دوال الروايات ==========
const fetchNovels = async () => {
  loadingNovels.value = true
  try {
    const response = await fetch(`${API_URL}/get-novels.php`, {
      credentials: 'include'
    })
    const data = await response.json()
    novels.value = Array.isArray(data) ? data.map(n => ({ ...n, author: n.author || 'غير محدد' })) : []
  } catch (e) {
    console.error('خطأ في جلب الروايات:', e)
    novels.value = []
  } finally {
    loadingNovels.value = false
  }
}

const saveNovel = async () => {
  try {
    const url = isEditing.value
      ? `${API_URL}/edit-novel.php?id=${editingId.value}`
      : `${API_URL}/add-novel.php`
    const method = isEditing.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNovel.value),
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      alert(res.message)
      resetNovelForm()
      fetchNovels()
    } else {
      alert(res.message)
    }
  } catch (e) {
    console.error(e)
    alert('حدث خطأ أثناء الاتصال بالسيرفر')
  }
}

const editNovel = (novel) => {
  newNovel.value = {
    title: novel.title,
    author: novel.author,
    cover: novel.cover,
    category: novel.category,
    chapters_count: novel.chapters_count,
    description: novel.description
  }
  isEditing.value = true
  editingId.value = novel.id
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => resetNovelForm()

const resetNovelForm = () => {
  newNovel.value = {
    title: '',
    author: '',
    cover: '',
    category: '',
    chapters_count: 0,
    description: ''
  }
  isEditing.value = false
  editingId.value = null
}

const deleteNovel = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذه الرواية؟')) return
  try {
    const response = await fetch(`${API_URL}/delete-novel.php?id=${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      fetchNovels()
      alert('تم الحذف بنجاح')
    } else {
      alert(res.message || 'فشل الحذف')
    }
  } catch (e) {
    console.error(e)
    alert('حدث خطأ في الحذف')
  }
}

// ========== دوال الفصول ==========
const manageChapters = (novel) => {
  selectedNovelForChapters.value = novel
  fetchChaptersForNovel(novel.id)
}

const cancelChapters = () => {
  selectedNovelForChapters.value = null
  chaptersList.value = []
  resetChapterForm()
}

const fetchChaptersForNovel = async (novelId) => {
  loadingChapters.value = true
  try {
    const response = await fetch(`${API_URL}/get-chapters.php?novel_id=${novelId}`, {
      credentials: 'include'
    })
    const data = await response.json()
    chaptersList.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('خطأ في جلب الفصول:', e)
    chaptersList.value = []
  } finally {
    loadingChapters.value = false
  }
}

const addChapter = async () => {
  if (!selectedNovelForChapters.value) return
  if (!newChapter.value.chapter_number || !newChapter.value.title) {
    alert('الرجاء إدخال رقم الفصل والعنوان')
    return
  }

  const formData = new FormData()
  formData.append('novel_id', selectedNovelForChapters.value.id)
  formData.append('chapter_number', newChapter.value.chapter_number)
  formData.append('title', newChapter.value.title)
  formData.append('content', newChapter.value.content)

  if (chapterFile.value?.files[0]) {
    formData.append('word_file', chapterFile.value.files[0])
  }

  try {
    const response = await fetch(`${API_URL}/add-chapter.php`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      alert('تم إضافة الفصل بنجاح')
      resetChapterForm()
      fetchChaptersForNovel(selectedNovelForChapters.value.id)
      fetchNovels()
    } else {
      alert(res.message || 'فشل في إضافة الفصل')
    }
  } catch (e) {
    console.error('خطأ في إضافة الفصل:', e)
    alert('حدث خطأ أثناء الاتصال بالسيرفر')
  }
}

const deleteChapter = async (chapterId) => {
  if (!confirm('هل أنت متأكد من حذف هذا الفصل؟')) return
  try {
    const response = await fetch(`${API_URL}/delete-chapter.php?id=${chapterId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      fetchChaptersForNovel(selectedNovelForChapters.value.id)
      fetchNovels()
      alert('تم حذف الفصل بنجاح')
    } else {
      alert(res.message || 'فشل في حذف الفصل')
    }
  } catch (e) {
    console.error('خطأ في حذف الفصل:', e)
    alert('حدث خطأ في الحذف')
  }
}

const resetChapterForm = () => {
  newChapter.value = { chapter_number: null, title: '', content: '' }
  if (chapterFile.value) chapterFile.value.value = ''
}

// ========== دوال المستخدمين ==========
const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const response = await fetch(`${API_URL}/auth/get-users.php`, {
      credentials: 'include'
    })
    if (response.status === 403) {
      console.error('غير مصرح به')
      users.value = []
      return
    }
    const data = await response.json()
    if (Array.isArray(data)) {
      users.value = data
    } else {
      console.error(data.error || 'فشل جلب المستخدمين')
      users.value = []
    }
  } catch (e) {
    console.error('خطأ في الاتصال:', e)
    users.value = []
  } finally {
    loadingUsers.value = false
  }
}

const updateUserRole = async (userId, newRole) => {
  try {
    const response = await fetch(`${API_URL}/auth/update-user-role.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, role: newRole }),
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      alert('تم تحديث الدور بنجاح')
    } else {
      alert(res.message || 'فشل تحديث الدور')
      await fetchUsers() // إعادة تحميل القائمة لتصحيح القيمة
    }
  } catch (e) {
    console.error('خطأ في تحديث الدور:', e)
    alert('حدث خطأ في تحديث الدور')
    await fetchUsers()
  }
}

const deleteUser = async (userId) => {
  if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return
  try {
    const response = await fetch(`${API_URL}/auth/delete-user.php?id=${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const res = await response.json()
    if (res.success) {
      users.value = users.value.filter(u => u.id !== userId)
      alert('تم حذف المستخدم بنجاح')
    } else {
      alert(res.message || 'فشل حذف المستخدم')
    }
  } catch (e) {
    console.error('خطأ في حذف المستخدم:', e)
    alert('حدث خطأ في حذف المستخدم')
  }
}

// ========== دوال مساعدة ==========
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return '-'
  }
}

// ========== التحميل عند بدء الصفحة ==========
onMounted(() => {
  fetchSuggestions()
  fetchMessages()
  fetchNovels()
  fetchUsers()
})
</script>

<style scoped>
/* الأنماط الحالية + إضافة أنماط التبويبات */

.admin-page {
  min-height: 100vh;
  background: #0b0f1a;
  color: white;
  direction: rtl;
}
.container {
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 20px;
}
.page-title {
  color: gold;
  font-family: 'Amiri', serif;
  font-size: 2.8rem;
  margin-bottom: 10px;
  text-align: center;
}
.subtitle {
  color: #888;
  margin-bottom: 40px;
  text-align: center;
  font-size: 1.2rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.stat-card {
  background: rgba(255,215,0,0.05);
  padding: 25px;
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.2);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s;
}
.stat-card:hover {
  transform: translateY(-5px);
  border-color: gold;
}
.stat-icon {
  font-size: 2.5rem;
  background: rgba(255,215,0,0.1);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}
.stat-info {
  flex: 1;
}
.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 5px;
}
.stat-value {
  font-size: 2rem;
  color: gold;
  font-weight: bold;
}

/* أنماط التبويبات */
.admin-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  background: rgba(255,215,0,0.05);
  border: 1px solid rgba(255,215,0,0.3);
  color: rgba(255,255,255,0.8);
  padding: 12px 25px;
  border-radius: 40px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn:hover {
  background: rgba(255,215,0,0.15);
  border-color: gold;
  color: gold;
  transform: translateY(-2px);
}

.tab-btn.active {
  background: gold;
  color: #050814;
  border-color: gold;
  box-shadow: 0 5px 20px rgba(255,215,0,0.4);
}

.tab-icon {
  font-size: 1.3rem;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* باقي الأنماط (كما هي من الكود السابق) */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;
}
.section-title {
  color: gold;
  font-size: 2rem;
  font-family: 'Amiri', serif;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0;
}
.section-icon {
  font-size: 2rem;
}
.refresh-btn {
  background: rgba(255,215,0,0.1);
  border: 1px solid gold;
  color: gold;
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
}
.refresh-btn:hover:not(:disabled) {
  background: gold;
  color: #0b0f1a;
}
.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.table-responsive {
  overflow-x: auto;
  background: rgba(255,255,255,0.02);
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.1);
  margin-bottom: 30px;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}
.admin-table th {
  background: rgba(255,215,0,0.1);
  color: gold;
  font-weight: bold;
  padding: 20px;
  font-size: 1rem;
}
.admin-table td {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.admin-table tr:hover {
  background: rgba(255,215,0,0.02);
}
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 35px;
  height: 35px;
  background: gold;
  color: #0b0f1a;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.story-highlight {
  color: white;
  background: rgba(255,215,0,0.1);
  padding: 5px 10px;
  border-radius: 8px;
}
.comment-cell, .message-cell {
  max-width: 300px;
  color: #bbb;
  line-height: 1.6;
}
.no-comment {
  color: #666;
  font-style: italic;
}
.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.edit-btn, .delete-btn, .chapters-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  transition: 0.3s;
}
.edit-btn {
  background: #3498db;
  color: white;
}
.edit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}
.delete-btn {
  background: #e74c3c;
  color: white;
}
.delete-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
.chapters-btn {
  background: #9b59b6;
  color: white;
}
.chapters-btn:hover {
  background: #8e44ad;
  transform: translateY(-2px);
}
.status-select {
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  background: rgba(255,255,255,0.1);
  color: white;
}
.status-select.unread {
  background: #e74c3c;
  color: white;
}
.status-select.read {
  background: #3498db;
  color: white;
}
.status-select.replied {
  background: #2ecc71;
  color: white;
}
.status-select.admin {
  background: gold;
  color: #050814;
}
.status-select.user {
  background: #7f8c8d;
  color: white;
}
.add-form {
  background: rgba(255,215,0,0.03);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.2);
  margin-bottom: 30px;
}
.form-title {
  color: gold;
  font-size: 1.5rem;
  margin-bottom: 25px;
  font-family: 'Amiri', serif;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group.full-width {
  grid-column: span 2;
}
.form-group label {
  color: #aaa;
  font-size: 0.9rem;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 15px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 10px;
  color: white;
  outline: none;
  transition: 0.3s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: gold;
  box-shadow: 0 0 15px rgba(255,215,0,0.2);
}
.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 25px;
}
.submit-btn, .cancel-btn, .reset-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
.submit-btn {
  background: gold;
  color: #0b0f1a;
}
.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255,215,0,0.4);
}
.cancel-btn {
  background: #555;
  color: white;
}
.cancel-btn:hover {
  background: #666;
}
.reset-btn {
  background: #7f8c8d;
  color: white;
}
.reset-btn:hover {
  background: #95a5a6;
}
.cover-thumb {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255,215,0,0.2);
}
.loading-state {
  text-align: center;
  padding: 60px;
  color: #888;
}
.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,215,0,0.1);
  border-top-color: gold;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}
.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 15px;
  opacity: 0.5;
}
.divider {
  margin: 50px 0;
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
}
.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.chapters-section {
  margin-top: 40px;
  padding: 30px;
  background: rgba(255,215,0,0.03);
  border-radius: 20px;
  border: 1px solid rgba(255,215,0,0.2);
  position: relative;
}
.close-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}
.close-btn:hover {
  background: #e74c3c;
  transform: scale(1.1);
}
.chapter-form {
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 15px;
}
.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chapter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,215,0,0.1);
  border-radius: 10px;
  transition: 0.3s;
}
.chapter-card:hover {
  border-color: gold;
  background: rgba(255,215,0,0.05);
}
.chapter-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}
.chapter-number {
  background: gold;
  color: #050814;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}
.chapter-title {
  color: white;
  font-size: 1rem;
}
.file-type {
  font-size: 1.2rem;
  margin-right: 5px;
}
.chapter-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.download-link {
  color: gold;
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid gold;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: 0.3s;
}
.download-link:hover {
  background: gold;
  color: #050814;
}
.delete-btn.small {
  background: #e74c3c;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
.delete-btn.small:hover {
  background: #c0392b;
  transform: scale(1.05);
}

/* استجابة */
@media (max-width: 768px) {
  .page-title { font-size: 2rem; }
  .section-title { font-size: 1.5rem; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full-width { grid-column: span 1; }
  .stats-grid { grid-template-columns: 1fr; }
  .action-buttons { flex-direction: column; }
  .admin-tabs {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .tab-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>