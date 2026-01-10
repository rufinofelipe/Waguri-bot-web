// script.js

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Waguri Bot - Página cargada correctamente');
    
    // Inicializar funcionalidades
    initSmoothScroll();
    initAnimations();
    initSocialButtons();
    initDeveloperCards();
    
    // Mostrar año actual en el copyright
    updateCopyrightYear();
});

// Scroll suave para los enlaces internos
function initSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.community-card, .footer-section');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Funcionalidades para botones sociales
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-links a, .btn');
    
    socialButtons.forEach(button => {
        // Efecto de click
        button.addEventListener('click', function(e) {
            // Agregar efecto visual
            this.style.transform = 'scale(0.95)';
            
            // Restaurar después de 200ms
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Si es un botón que abre enlace externo, registrar evento
            if (this.href && this.target === '_blank') {
                console.log(`Redirigiendo a: ${this.href}`);
                
                // Aquí podrías agregar tracking de analytics si lo necesitas
                // Por ejemplo: trackOutboundLink(this.href);
            }
        });
        
        // Efecto hover mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
}

// Funcionalidades para las tarjetas de desarrolladores
function initDeveloperCards() {
    const developerItems = document.querySelectorAll('.developers-list li');
    
    developerItems.forEach(item => {
        item.addEventListener('click', function() {
            const developerName = this.querySelector('h4').textContent;
            console.log(`Desarrollador seleccionado: ${developerName}`);
            
            // Efecto visual temporal
            this.style.backgroundColor = 'rgba(114, 137, 218, 0.1)';
            this.style.borderRadius = '8px';
            
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 500);
        });
        
        // Efecto hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Actualizar año del copyright
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2023', currentYear);
    }
}

// Función para rastrear clics en enlaces externos (ejemplo para analytics)
function trackOutboundLink(url) {
    // Esta función es un ejemplo para implementar tracking
    // Deberías reemplazarla con tu código de analytics real
    console.log(`Clic en enlace externo: ${url}`);
    
    // Ejemplo para Google Analytics:
    // gtag('event', 'click', {
    //     'event_category': 'outbound',
    //     'event_label': url,
    //     'transport_type': 'beacon'
    // });
}

// Función para mostrar notificación temporal
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos básicos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#43B581' : type === 'error' ? '#F04747' : '#7289DA'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Botón para cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Función para cambiar el tema claro/oscuro (opcional)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        showNotification('Tema cambiado a claro', 'success');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        showNotification('Tema cambiado a oscuro', 'success');
    }
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Inicializar tema al cargar
loadSavedTheme();

// Agregar botón de cambio de tema (si lo deseas)
// Puedes descomentar esto si quieres agregar un botón de cambio de tema

function addThemeToggleButton() {
    const themeButton = document.createElement('button');
    themeButton.id = 'theme-toggle';
    themeButton.innerHTML = '🌓';
    themeButton.title = 'Cambiar tema';
    themeButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    themeButton.addEventListener('click', toggleTheme);
    document.body.appendChild(themeButton);
}

// Llamar esta función si quieres el botón de tema
// addThemeToggleButton();
*/

// Manejo de errores en imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Error al cargar imagen:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.style.filter = 'grayscale(100%)';
        
        // Mostrar imagen de respaldo si la principal falla
        if (e.target.classList.contains('logo-img') || e.target.classList.contains('bot-image')) {
            e.target.alt = 'Imagen no disponible - Waguri Bot';
        }
    }
}, true);

// Optimización para móviles: prevenir zoom en inputs
document.addEventListener('touchstart', function() {}, {passive: true});

// Mejorar rendimiento en scroll
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    document.body.classList.add('scrolling');
    
    scrollTimeout = setTimeout(function() {
        document.body.classList.remove('scrolling');
    }, 100);
});
