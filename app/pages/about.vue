<template>
  <div class="about-page">
    <Navbar />

    <!-- قسم البطل (Hero) -->
    <header class="about-hero">
      <!-- خلفية متحركة -->
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content" data-aos="fade-up" data-aos-duration="1200">
          <h1 class="hero-title">
            <span class="title-word">عن</span>
            <span class="title-word gold">عُروبة</span>
          </h1>
          <p class="hero-subtitle">جسرك العربي إلى الأدب العالمي</p>
          <div class="hero-decoration">
            <span class="decoration-line"></span>
            <span class="decoration-star">✨</span>
            <span class="decoration-line"></span>
          </div>
        </div>
      </div>

      <!-- عناصر زخرفية إضافية -->
      <div class="floating-shapes">
        <span class="shape shape-1">📚</span>
        <span class="shape shape-2">🌍</span>
        <span class="shape shape-3">✍️</span>
        <span class="shape shape-4">💫</span>
      </div>
    </header>

    <!-- قسم المحتوى الرئيسي -->
    <section class="content-section">
      <div class="container">
        <!-- صورة المؤسس والنبذة الشخصية -->
        <div class="founder-section" data-aos="fade-up" data-aos-duration="1000">
          <div class="founder-image-wrapper">
            <img src="/founder.png" alt="مؤسس عُروبة" class="founder-image" />
            <div class="image-glow"></div>
            <div class="image-frame"></div>
          </div>
          <div class="founder-quote">
            <span class="quote-icon">❝</span>
            <p>مؤمن بأن الأدب العربي من أجمل ما كُتب، وأن لغتنا قادرة على حمل أعظم الحكايات.</p>
            <span class="quote-author">- يوسف حجازي </span>
          </div>
        </div>

        <!-- شبكة البطاقات (حكايتنا + رؤيتنا) -->
        <div class="about-grid">
          <div class="about-card" data-aos="fade-left" data-aos-delay="200">
            <h2 class="golden-text">📖 حكايتنا</h2>
            <p>
              أنا مؤمن بأن الأدب العربي من أجمل ما كُتب في تاريخ اللغات، وأن اللغة العربية قادرة على حمل أعظم الحكايات وأعمق المشاعر. ومن هنا وُلدت فكرة عُروبة.
            </p>
            <p>
              أنشأت هذا المشروع لأنني لاحظت أن كثيرًا من القرّاء العرب لا يستطيعون الوصول إلى العديد من الروايات والقصص العالمية بسبب حاجز اللغة، فبقيت أعمال أدبية عظيمة بعيدة عنهم. لذلك جاءت عُروبة محاولةً لتقريب تلك الحكايات إلى القارئ العربي، عبر تعريبها وصياغتها بأسلوب عربي فصيح يحافظ على روح القصة الأصلية ويجعلها تبدو وكأنها كُتبت بالعربية منذ البداية.
            </p>
            <p>
              لا يهدف هذا المشروع إلى مجرد نقل القصص من لغة إلى أخرى، بل إلى تقديمها بروحٍ أدبية عربية أصيلة، بحيث يستطيع القارئ العربي الاستمتاع بأجمل الروايات العالمية بلغته الأم.
            </p>
          </div>

          <div class="about-card highlight" data-aos="fade-right" data-aos-delay="300">
            <h2 class="golden-text">🔮 رؤيتنا</h2>
            <p>
              رؤيتي أن تتوسع عُروبة يومًا بعد يوم لتشمل أكبر قدر ممكن من الأعمال القصصية العالمية، وأن تصل هذه الحكايات إلى كل بيت عربي. فالأدب ليس مجرد وسيلة للمتعة، بل هو أيضًا طريق لنشر الثقافة، وإحياء الشغف بالقراءة، وإيصال قصص تستحق أن تُروى.
            </p>
            <div class="vision-stats">
              <div class="stat-item">
                <span class="stat-number">10+</span>
                <span class="stat-label">رواية مُعربة</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">1000+</span>
                <span class="stat-label">قارئ</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">20+</span>
                <span class="stat-label">عمل أصلي</span>
              </div>
            </div>
          </div>
        </div>

        <!-- قسم الميزات / لماذا عُروبة؟ -->
        <div class="mission-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <h2 class="section-title"><span>لماذا</span> <span class="gold">عُروبة</span><span>؟</span></h2>
          <div class="features-grid">
            <div class="feature-card" data-aos="zoom-in" data-aos-delay="500">
              <div class="feature-icon">📜</div>
              <h3>تعريب فني</h3>
              <p>لا نترجم الكلمات، بل ننقل الأحاسيس والثقافة.</p>
            </div>
            <div class="feature-card" data-aos="zoom-in" data-aos-delay="600">
              <div class="feature-icon">💎</div>
              <h3>انتقاء خاص</h3>
              <p>نختار القصص التي تركت بصمة في التاريخ البشري.</p>
            </div>
            <div class="feature-card" data-aos="zoom-in" data-aos-delay="700">
              <div class="feature-icon">🤝</div>
              <h3>تفاعلية</h3>
              <p>الجمهور هو من يوجهنا لما يحب قراءته.</p>
            </div>
            <div class="feature-card" data-aos="zoom-in" data-aos-delay="800">
              <div class="feature-icon">🌟</div>
              <h3>جودة عالية</h3>
              <p>نخبة من المترجمين لضمان أفضل نص عربي.</p>
            </div>
          </div>
        </div>

        <!-- قسم القيم -->
        <div class="values-section" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
          <h2 class="section-title"><span>قيمنا</span></h2>
          <div class="values-container">
            <div class="value-item" data-aos="flip-left" data-aos-delay="1000">
              <span class="value-icon">❤️</span>
              <h4>الشغف</h4>
            </div>
            <div class="value-item" data-aos="flip-left" data-aos-delay="1100">
              <span class="value-icon">📖</span>
              <h4>الأصالة</h4>
            </div>
            <div class="value-item" data-aos="flip-left" data-aos-delay="1200">
              <span class="value-icon">🌍</span>
              <h4>الانفتاح</h4>
            </div>
            <div class="value-item" data-aos="flip-left" data-aos-delay="1300">
              <span class="value-icon">🤲</span>
              <h4>المشاركة</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
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
    offset: 50,
  })
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: #050814;
  color: white;
  direction: rtl;
  overflow-x: hidden;
}

