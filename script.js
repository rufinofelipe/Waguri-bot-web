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

// ===== SISTEMA DE ANUNCIOS SIN REGISTRO =====

// Variable para almacenar anuncios
let announcements = [];
let userVotes = JSON.parse(localStorage.getItem('waguriVotes')) || {};

// Inicializar sistema de anuncios
function initAnnouncementsSystem() {
    // Cargar anuncios existentes
    loadAnnouncements();
    
    // Configurar botón admin
    const adminBtn = document.getElementById('toggleAdminPanel');
    if (adminBtn) {
        adminBtn.addEventListener('click', showAdminAccess);
    }
    
    // Configurar publicación de anuncios
    const publishBtn = document.getElementById('publishAnnouncement');
    if (publishBtn) {
        publishBtn.addEventListener('click', createAnnouncement);
    }
    
    // Cargar votos guardados
    loadSavedVotes();
}

// Cargar anuncios desde localStorage
function loadAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    
    // Intentar cargar anuncios guardados
    const savedAnnouncements = JSON.parse(localStorage.getItem('waguriAnnouncements')) || [];
    announcements = savedAnnouncements;
    
    if (announcements.length === 0) {
        // Crear anuncios de ejemplo si no hay ninguno
        createSampleAnnouncements();
        announcements = JSON.parse(localStorage.getItem('waguriAnnouncements'));
    }
    
    // Renderizar anuncios
    renderAnnouncements();
}

// Crear anuncios de ejemplo
function createSampleAnnouncements() {
    const sampleAnnouncements = [
        {
            id: Date.now().toString(),
            title: "Sistema de Niveles RPG",
            description: "Sistema completo de niveles, XP, clases y misiones. Los usuarios podrán subir de nivel, desbloquear habilidades especiales y competir en rankings globales.",
            features: ["Sistema de XP por actividad", "5 clases diferentes", "Misiones diarias/semanales", "Ranking global"],
            upvotes: 42,
            downvotes: 8,
            eta: "Próximamente",
            createdAt: new Date().toISOString(),
            status: "new"
        },
        {
            id: (Date.now() + 1).toString(),
            title: "Integración con Spotify",
            description: "Reproduce música de Spotify directamente en tus grupos. Comparte playlists, busca canciones y controla la reproducción con comandos simples.",
            features: ["Búsqueda de canciones", "Compartir playlists", "Cola de reproducción", "Letras en tiempo real"],
            upvotes: 28,
            downvotes: 12,
            eta: "En desarrollo",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            status: "progress"
        }
    ];
    
    localStorage.setItem('waguriAnnouncements', JSON.stringify(sampleAnnouncements));
}

// Renderizar anuncios en el DOM
function renderAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    if (!container || !announcements) return;
    
    // Ordenar por fecha (más recientes primero)
    const sortedAnnouncements = [...announcements].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    container.innerHTML = '';
    
    if (sortedAnnouncements.length === 0) {
        container.innerHTML = `
            <div class="no-announcements">
                <i class="fas fa-bullhorn"></i>
                <h3>No hay anuncios aún</h3>
                <p>Sé el primero en sugerir una actualización</p>
            </div>
        `;
        return;
    }
    
    sortedAnnouncements.forEach(announcement => {
        const card = createAnnouncementCard(announcement);
        container.appendChild(card);
    });
}

