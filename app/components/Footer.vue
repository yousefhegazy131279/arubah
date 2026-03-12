    <template>
        <footer class="footer">
        <div class="social">
            <!-- أيقونات SVG ذهبي -->
            <a href="https://www.facebook.com/arubaharabia" target="_blank" class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" width="30" height="30">
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 17 22 12z"/>
            </svg>
            </a>
    
            <a href="https://www.instagram.com/arubaharabia" target="_blank" class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" width="30" height="30">
                <path d="M7.75 2h8.5C19.097 2 21 3.903 21 6.25v11.5C21 20.097 19.097 22 16.25 22h-8.5C4.903 22 3 20.097 3 17.75V6.25C3 3.903 4.903 2 7.75 2zm0 1.5C5.955 3.5 4.5 4.955 4.5 6.75v10.5c0 1.795 1.455 3.25 3.25 3.25h8.5c1.795 0 3.25-1.455 3.25-3.25V6.75c0-1.795-1.455-3.25-3.25-3.25h-8.5zm4.25 3.25a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
            </svg>
            </a>
        </div>
    
        <div class="copyright">
            © عُروبة 2026
        </div>
        </footer>
    </template>
    
    <script setup>
    </script>
    
    <style scoped>
    .footer {
        background: #050814;
        color: gold;
        text-align: center;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    
    .footer .social {
        display: flex;
        gap: 20px; /* المسافة بين الفيس والانستجرام */
    }
    
    .footer .social svg {
        transition: transform 0.3s, filter 0.3s;
        cursor: pointer;
    }
    
    /* Hover effect على الايقونات */
    .footer .social svg:hover {
        transform: scale(1.2);
        filter: drop-shadow(0 0 5px gold);
    }
    
    .footer .copyright {
        font-size: 14px;
        margin-top: 5px;
    }
    .footer { background: #050814; color: gold; text-align: center; padding: 20px 0; display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .footer .social { display: flex; gap: 20px; }
    .footer .social svg { transition: transform 0.3s, filter 0.3s; cursor: pointer; }
    .footer .social svg:hover { transform: scale(1.2); filter: drop-shadow(0 0 5px gold); }
    .footer .copyright { font-size: 14px; margin-top: 5px; }

    /* Responsive Footer */
    @media (max-width: 768px) { .footer .social { gap: 10px; } }
    </style>