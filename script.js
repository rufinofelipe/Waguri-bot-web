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

// ===== SISTEMA DE ANUNCIOS SIMPLIFICADO =====

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initAnnouncementsSystem();
});

function initAnnouncementsSystem() {
    console.log('🚀 Inicializando sistema de anuncios...');
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar anuncios
    loadAnnouncements();
}

function setupEventListeners() {
    // Botón panel admin
    const adminBtn = document.getElementById('toggleAdminPanel');
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            const password = prompt('🔐 Ingresa la contraseña de administrador:');
            if (password === 'waguri2023') { // Cambia esta contraseña
                const panel = document.getElementById('adminPanel');
                panel.style.display = 'block';
                showMessage('Panel admin activado', 'success');
            } else {
                showMessage('Contraseña incorrecta', 'error');
            }
        });
    }
    
    // Botón publicar anuncio
    const publishBtn = document.getElementById('publishAnnouncement');
    if (publishBtn) {
        publishBtn.addEventListener('click', createAnnouncement);
    }
}

function loadAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    
    // Mostrar loading
    container.innerHTML = '<div class="loading-announcements"><div class="loader-spinner small"></div><p>Cargando anuncios...</p></div>';
    
    // Esperar un momento para simular carga
    setTimeout(() => {
        // Cargar anuncios guardados
        const saved = localStorage.getItem('waguriAnnouncements');
        let announcements = [];
        
        if (saved) {
            announcements = JSON.parse(saved);
        }
        
        // Si no hay anuncios, crear unos de ejemplo
        if (announcements.length === 0) {
            announcements = [
                {
                    id: '1',
                    title: 'Sistema de Niveles RPG',
                    description: 'Los usuarios podrán subir de nivel, desbloquear habilidades y competir en rankings globales.',
                    features: ['Sistema de XP', '5 clases diferentes', 'Misiones diarias', 'Ranking global'],
                    upvotes: 42,
                    downvotes: 8,
                    eta: 'Próximamente',
                    createdAt: new Date().toISOString(),
                    status: 'new'
                },
                {
                    id: '2',
                    title: 'Integración con Spotify',
                    description: 'Reproduce música directamente en tus grupos. Comparte playlists y busca canciones.',
                    features: ['Búsqueda de canciones', 'Compartir playlists', 'Cola de reproducción'],
                    upvotes: 28,
                    downvotes: 12,
                    eta: 'En desarrollo',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    status: 'progress'
                }
            ];
            localStorage.setItem('waguriAnnouncements', JSON.stringify(announcements));
        }
        
        // Mostrar anuncios
        renderAnnouncements(announcements);
    }, 800);
}

