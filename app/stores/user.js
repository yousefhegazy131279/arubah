import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const loading = ref(false)
  const isLoggedIn = ref(false)
  const isAdmin = ref(false)

  const fetchUser = async () => {
    loading.value = true
    try {
      const response = await fetch('http://localhost/arooba/public/api/auth/profile.php', {
        credentials: 'include'
      })
      if (!response.ok) {
        if (response.status === 401) {
          user.value = null
          isLoggedIn.value = false
          isAdmin.value = false
          return
        }
        throw new Error('Failed to fetch user')
      }
      const data = await response.json()
      if (data.success && data.user) {
        user.value = data.user
        isLoggedIn.value = true
        isAdmin.value = data.user.role === 'admin'
      } else {
        user.value = null
        isLoggedIn.value = false
        isAdmin.value = false
      }
    } catch (error) {
      console.error('Fetch user error:', error)
      user.value = null
      isLoggedIn.value = false
      isAdmin.value = false
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost/arooba/public/api/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        await fetchUser()
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost/arooba/public/api/auth/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const logout = async () => {
    try {
      await fetch('http://localhost/arooba/public/api/auth/logout.php', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    user.value = null
    isLoggedIn.value = false
    isAdmin.value = false
  }

  return {
    user,
    loading,
    isLoggedIn,
    isAdmin,
    fetchUser,
    login,
    register,
    logout
  }
})