/* ===== الخلفية المتحركة (مطابقة لبقية الموقع) ===== */
.hero-background {
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
  opacity: 0.4;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3), rgba(255,215,0,0.1));
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle at 70% 70%, rgba(255,215,0,0.2), rgba(255,165,0,0.1));
  bottom: -150px;
  left: -150px;
  animation-delay: -5s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at 50% 50%, rgba(255,215,0,0.25), transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 8s infinite;
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255,215,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, 50px) scale(1.1); }
  50% { transform: translate(0, 100px) scale(1); }
  75% { transform: translate(-50px, 50px) scale(0.9); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* ===== قسم البطل ===== */
.about-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  padding: 60px 20px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-family: 'Amiri', serif;
}

.title-word {
  display: inline-block;
  margin: 0 0.2rem;
  color: white;
}

.title-word.gold {
  background: linear-gradient(135deg, gold, #ffd700, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #aaa;
  margin-bottom: 1.5rem;
}

.hero-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.decoration-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  animation: lineWidth 3s infinite;
}

@keyframes lineWidth {
  0%, 100% { width: 80px; opacity: 0.5; }
  50% { width: 120px; opacity: 1; }
}

.decoration-star {
  color: gold;
  font-size: 1.5rem;
  animation: spinStar 4s linear infinite;
}

@keyframes spinStar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: floatShape 15s infinite linear;
}

.shape-1 { top: 20%; left: 10%; animation-delay: 0s; }
.shape-2 { top: 70%; right: 15%; animation-delay: -5s; }
.shape-3 { bottom: 20%; left: 20%; animation-delay: -10s; }
.shape-4 { top: 40%; right: 30%; animation-delay: -7s; }

