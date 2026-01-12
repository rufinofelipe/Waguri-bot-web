// js/script.js

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Waguri Bot - Sitio web cargado');

    // Inicializar todas las funciones
    initLoader();
    initNavbar();
    initBackToTop();
    initCurrentYear();
    initScrollSpy();
    initAnimations();
    initCardsHover();
    initSocialButtons();
    initToastSystem();

    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showToast('¡Bienvenido a Waguri Bot! 🤖', 'success');
    }, 1500);
});

// ===== LOADER =====
function initLoader() {
    // Ocultar loader después de cargar la página
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.add('loaded');
            // Eliminar loader del DOM después de la animación
            setTimeout(() => {
                const loader = document.querySelector('.loader');
                if (loader) loader.remove();
            }, 500);
        }, 500);
    });
}

// ===== NAVEGACIÓN RESPONSIVE =====
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';

        // Agregar efecto de click
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Cerrar menú al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// ===== BOTÓN VOLVER ARRIBA =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Mostrar/ocultar botón al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll suave al hacer clic
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Efecto de click
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

// ===== AÑO ACTUAL EN FOOTER =====
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== SCROLL SPY PARA NAVEGACIÓN =====
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== ANIMACIONES AL SCROLL =====
function initAnimations() {
    // Crear observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Efecto escalonado para tarjetas
                if (entry.target.classList.contains('stat-card') || 
                    entry.target.classList.contains('community-card') ||
                    entry.target.classList.contains('developer-card')) {

                    // Agregar delay basado en posición
                    const cards = entry.target.parentElement.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.stat-card, .community-card, .developer-card, .section-header, .hero-content, .hero-image'
    );

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Agregar estilos CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== EFECTOS HOVER EN TARJETAS =====
function initCardsHover() {
    const cards = document.querySelectorAll('.stat-card, .community-card, .developer-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Elevar tarjeta
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';

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
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(shine);

            // Eliminar efecto después de animación
            setTimeout(() => {
                if (shine.parentNode) {
                    shine.remove();
                }
            }, 1000);
        });

        card.addEventListener('mouseleave', function() {
            // Restaurar estado
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Agregar keyframes para brillo
    const shineStyle = document.createElement('style');
    shineStyle.textContent = `
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(shineStyle);
}

// ===== EFECTOS EN BOTONES SOCIALES =====
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn, .social-link, .btn');

    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Evitar comportamiento por defecto si es un botón
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
            }

            // Efecto de pulsación
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Sonido de clic (opcional)
            playClickSound();

            // Si es un enlace externo, registrar en consola
            if (this.href && this.target === '_blank') {
                console.log(`🔗 Enlace externo: ${this.href}`);
            }
        });

        // Efecto hover
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-3px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ===== SISTEMA DE TOAST =====
function initToastSystem() {
    // Estilos para toast
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        .waguri-toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid #6366f1;
            max-width: 350px;
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
        
        .toast-icon {
            font-size: 1.2rem;
        }
        
        .toast-success .toast-icon {
            color: #10b981;
        }
        
        .toast-error .toast-icon {
            color: #ef4444;
        }
        
        .toast-content {
            flex: 1;
            font-weight: 500;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            font-size: 1rem;
            padding: 0.25rem;
            transition: color 0.2s;
        }
        
        .toast-close:hover {
            color: #1e293b;
        }
        
        @keyframes toastIn {
            from {
                transform: translateX(150%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(toastStyle);
}

// Función para mostrar toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `waguri-toast ${type}`;

    // Icono según tipo
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';

    toast.innerHTML = `
        <i class="fas fa-${icon} toast-icon"></i>
        <div class="toast-content">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Mostrar con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Configurar botón cerrar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    });

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);

    return toast;
}

// ===== EFECTO DE SONIDO (OPCIONAL) =====
function playClickSound() {
    // Solo crear sonido si el usuario ya ha interactuado
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Fallback silencioso si no hay soporte de audio
        console.log('🔊 Efecto de sonido (simulado)');
    }
}

// ===== CONTADOR DE ESTADÍSTICAS =====
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toString();
        }, 16);
    });
}

// Iniciar contadores cuando son visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initCounterAnimation();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar sección de estadísticas
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== COPIA ENLACES AL PORTAPAPELES =====
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Mostrar confirmación
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                this.style.background = '#10b981';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);

                showToast('Enlace copiado al portapapeles! 📋', 'success');
            }).catch(err => {
                console.error('Error al copiar:', err);
                showToast('Error al copiar', 'error');
            });
        });
    });
}

// Llamar función si hay botones de copia
if (document.querySelector('[data-copy]')) {
    initCopyToClipboard();
}

// ===== MODO OSCURO/CLARO (OPCIONAL) =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Cambiar tema';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #6366f1;
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        showToast(`Tema ${isDark ? 'oscuro' : 'claro'} activado`, 'info');
    });

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    document.body.appendChild(themeToggle);
}

// Descomentar si quieres el botón de cambio de tema:
// initThemeToggle();

// ===== CONSOLA PERSONALIZADA =====
console.log('%c🤖 Waguri Bot', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cDesarrollado por Rufino ✝️, DuarteXV y Ander', 'color: #64748b;');
console.log('%c¡Gracias por visitar nuestro sitio!', 'color: #10b981;');

// ===== MANEJADOR DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('⚠️ Error en la página:', e.error);
    showToast('Ocurrió un error inesperado', 'error');
});

// ===== OFFLINE DETECTION =====
window.addEventListener('offline', function() {
    showToast('⚠️ Sin conexión a internet', 'warning');
});

window.addEventListener('online', function() {
    showToast('✅ Conexión restablecida', 'success');
});
