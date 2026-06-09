// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

class I18n {
    constructor() {
        this.languages = ['en', 'ar', 'id'];
        this.defaultLanguage = 'en';
        this.currentLanguage = this.loadLanguage();
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage();
    }

    loadLanguage() {
        // Check localStorage for saved language preference
        const saved = localStorage.getItem('timelessScentLanguage');
        if (saved && this.languages.includes(saved)) {
            return saved;
        }

        // Detect from browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.languages.includes(browserLang)) {
            return browserLang;
        }

        return this.defaultLanguage;
    }

    async loadTranslations() {
        try {
            const response = await fetch('./data/translations.json?v=' + Date.now());
            if (response.ok) {
                this.translations = await response.json();
            }
        } catch (error) {
            console.warn('Failed to load translations:', error);
            this.translations = {};
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage] || {};

        for (const k of keys) {
            value = value[k];
            if (!value) return key; // Return key if translation not found
        }

        return value || key;
    }

    setLanguage(lang) {
        if (!this.languages.includes(lang)) return;

        this.currentLanguage = lang;
        localStorage.setItem('timelessScentLanguage', lang);
        this.applyLanguage();
    }

    getLanguage() {
        return this.currentLanguage;
    }

    isRTL() {
        return this.currentLanguage === 'ar';
    }

    applyLanguage() {
        // Set HTML attributes
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = this.isRTL() ? 'rtl' : 'ltr';

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translated = this.t(key);

            // Handle different element types
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.getAttribute('placeholder') !== null) {
                    el.placeholder = translated;
                } else {
                    el.value = translated;
                }
            } else if (el.tagName === 'BUTTON' || el.tagName === 'A') {
                el.textContent = translated;
            } else {
                el.textContent = translated;
            }
        });

        // Update language selector buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLanguage) {
                btn.classList.add('active');
            }
        });

        // Trigger custom event for page updates
        window.dispatchEvent(new Event('languageChanged'));
    }
}

// Initialize i18n on page load
const i18n = new I18n();

// Set up language switcher buttons
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');

    // Create dropdown if we have multiple buttons
    if (langBtns.length > 0) {
        const langSelector = document.querySelector('.language-selector');

        // Hide original buttons
        langBtns.forEach(btn => btn.style.display = 'none');

        // Create dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown';

        // Create dropdown button
        const dropdownBtn = document.createElement('button');
        dropdownBtn.className = 'lang-dropdown-btn';
        const currentLangName = {
            'en': 'English',
            'ar': 'العربية',
            'id': 'Indonesia'
        };
        dropdownBtn.textContent = currentLangName[i18n.currentLanguage] + ' ▼';

        // Create dropdown menu
        const menu = document.createElement('div');
        menu.className = 'lang-dropdown-menu';

        langBtns.forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            const btnCopy = document.createElement('button');
            btnCopy.textContent = currentLangName[lang];
            btnCopy.setAttribute('data-lang', lang);

            btnCopy.addEventListener('click', () => {
                i18n.setLanguage(lang);
                dropdownBtn.textContent = currentLangName[lang] + ' ▼';
                menu.classList.remove('active');
            });

            menu.appendChild(btnCopy);
        });

        // Toggle menu
        dropdownBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
            }
        });

        dropdown.appendChild(dropdownBtn);
        dropdown.appendChild(menu);

        // Replace original buttons with dropdown
        langSelector.innerHTML = '';
        langSelector.appendChild(dropdown);
    }

    // Set initial active state
    i18n.applyLanguage();
});
