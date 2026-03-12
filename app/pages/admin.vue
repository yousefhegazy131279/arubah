<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  try {
    // نعمل طلب للسيرفر للتأكد من الجلسة
    const res = await $fetch('http://localhost/arubah_api/check-session.php')

    if (!res.success) {
      // لو مفيش session → نروح لصفحة login
      router.push('/admin-login')
    }
    // لو فيه session → نسيبه داخل الصفحة
  } catch (e) {
    // لو فيه أي خطأ أو session مش موجود → نروح لل login
    router.push('/admin-login')
  }
})
</script>