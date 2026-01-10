// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Waguri Bot - Página cargada');
    
    // Inicializar todas las funcionalidades
    initNavbar();
    initAnimations();
    initCurrentYear();
    initScrollSpy();
    initCardsHover();
    initSocialLinks();
    initPageLoader();
});

// Navegación responsive
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animación específica para tarjetas
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('community-card') ||
                    entry.target.classList.contains('developer-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay || '0'}s`;
                    entry.target.classList.add('animated');
                }
            }
        });
    }, observerOptions);
    
    // Elementos a observar
    const animatedElements = document.querySelectorAll(
        '.feature-card, .community-card, .developer-card, .section-header'
    );
    
    animatedElements.forEach((element, index) => {
        element.dataset.delay = (index * 0.1).toFixed(1);
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
        
        .feature-card.animated,
        .community-card.animated,
        .developer-card.animated {
            animation: cardReveal 0.8s ease forwards;
        }
        
        @keyframes cardReveal {
            0% {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Actualizar año actual
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Scroll Spy para navegación
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
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

// Efectos hover en tarjetas
function initCardsHover() {
    const cards = document.querySelectorAll('.feature-card, .community-card, .developer-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const allCards = document.querySelectorAll('.feature-card, .community-card, .developer-card');
            allCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.filter = 'blur(2px)';
                    otherCard.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const allCards = document.querySelectorAll('.feature-card, .community-card, .developer-card');
            allCards.forEach(otherCard => {
                otherCard.style.filter = '';
                otherCard.style.transform = '';
            });
        });
    });
}

// Efectos en enlaces sociales
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link, .social-icon');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Efecto de onda
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Agregar estilos para ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Cargador de página
function initPageLoader() {
    // Simular carga de página
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Agregar clase loaded al body
    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyle);
}

// Notificación toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos del toast
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--primary);
            max-width: 400px;
        }
        
        .toast-success {
            border-left-color: var(--secondary);
        }
        
        .toast-error {
            border-left-color: #ef4444;
        }
        
        .toast.show {
            transform: translateX(0);
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
        }
        
        .toast-content i {
            font-size: 1.2rem;
        }
        
        .toast-success .toast-content i {
            color: var(--secondary);
        }
        
        .toast-error .toast-content i {
            color: #ef4444;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: var(--gray);
            cursor: pointer;
            font-size: 1rem;
            padding: 0.25rem;
            transition: color 0.2s;
        }
        
        .toast-close:hover {
            color: var(--dark);
        }
    `;
    
    if (!document.querySelector('#toast-style')) {
        toastStyle.id = 'toast-style';
        document.head.appendChild(toastStyle);
    }
    
    document.body.appendChild(toast);
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Botón cerrar
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto cerrar después de 5 segundos
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

// Ejemplo de uso de toast:
// showToast('¡Bienvenido a Waguri Bot!', 'success');

// Manejo de clics en enlaces externos
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && link.target === '_blank') {
        console.log(`🌐 Enlace externo clickeado: ${link.href}`);
        // Aquí podrías agregar tracking de analytics
    }
});

// Efecto de partículas (opcional)
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    const particlesStyle = document.createElement('style');
    particlesStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
    `;
    
    document.head.appendChild(particlesStyle);
    document.body.appendChild(particlesContainer);
}

// Descomentar si quieres partículas
// initParticles();