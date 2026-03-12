<template>
    <nav class="navbar">
      <ul class="nav-right" :class="{ open: menuOpen }">
        <li><NuxtLink to="/">الصفحة الرئيسية</NuxtLink></li>
        <li><NuxtLink to="/about">من نحن</NuxtLink></li>
      </ul>
  
      <div class="logo">
        <NuxtLink to="/"><img src="/logo.png" alt="عُروبة" /></NuxtLink>
      </div>
  
      <div class="nav-left">
        <button class="hamburger" @click="menuOpen = !menuOpen">&#9776;</button>
        <ul :class="{ open: menuOpen }">
          <li><NuxtLink to="/novels">الروايات</NuxtLink></li>
          <li><NuxtLink to="/contact">تواصل معنا</NuxtLink></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const menuOpen = ref(false)
  </script>
  
  <style scoped>
.nav-container {
  display: flex;
  /* خلي الاتجاه طبيعي ltr عشان نتحكم في اليمين والشمال يدوي */
  direction: ltr; 
  justify-content: space-between; 
  align-items: center;
  padding: 1rem 5%;
}

.nav-links {
  display: flex;
  order: 2; /* يضمن وجوده في الآخر (يمين في الـ ltr) */
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  /* نرجع النص جوه اللينكات يبقى عربي مظبوط */
  direction: rtl; 
}
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background: #050814;
    border-bottom: 1px solid rgba(255,215,0,0.2);
    position: sticky;
    top: 0;
    z-index: 999;
    flex-wrap: wrap;
  }
  
  .nav-left ul, .nav-right {
    display: flex;
    gap: 20px;
    list-style: none;
  }
  
  .nav-left ul.open { display: flex; flex-direction: column; width: 100%; margin-top: 10px; }
  
  .nav-left ul li a, .nav-right li a {
    color: gold;
    text-decoration: none;
    font-weight: 500;
    padding: 10px 25px;
    border: 2px solid gold;
    border-radius: 25px;
    transition: all 0.3s ease;
    animation: floatGlow 4s ease-in-out infinite;
  }
  
  @keyframes floatGlow {
    0% { transform: translateY(0px) scale(1); box-shadow: 0 0 5px rgba(255,215,0,0.2);}
    50% { transform: translateY(-3px) scale(1.03); box-shadow: 0 0 15px rgba(255,215,0,0.5);}
    100% { transform: translateY(0px) scale(1); box-shadow: 0 0 5px rgba(255,215,0,0.2);}
  }
  
  .nav-left ul li a:hover, .nav-right li a:hover {
    background: gold; color: #050814;
    box-shadow: 0 0 20px rgba(255,215,0,0.8);
    transform: scale(1.05);
  }
  
  .logo img {
    width: 80px;
    border-radius: 50%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: floatLogo 4s ease-in-out infinite;
  }
  
  @keyframes floatLogo {
    0% { transform: translateY(0px) scale(1); }
    25% { transform: translateY(-5px) scale(1.02); }
    50% { transform: translateY(0px) scale(1); }
    75% { transform: translateY(5px) scale(1.02); }
    100% { transform: translateY(0px) scale(1); }
  }
  
  .logo img:hover {
    transform: scale(1.15);
    box-shadow: 0 0 20px 5px rgba(255,215,0,0.7),
                0 0 30px 10px rgba(255,215,0,0.5),
                0 0 40px 15px rgba(255,215,0,0.3);
    border: 2px solid gold;
  }
  
  .hamburger {
    display: none;
    font-size: 2rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  /* --- الإصلاح هنا ليكون Responsive بجد --- */
  @media (max-width: 768px) {
    .navbar { padding: 15px 20px; }
    .hamburger { display: block; order: 1; }
    .logo { order: 2; } /* اللوجو جنب الهامبرغر في الموبايل */

    .nav-left, .nav-right {
      width: 100%;
      order: 3; /* القوائم تنزل تحت اللوجو */
    }

    .nav-left ul, .nav-right {
      display: none; /* إخفاء في الحالة العادية */
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-top: 15px;
    }

    /* لما تفتح المنيو */
    .nav-left ul.open, .nav-right.open {
      display: flex;
    }

    .nav-left ul li a, .nav-right li a {
        width: 80%; /* عشان الأزرار تبان متناسقة تحت بعض */
        text-align: center;
    }
  }
  </style>