// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Waguri Bot iniciado');
    
    // Inicializar funcionalidades
    initLoader();
    initNavbar();
    initBackToTop();
    initCurrentYear();
    initScrollSpy();
    initAnimations();
    initHoverEffects();
    initCounterAnimation();
    
    // Mensaje de bienvenida
    setTimeout(() => {
        showNotification('🎉 ¡Bienvenido a Waguri Bot!', 'success');
    }, 1000);
});

// LOADER
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
}

// NAVBAR RESPONSIVE
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// BACK TO TOP
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;
    
    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('show', window.scrollY > 300);
    });
    
    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// AÑO ACTUAL
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// SCROLL SPY
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
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

// ANIMACIONES
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.stat-card, .community-card, .developer-card').forEach(el => {
        observer.observe(el);
    });
}

// EFECTOS HOVER
function initHoverEffects() {
    // Efecto en tarjetas
    document.querySelectorAll('.stat-card, .community-card, .developer-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto en botones
    document.querySelectorAll('.btn, .social-link, .social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Si es enlace externo, registrar
            if (this.href && this.target === '_blank') {
                console.log(`🔗 Enlace externo: ${this.href}`);
            }
            
            // Efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ANIMACIÓN CONTADORES
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                const speed = 2000 / target;
                
                const updateCount = () => {
                    if (count < target) {
                        count++;
                        counter.textContent = count;
                        setTimeout(updateCount, speed);
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// NOTIFICACIÓN
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content ${type}">
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar estilos
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-content {
                padding: 1rem 1.5rem;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                border-left: 4px solid #6366f1;
                font-weight: 500;
            }
            
            .notification-content.success {
                border-left-color: #10b981;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-eliminar
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// DETECTAR ENLACES EXTERNOS
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        console.log('🌐 Abriendo enlace externo:', link.href);
    }
});

// EFECTO RIPPLE EN BOTONES
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .social-btn')) {
        const button = e.target.closest('.btn, .social-btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
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

// Agregar animación ripple
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

// CONFETTI PARA EASTER EGG
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiInput = [];

document.addEventListener('keydown', (e) => {
    konamiInput.push(e.key);
    konamiInput = konamiInput.slice(-konamiCode.length);
    
    if (konamiInput.join() === konamiCode.join()) {
        launchConfetti();
        showNotification('🎮 ¡Código Konami activado!', 'success');
        konamiInput = [];
    }
});

function launchConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: fall ${Math.random() * 2 + 1}s linear forwards;
            z-index: 9999;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    const fallStyle = document.createElement('style');
    fallStyle.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fallStyle);
}