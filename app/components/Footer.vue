<template>
    <footer class="footer">
      <!-- خلفية متحركة -->
      <div class="footer-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-overlay"></div>
      </div>
  
      <div class="container">
        <!-- محتوى الفوتر مقسم لأعمدة -->
        <div class="footer-content">
          <!-- العمود الأول: الشعار ووصف -->
          <div class="footer-column" data-aos="fade-up" data-aos-duration="800">
            <div class="logo-wrapper">
              <img src="/logo.png" alt="عُروبة" class="footer-logo" />
            </div>
            <p class="footer-description">
              منصة تعريب القصص العالمية بأسلوب أدبي يعكس جمال اللغة العربية.
            </p>
          </div>
  
          <!-- العمود الثاني: روابط سريعة -->
          <div class="footer-column" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <h3 class="footer-title">روابط سريعة</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/">الرئيسية</NuxtLink></li>
              <li><NuxtLink to="/about">من نحن</NuxtLink></li>
              <li><NuxtLink to="/novels">الروايات</NuxtLink></li>
              <li><NuxtLink to="/contact">تواصل معنا</NuxtLink></li>
            </ul>
          </div>
  
          <!-- العمود الثالث: وسائل التواصل -->
          <div class="footer-column" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <h3 class="footer-title">تابعنا</h3>
            <div class="social-links">
              <a href="https://www.facebook.com/arubaharabia" target="_blank" class="social-icon facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z"/>
                </svg>
                <span class="social-glow"></span>
              </a>
              <a href="https://www.instagram.com/arubaharabia" target="_blank" class="social-icon instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                  <path d="M7.75 2h8.5C19.097 2 21 3.903 21 6.25v11.5C21 20.097 19.097 22 16.25 22h-8.5C4.903 22 3 20.097 3 17.75V6.25C3 3.903 4.903 2 7.75 2zm0 1.5C5.955 3.5 4.5 4.955 4.5 6.75v10.5c0 1.795 1.455 3.25 3.25 3.25h8.5c1.795 0 3.25-1.455 3.25-3.25V6.75c0-1.795-1.455-3.25-3.25-3.25h-8.5zm4.25 3.25a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
                </svg>
                <span class="social-glow"></span>
              </a>
            </div>
          </div>
        </div>
  
        <!-- خط فاصل -->
        <div class="footer-divider" data-aos="width" data-aos-duration="1200"></div>
  
        <!-- حقوق النشر -->
        <div class="copyright" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
          <p>© عُروبة 2026. جميع الحقوق محفوظة.</p>
          <p class="copyright-heart">صنع بكل <span>❤️</span> من فريق عُروبة</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import AOS from 'aos'
  import 'aos/dist/aos.css'
  
  onMounted(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
    })
  })
  </script>
  
  <style scoped>
  .footer {
    position: relative;
    background: #050814;
    color: white;
    direction: rtl;
    padding: 60px 20px 30px;
    overflow: hidden;
    border-top: 1px solid rgba(255, 215, 0, 0.1);
  }
  
  /* خلفية متحركة */
  .footer-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.2;
    animation: float 20s infinite ease-in-out;
  }
  
  .orb-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.3), transparent);
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle at 70% 70%, rgba(255, 215, 0, 0.2), transparent);
    bottom: -150px;
    right: -150px;
    animation-delay: -5s;
  }
  
  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(255, 215, 0, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 215, 0, 0.02) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 30s linear infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, 30px) scale(1.1); }
    66% { transform: translate(-30px, -30px) scale(0.9); }
  }
  
  @keyframes gridMove {
    0% { background-position: 0 0; }
    100% { background-position: 50px 50px; }
  }
  
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 2;
  }
  
  /* توزيع الأعمدة */
  .footer-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* اللوجو */
  .logo-wrapper {
    margin-bottom: 10px;
  }
  
  .footer-logo {
    width: 70px;
    height: auto;
    border-radius: 50%;
    filter: drop-shadow(0 5px 15px rgba(255, 215, 0, 0.5));
    transition: transform 0.3s ease;
  }
  
  .footer-logo:hover {
    transform: scale(1.05);
  }
  
  .footer-description {
    color: #aaa;
    line-height: 1.8;
    font-size: 0.95rem;
    max-width: 250px;
  }
  
  /* عناوين الأعمدة */
  .footer-title {
    color: gold;
    font-size: 1.3rem;
    font-family: 'Amiri', serif;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
  }
  
  .footer-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 0;
    width: 40px;
    height: 2px;
    background: gold;
    border-radius: 2px;
    animation: titleLine 3s infinite;
  }
  
  @keyframes titleLine {
    0%, 100% { width: 40px; opacity: 0.8; }
    50% { width: 70px; opacity: 1; }
  }
  
  /* روابط سريعة */
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .footer-links li a {
    color: #ccc;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    padding-right: 15px;
  }
  
  .footer-links li a::before {
    content: '•';
    color: gold;
    position: absolute;
    right: 0;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  
  .footer-links li a:hover {
    color: gold;
    transform: translateX(-5px);
  }
  
  .footer-links li a:hover::before {
    opacity: 1;
    transform: translateX(0);
  }
  
  /* أيقونات التواصل */
  .social-links {
    display: flex;
    gap: 20px;
    margin-top: 10px;
  }
  
  .social-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 215, 0, 0.05);
    border: 1px solid rgba(255, 215, 0, 0.2);
    border-radius: 50%;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .social-icon svg {
    width: 24px;
    height: 24px;
    fill: gold;
    transition: all 0.3s ease;
    z-index: 2;
    position: relative;
  }
  
  .social-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  .social-icon:hover {
    transform: translateY(-5px);
    border-color: gold;
    background: rgba(255, 215, 0, 0.1);
    box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
  }
  
  .social-icon:hover svg {
    transform: scale(1.1);
    fill: #ffd700;
  }
  
  .social-icon:hover .social-glow {
    opacity: 1;
    animation: rotateGlow 4s linear infinite;
  }
  
  @keyframes rotateGlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* خط فاصل */
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, gold, transparent);
    margin: 30px 0 20px;
    width: 0;
  }
  
  [data-aos="width"].aos-animate {
    animation: expandWidth 1.2s ease-out forwards;
  }
  
  @keyframes expandWidth {
    from { width: 0; }
    to { width: 100%; }
  }
  
  /* حقوق النشر */
  .copyright {
    text-align: center;
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .copyright p {
    margin: 5px 0;
  }
  
  .copyright-heart span {
    color: #e74c3c;
    display: inline-block;
    animation: heartbeat 1.5s ease infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
    75% { transform: scale(1.2); }
  }
  
  /* استجابة */
  @media (max-width: 992px) {
    .footer-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
  
    .footer-description {
      max-width: 100%;
    }
  
    .footer-title::after {
      right: 50%;
      transform: translateX(50%);
    }
  
    .footer-links {
      align-items: center;
    }
  
    .footer-links li a {
      padding-right: 0;
    }
  
    .footer-links li a::before {
      display: none;
    }
  
    .social-links {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .footer {
      padding: 40px 15px 20px;
    }
  
    .social-icon {
      width: 45px;
      height: 45px;
    }
  
    .social-icon svg {
      width: 20px;
      height: 20px;
    }
  }
  
  /* تأثيرات AOS */
  [data-aos="fade-up"] {
    opacity: 0;
    transform: translateY(30px);
    transition-property: opacity, transform;
  }
  
  [data-aos="fade-up"].aos-animate {
    opacity: 1;
    transform: translateY(0);
  }
  </style>