// Crear tarjeta de anuncio
function createAnnouncementCard(announcement) {
    const card = document.createElement('div');
    card.className = 'announcement-card';
    card.dataset.id = announcement.id;
    
    // Calcular porcentaje de votos positivos
    const totalVotes = announcement.upvotes + announcement.downvotes;
    const positivePercentage = totalVotes > 0 
        ? Math.round((announcement.upvotes / totalVotes) * 100) 
        : 0;
    
    // Determinar badge según estado
    let badgeClass = '';
    let badgeText = '';
    
    switch (announcement.status) {
        case 'new':
            badgeClass = 'badge-new';
            badgeText = 'NUEVO';
            break;
        case 'progress':
            badgeClass = 'badge-progress';
            badgeText = 'EN DESARROLLO';
            break;
        case 'planned':
            badgeClass = 'badge-planned';
            badgeText = 'PLANEADO';
            break;
        default:
            badgeClass = 'badge-planned';
            badgeText = 'EN VOTACIÓN';
    }
    
    // Verificar si el usuario ya votó
    const userVote = userVotes[announcement.id];
    const upActive = userVote === 'up' ? 'active' : '';
    const downActive = userVote === 'down' ? 'active' : '';
    
    card.innerHTML = `
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
                <button class="vote-btn vote-up ${upActive}" 
                        onclick="voteAnnouncement('${announcement.id}', 'up')">
                    <i class="fas fa-thumbs-up"></i>
                    <span class="vote-count">${announcement.upvotes || 0}</span>
                </button>
                <button class="vote-btn vote-down ${downActive}"
                        onclick="voteAnnouncement('${announcement.id}', 'down')">
                    <i class="fas fa-thumbs-down"></i>
                    <span class="vote-count">${announcement.downvotes || 0}</span>
                </button>
            </div>
            
            <div class="announcement-meta">
                ${announcement.eta ? `
                    <span><i class="fas fa-calendar"></i> ${announcement.eta}</span>
                ` : ''}
                <span><i class="fas fa-users"></i> 
                    <span class="positive-percentage">${positivePercentage}%</span> votó positivo
                </span>
                <span><i class="fas fa-clock"></i> 
                    ${timeAgo(new Date(announcement.createdAt))}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// Función para votar (disponible globalmente)
window.voteAnnouncement = function(announcementId, voteType) {
    // Encontrar el anuncio
    const announcementIndex = announcements.findIndex(a => a.id === announcementId);
    if (announcementIndex === -1) return;
    
    const announcement = announcements[announcementIndex];
    const previousVote = userVotes[announcementId];
    
    // Si ya votó lo mismo, quitar el voto
    if (previousVote === voteType) {
        // Restar el voto anterior
        if (voteType === 'up') {
            announcement.upvotes = Math.max(0, announcement.upvotes - 1);
        } else {
            announcement.downvotes = Math.max(0, announcement.downvotes - 1);
        }
        delete userVotes[announcementId];
        
        showMessage('Voto eliminado', 'info');
    } 
    // Si cambia de voto
    else if (previousVote) {
        // Restar voto anterior
        if (previousVote === 'up') {
            announcement.upvotes = Math.max(0, announcement.upvotes - 1);
        } else {
            announcement.downvotes = Math.max(0, announcement.downvotes - 1);
        }
        
        // Agregar nuevo voto
        if (voteType === 'up') {
            announcement.upvotes += 1;
        } else {
            announcement.downvotes += 1;
        }
        
        userVotes[announcementId] = voteType;
        showMessage('Voto cambiado exitosamente', 'success');
    }
    // Voto nuevo
    else {
        if (voteType === 'up') {
            announcement.upvotes += 1;
        } else {
            announcement.downvotes += 1;
        }
        userVotes[announcementId] = voteType;
        showMessage('¡Gracias por tu voto!', 'success');
    }
    
    // Actualizar en localStorage
    localStorage.setItem('waguriAnnouncements', JSON.stringify(announcements));
    localStorage.setItem('waguriVotes', JSON.stringify(userVotes));
    
    // Actualizar la vista
    renderAnnouncements();
}

// Cargar votos guardados
function loadSavedVotes() {
    const saved = localStorage.getItem('waguriVotes');
    if (saved) {
        userVotes = JSON.parse(saved);
    }
}

// Mostrar acceso admin
function showAdminAccess() {
    const password = prompt('🔐 Ingresa la contraseña de administrador:');
    
    // Contraseña simple (cambia esto por una más segura)
    if (password === 'waguri2023') { // ¡CAMBIA ESTA CONTRASEÑA!
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'block';
            showMessage('Panel de administrador activado', 'success');
        }
    } else {
        showMessage('Contraseña incorrecta', 'error');
    }
}

// Crear nuevo anuncio
function createAnnouncement() {
    const title = document.getElementById('announcementTitle');
    const description = document.getElementById('announcementDesc');
    const features = document.getElementById('announcementFeatures');
    const eta = document.getElementById('announcementEta');
    
    if (!title || !description) return;
    
    if (!title.value.trim() || !description.value.trim()) {
        showMessage('Por favor completa título y descripción', 'error');
        return;
    }
    
    // Crear nuevo anuncio
    const newAnnouncement = {
        id: Date.now().toString(),
        title: title.value.trim(),
        description: description.value.trim(),
        features: features.value.trim().split('\n').filter(f => f.trim() !== ''),
        upvotes: 0,
        downvotes: 0,
        eta: eta.value.trim(),
        createdAt: new Date().toISOString(),
        status: 'new'
    };
    
    // Agregar a la lista
    announcements.unshift(newAnnouncement);
    
    // Guardar en localStorage
    localStorage.setItem('waguriAnnouncements', JSON.stringify(announcements));
    
    // Limpiar formulario
    title.value = '';
    description.value = '';
    features.value = '';
    eta.value = '';
    
    // Actualizar vista
    renderAnnouncements();
    
    // Mostrar confirmación
    showMessage('¡Anuncio publicado exitosamente!', 'success');
    
    // Ocultar panel admin después de publicar
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
}

// Función helper: tiempo relativo
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " días";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos";
    
    return "justo ahora";
}

// Función para mostrar mensajes
function showMessage(text, type = 'info') {
    // Crear elemento de mensaje
    const message = document.createElement('div');
    message.className = `global-message ${type}`;
    message.innerHTML = `
        <span>${text}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos dinámicos
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(message);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (message.parentNode) message.remove();
            }, 300);
        }
    }, 4000);
}

// Agregar animaciones de mensajes
const messageStyles = document.createElement('style');
messageStyles.textContent = `
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
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyles);

// Inicializar sistema de anuncios cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    // Tu código existente...
    
    // Agregar esta línea para iniciar el sistema de anuncios
    setTimeout(initAnnouncementsSystem, 1000);
});

// Asegurarse de que la función esté disponible globalmente
window.voteAnnouncement = voteAnnouncement;