@keyframes floatShape {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, 30px) rotate(120deg); }
  66% { transform: translate(-30px, 20px) rotate(240deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

/* ===== قسم المؤسس ===== */
.founder-section {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 80px;
  padding: 40px;
  background: rgba(255,255,255,0.02);
  border-radius: 40px;
  border: 1px solid rgba(255,215,0,0.1);
  backdrop-filter: blur(10px);
}

.founder-image-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.founder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid gold;
  box-shadow: 0 0 30px rgba(255,215,0,0.3);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.founder-image:hover {
  transform: scale(1.05);
}

.image-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle at center, rgba(255,215,0,0.3), transparent 70%);
  border-radius: 50%;
  animation: glowPulse 3s infinite;
  z-index: 1;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

.image-frame {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid gold;
  border-radius: 50%;
  animation: rotateFrame 10s linear infinite;
  border-top-color: transparent;
  border-bottom-color: transparent;
}

@keyframes rotateFrame {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.founder-quote {
  position: relative;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #ddd;
  padding: 0 20px;
}

.quote-icon {
  font-size: 4rem;
  color: gold;
  opacity: 0.3;
  position: absolute;
  top: -20px;
  right: -10px;
}

.quote-author {
  display: block;
  margin-top: 20px;
  color: gold;
  font-size: 1rem;
  text-align: left;
}

/* ===== شبكة البطاقات ===== */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 80px;
}

.about-card {
  background: rgba(255,255,255,0.02);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 30px;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, gold, transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.about-card:hover::before {
  transform: translateX(100%);
}

.about-card:hover {
  transform: translateY(-5px);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.golden-text {
  color: gold;
  font-size: 2rem;
  margin-bottom: 20px;
  font-family: 'Amiri', serif;
  display: flex;
  align-items: center;
  gap: 10px;
}

.about-card p {
  line-height: 1.8;
  color: #ccc;
  margin-bottom: 20px;
}

.vision-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  gap: 15px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: gold;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.8rem;
  color: #aaa;
}

/* ===== قسم الميزات ===== */
.mission-section {
  margin-bottom: 80px;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-family: 'Amiri', serif;
}

.section-title span {
  display: inline-block;
  margin: 0 5px;
}

.section-title .gold {
  background: linear-gradient(135deg, gold, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.feature-card {
  background: rgba(255,255,255,0.02);
  padding: 30px 20px;
  border-radius: 25px;
  border: 1px solid rgba(255,215,0,0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: gold;
  box-shadow: 0 20px 40px rgba(255,215,0,0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.feature-card h3 {
  color: gold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.feature-card p {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ===== قسم القيم ===== */
.values-section {
  margin-bottom: 60px;
}

.values-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.value-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: rgba(255,215,0,0.05);
  padding: 25px 35px;
  border-radius: 50px;
  border: 1px solid rgba(255,215,0,0.2);
  transition: all 0.3s ease;
  min-width: 120px;
}

.value-item:hover {
  transform: scale(1.05);
  border-color: gold;
  background: rgba(255,215,0,0.1);
}

.value-icon {
  font-size: 2rem;
  animation: pulseValue 2s infinite;
}

@keyframes pulseValue {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.value-item h4 {
  color: gold;
  font-size: 1.2rem;
  margin: 0;
}

/* ===== استجابة ===== */
@media (max-width: 992px) {
  .founder-section {
    flex-direction: column;
    text-align: center;
  }

  .founder-quote .quote-author {
    text-align: center;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .values-container {
    gap: 15px;
  }

  .value-item {
    padding: 15px 20px;
    min-width: auto;
  }

  .founder-image-wrapper {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .about-hero {
    min-height: 50vh;
  }

  .hero-title {
    font-size: 2rem;
  }

  .about-card {
    padding: 25px;
  }

  .golden-text {
    font-size: 1.6rem;
  }
}

/* تأثيرات AOS إضافية */
[data-aos="fade-left"] {
  transform: translateX(-30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-left"].aos-animate {
  transform: translateX(0);
  opacity: 1;
}

[data-aos="fade-right"] {
  transform: translateX(30px);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="fade-right"].aos-animate {
  transform: translateX(0);
  opacity: 1;
}

[data-aos="zoom-in"] {
  transform: scale(0.8);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="zoom-in"].aos-animate {
  transform: scale(1);
  opacity: 1;
}

[data-aos="flip-left"] {
  transform: perspective(2500px) rotateY(100deg);
  opacity: 0;
  transition-property: transform, opacity;
}
[data-aos="flip-left"].aos-animate {
  transform: perspective(2500px) rotateY(0);
  opacity: 1;
}
</style>