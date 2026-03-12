<template>
    <div class="about-page">
      <Navbar />
  
      <header class="about-hero">
        <div class="container">
          <h1 class="fade-in">عن مروع عُروبة</h1>
          <p class="tagline">جسرك العربي إلى الأدب العالمي</p>
        </div>
      </header>
  
      <section class="content-section">
        <div class="container">
          <div class="about-grid">
            <div class="about-card">
              <h2 class="golden-text">حكايتنا</h2>
              <p>
                وُلدت فكرة "عُروبة" من حبنا للروايات العالمية وشعورنا بأن اللغة العربية تمتلك سحراً خاصاً يمكنه أن يضفي أبعاداً جديدة على تلك القصص. نحن فريق من المترجمين والقراء الذين آمنوا بأن "لغة الضاد" قادرة على احتواء كل ثقافات العالم.
              </p>
            </div>
  
            <div class="about-card highlight">
              <h2 class="golden-text">رؤيتنا</h2>
              <p>
                أن نصبح المنصة الأولى لكل قارئ عربي يبحث عن الجودة والدقة في الترجمة، مع الحفاظ على روح النص الأصلي وجماليات البيان العربي.
              </p>
            </div>
          </div>
  
          <div class="mission-bar">
            <h2 class="golden-text">لماذا عُروبة؟</h2>
            <div class="features">
              <div class="feature-item">
                <span class="icon">📜</span>
                <h3>ترجمة فنية</h3>
                <p>لا نترجم الكلمات، بل ننقل الأحاسيس والثقافة.</p>
              </div>
              <div class="feature-item">
                <span class="icon">💎</span>
                <h3>انتقاء خاص</h3>
                <p>نختار القصص التي تركت بصمة في التاريخ البشري.</p>
              </div>
              <div class="feature-item">
                <span class="icon">🤝</span>
                <h3>تفاعلية</h3>
                <p>الجمهور هو من يوجهنا لما يحب قراءته.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <Footer />
    </div>
  </template>
  
  <style scoped>
  .about-page {
    min-height: 100vh;
    background: #050814;
    color: #fff;
    direction: rtl;
  }
  
  /* Hero Section */
  .about-hero {
    padding: 100px 20px;
    background: linear-gradient(rgba(5, 8, 20, 0.8), rgba(5, 8, 20, 0.8)), 
                url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
    background-size: cover;
    background-position: center;
    text-align: center;
    border-bottom: 2px solid gold;
  }
  
  .about-hero h1 {
    font-size: 3.5rem;
    color: gold;
    font-family: 'Amiri', serif;
  }
  
  .tagline {
    font-size: 1.5rem;
    color: #ccc;
    margin-top: 10px;
  }
  
  /* Content Sections */
  .content-section {
    padding: 80px 20px;
  }
  
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 80px;
  }
  
  .about-card {
    background: rgba(255, 255, 255, 0.03);
    padding: 40px;
    border-radius: 20px;
    border-right: 5px solid gold;
    line-height: 1.8;
    font-size: 1.1rem;
  }
  
  .about-card.highlight {
    background: rgba(255, 215, 0, 0.05);
  }
  
  .golden-text {
    color: gold;
    margin-bottom: 20px;
    font-family: 'Amiri', serif;
  }
  
  /* Features Bar */
  .mission-bar {
    text-align: center;
    background: rgba(255, 255, 255, 0.02);
    padding: 60px;
    border-radius: 30px;
  }
  
  .features {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
    gap: 20px;
  }
  
  .feature-item {
    flex: 1;
  }
  
  .feature-item .icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 15px;
  }
  
  .feature-item h3 {
    color: gold;
    margin-bottom: 10px;
  }
  
  .feature-item p {
    font-size: 0.9rem;
    color: #aaa;
  }
  
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; }
    .features { flex-direction: column; gap: 40px; }
  }
  
  /* Animations */
  .fade-in {
    animation: fadeIn 1.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>