function renderAnnouncements(announcements) {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    
    // Cargar votos del usuario
    const userVotes = JSON.parse(localStorage.getItem('waguriVotes')) || {};
    
    if (announcements.length === 0) {
        container.innerHTML = `
            <div class="no-announcements">
                <i class="fas fa-bullhorn"></i>
                <h3>No hay anuncios aún</h3>
                <p>Sé el primero en sugerir una actualización</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por fecha (nuevos primero)
    announcements.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    let html = '';
    
    announcements.forEach(announcement => {
        const totalVotes = announcement.upvotes + announcement.downvotes;
        const positivePercentage = totalVotes > 0 
            ? Math.round((announcement.upvotes / totalVotes) * 100) 
            : 0;
        
        // Badge según estado
        let badgeClass = 'badge-planned';
        let badgeText = 'EN VOTACIÓN';
        
        if (announcement.status === 'new') {
            badgeClass = 'badge-new';
            badgeText = 'NUEVO';
        } else if (announcement.status === 'progress') {
            badgeClass = 'badge-progress';
            badgeText = 'EN DESARROLLO';
        }
        
        // Verificar voto del usuario
        const userVote = userVotes[announcement.id];
        const upActive = userVote === 'up' ? 'active' : '';
        const downActive = userVote === 'down' ? 'active' : '';
        
        html += `
            <div class="announcement-card" data-id="${announcement.id}">
                <div class="announcement-header">
                    <h3 class="announcement-title">${announcement.title}</h3>
                    <div class="announcement-badge">
                        <span class="badge-status ${badgeClass}">${badgeText}</span>
                    </div>
                </div>
                
                <div class="announcement-content">
                    <p>${announcement.description}</p>
                    
                    ${announcement.features && announcement.features.length > 0 ? `
                        <div class="announcement-features">
                            ${announcement.features.map(feature => `
                                <span><i class="fas fa-check"></i> ${feature}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="announcement-footer">
                    <div class="vote-section">
                        <button class="vote-btn vote-up ${upActive}" onclick="handleVote('${announcement.id}', 'up')">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="vote-count">${announcement.upvotes || 0}</span>
                        </button>
                        <button class="vote-btn vote-down ${downActive}" onclick="handleVote('${announcement.id}', 'down')">
                            <i class="fas fa-thumbs-down"></i>
                            <span class="vote-count">${announcement.downvotes || 0}</span>
                        </button>
                    </div>
                    
                    <div class="announcement-meta">
                        ${announcement.eta ? `<span><i class="fas fa-calendar"></i> ${announcement.eta}</span>` : ''}
                        <span><i class="fas fa-users"></i> 
                            <span class="positive-percentage">${positivePercentage}%</span> votó positivo
                        </span>
                        <span><i class="fas fa-clock"></i> ${timeAgo(new Date(announcement.createdAt))}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para manejar votos (disponible globalmente)
window.handleVote = function(announcementId, voteType) {
    // Cargar anuncios
    const saved = localStorage.getItem('waguriAnnouncements');
    if (!saved) return;
    
    let announcements = JSON.parse(saved);
    const index = announcements.findIndex(a => a.id === announcementId);
    if (index === -1) return;
    
    // Cargar votos del usuario
    let userVotes = JSON.parse(localStorage.getItem('waguriVotes')) || {};
    const previousVote = userVotes[announcementId];
    
    // Actualizar conteos
    if (previousVote === voteType) {
        // Quitar voto
        if (voteType === 'up') {
            announcements[index].upvotes = Math.max(0, announcements[index].upvotes - 1);
        } else {
            announcements[index].downvotes = Math.max(0, announcements[index].downvotes - 1);
        }
        delete userVotes[announcementId];
        showMessage('Voto eliminado', 'info');
    } else if (previousVote) {
        // Cambiar voto
        if (previousVote === 'up') {
            announcements[index].upvotes = Math.max(0, announcements[index].upvotes - 1);
        } else {
            announcements[index].downvotes = Math.max(0, announcements[index].downvotes - 1);
        }
        
        if (voteType === 'up') {
            announcements[index].upvotes += 1;
        } else {
            announcements[index].downvotes += 1;
        }
        
        userVotes[announcementId] = voteType;
        showMessage('Voto cambiado', 'success');
    } else {
        // Nuevo voto
        if (voteType === 'up') {
            announcements[index].upvotes += 1;
        } else {
            announcements[index].downvotes += 1;
        }
        userVotes[announcementId] = voteType;
        showMessage('¡Gracias por votar!', 'success');
    }
    
    // Guardar cambios
    localStorage.setItem('waguriAnnouncements', JSON.stringify(announcements));
    localStorage.setItem('waguriVotes', JSON.stringify(userVotes));
    
    // Actualizar vista
    renderAnnouncements(announcements);
}

function createAnnouncement() {
    const title = document.getElementById('announcementTitle');
    const description = document.getElementById('announcementDesc');
    const features = document.getElementById('announcementFeatures');
    const eta = document.getElementById('announcementEta');
    
    if (!title.value.trim() || !description.value.trim()) {
        showMessage('Completa título y descripción', 'error');
        return;
    }
    
    // Cargar anuncios existentes
    const saved = localStorage.getItem('waguriAnnouncements');
    let announcements = saved ? JSON.parse(saved) : [];
    
    // Crear nuevo anuncio
    const newAnnouncement = {
        id: Date.now().toString(),
        title: title.value.trim(),
        description: description.value.trim(),
        features: features.value.trim().split('\n').filter(f => f.trim() !== ''),
        upvotes: 0,
        downvotes: 0,
        eta: eta.value.trim() || 'Próximamente',
        createdAt: new Date().toISOString(),
        status: 'new'
    };
    
    // Agregar al inicio
    announcements.unshift(newAnnouncement);
    
    // Guardar
    localStorage.setItem('waguriAnnouncements', JSON.stringify(announcements));
    
    // Limpiar formulario
    title.value = '';
    description.value = '';
    features.value = '';
    eta.value = '';
    
    // Ocultar panel
    document.getElementById('adminPanel').style.display = 'none';
    
    // Actualizar vista
    renderAnnouncements(announcements);
    
    showMessage('¡Anuncio publicado!', 'success');
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'justo ahora';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutos';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' horas';
    return Math.floor(seconds / 86400) + ' días';
}

function showMessage(text, type = 'info') {
    // Remover mensaje anterior si existe
    const oldMsg = document.querySelector('.global-message');
    if (oldMsg) oldMsg.remove();
    
    // Crear nuevo mensaje
    const msg = document.createElement('div');
    msg.className = `global-message ${type}`;
    msg.innerHTML = `
        <span>${text}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(msg);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        if (msg.parentNode) {
            msg.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => msg.remove(), 300);
        }
    }, 4000);
}