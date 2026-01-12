// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🤖 Waguri Bot', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%c🚀 Sitio web inicializado', 'color: #10b981;');
    
    // Inicializar todas las funciones
    initLoader();
    initNavbar();
    initScrollSpy();
    initBackToTop();
    initCurrentYear();
    initAnimations();
    initHoverEffects();
    initCounterAnimation();
    initToastSystem();
    initThemeToggle();
    initPageAnalytics();
    
    // Mostrar mensaje de bienvenida después de 1.5 segundos
    setTimeout(() => {
        showToast('🎉 ¡Bienvenido a Waguri Bot!', 'info');
    }, 1500);
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Ocultar loader cuando la página esté cargada
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            
            // Eliminar completamente después de la animación
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }, 800);
    });
    
    // Fallback: Ocultar después de 3 segundos máximo
    setTimeout(() => {
        if (loader.parentNode) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }
    }, 3000);
}

// ===== NAVBAR RESPONSIVE =====
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle del menú móvil
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        
        // Cambiar ícono
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
            this.style.transform = 'rotate(90deg)';
        } else {
            icon.className = 'fas fa-bars';
            this.style.transform = 'rotate(0deg)';
        }
        
        // Efecto de pulsación
        this.style.transform += ' scale(0.9)';
        setTimeout(() => {
            this.style.transform = this.style.transform.replace(' scale(0.9)', '');
        }, 200);
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
            navToggle.style.transform = 'rotate(0deg)';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
            navToggle.style.transform = 'rotate(0deg)';
        }
    });
    
    // Efecto de scroll en navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SCROLL SPY =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Actualizar enlaces activos
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Mostrar/ocultar botón
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll suave al hacer clic
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Efecto visual
        backToTopBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            backToTopBtn.style.transform = '';
        }, 200);
        
        // Scroll suave
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== AÑO ACTUAL =====
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase de animación
                entry.target.classList.add('animate-in');
                
                // Contadores para números
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos
    document.querySelectorAll('.stat-card, .community-card, .developer-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// ===== EFECTOS HOVER =====
function initHoverEffects() {
    // Efecto en tarjetas
    const cards = document.querySelectorAll('.stat-card, .community-card, .developer-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            
            // Agregar efecto de brillo
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shine 1s;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(shine);
            
            // Eliminar después de la animación
            setTimeout(() => {
                if (shine.parentNode) shine.remove();
            }, 1000);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // Efecto en botones
    document.querySelectorAll('.btn, .social-btn, .social-link').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('click', function(e) {
            // Efecto de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Si es enlace externo, registrar en analytics
            if (this.href && this.target === '_blank') {
                logExternalLink(this.href);
            }
        });
    });
}

// ===== ANIMACIÓN DE CONTADORES =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace('+', ''));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// ===== SISTEMA DE TOAST =====
function initToastSystem() {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Agregar estilos CSS para toasts
    const style = document.createElement('style');
    style.textContent = `
        .waguri-toast {
            padding: 16px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(150%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 350px;
            border-left: 4px solid #6366f1;
        }
        
        .waguri-toast.show {
            transform: translateX(0);
        }
        
        .waguri-toast.success {
            border-left-color: #10b981;
        }
        
        .waguri-toast.error {
            border-left-color: #ef4444;
        }
        
        .waguri-toast.warning {
            border-left-color: #f59e0b;
        }
        
        .waguri-toast.info {
            border-left-color: #6366f1;
        }
        
        .toast-icon {
            font-size: 1.3rem;
        }
        
        .toast-success .toast-icon { color: #10b981; }
        .toast-error .toast-icon { color: #ef4444; }
        .toast-warning .toast-icon { color: #f59e0b; }
        .toast-info .toast-icon { color: #6366f1; }
        
        .toast-content {
            flex: 1;
            font-weight: 500;
            color: #2d3748;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            font-size: 1rem;
            padding: 4px;
            transition: color 0.2s;
            border-radius: 4px;
        }
        
        .toast-close:hover {
            color: #2d3748;
            background: rgba(0,0,0,0.05);
        }
    `;
    document.head.appendChild(style);
}

function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `waguri-toast ${type}`;
    
    // Icono según tipo
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas fa-${icons[type] || 'info-circle'} toast-icon"></i>
        <div class="toast-content">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Mostrar con animación
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Configurar botón cerrar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
    });
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }
    }, 5000);
    
    return toast;
}

// ===== TOGGLE DE TEMA =====
function initThemeToggle() {
    // Crear botón de tema si no existe
    let themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) {
        themeBtn = document.createElement('button');
        themeBtn.id = 'themeToggle';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeBtn.title = 'Cambiar tema';
        themeBtn.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 99;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(themeBtn);
    }
    
    themeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        this.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
        
        // Guardar preferencia
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Mostrar feedback
        showToast(`Tema ${isDark ? 'oscuro' : 'claro'} activado`, 'info');
        
        // Efecto de clic
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Agregar estilos para tema oscuro
    const darkThemeStyles = `
        body.dark-theme {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e2e8f0;
        }
        
        body.dark-theme .navbar {
            background: rgba(15, 23, 42, 0.95);
        }
        
        body.dark-theme .stat-card,
        body.dark-theme .community-card,
        body.dark-theme .developer-card {
            background: rgba(30, 41, 59, 0.9);
            border-color: rgba(99, 102, 241, 0.2);
            color: #e2e8f0;
        }
        
        body.dark-theme .hero-title,
        body.dark-theme .section-title,
        body.dark-theme .card-title,
        body.dark-theme .dev-name {
            color: #f1f5f9;
        }
        
        body.dark-theme .hero-subtitle,
        body.dark-theme .section-subtitle,
        body.dark-theme .card-description,
        body.dark-theme .dev-description,
        body.dark-theme .stat-label {
            color: #94a3b8;
        }
        
        body.dark-theme .footer {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        ::-webkit-scrollbar-track {
            background: #1e293b;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'dark-theme-styles';
    style.textContent = darkThemeStyles;
    document.head.appendChild(style);
}

// ===== ANALYTICS SIMPLE =====
function initPageAnalytics() {
    // Registrar visita
    console.log('📊 Página visitada:', window.location.href);
    
    // Registrar clics en enlaces externos
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.target === '_blank') {
            logExternalLink(link.href);
        }
    });
    
    // Detectar conexión
    window.addEventListener('online', () => {
        showToast('✅ Conexión restablecida', 'success');
    });
    
    window.addEventListener('offline', () => {
        showToast('⚠️ Sin conexión a internet', 'warning');
    });
}

function logExternalLink(url) {
    console.log('🔗 Enlace externo clickeado:', url);
    // Aquí podrías agregar Google Analytics o similar
    // gtag('event', 'click', { 'event_category': 'outbound', 'event_label': url });
}

// ===== RIPPLE EFFECT =====
document.addEventListener('click', function(e) {
    // Crear efecto de onda en botones
    if (e.target.closest('.btn, .social-btn, .social-link')) {
        const button = e.target.closest('.btn, .social-btn, .social-link');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Agregar animación ripple al CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== CONFETTI EFFECT (Para momentos especiales) =====
function launchConfetti() {
    const confettiCount = 100;
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-ra