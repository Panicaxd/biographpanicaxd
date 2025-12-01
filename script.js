// ===== TYPING TEXT EFFECT =====
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

// Text array for typing animation
const textArray = [
    "Frontend Developer", 
    "JavaScript Developer", 
    "React Developer",
    "Web Developer"
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500;

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}

// ===== SMOOTH SCROLL =====
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    return false;
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Theme';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Theme';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Load saved theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Theme';
        }
    }
    
    loadTheme();
    themeToggle.addEventListener('click', toggleTheme);
}

// ===== PARTICLES INITIALIZATION =====
function initParticlesAll() {
    // Particles for Hero section
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: "#38bdf8" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#8b5cf6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
    
    // Particles for About section
    if (window.particlesJS && document.getElementById('particles-about')) {
        particlesJS('particles-about', {
            particles: {
                number: { value: 30, density: { enable: true, value_area: 800 } },
                color: { value: "#8b5cf6" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 2.5, random: true },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#38bdf8",
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" }
                }
            },
            retina_detect: true
        });
    }
    
    // Particles for Contacts section
    if (window.particlesJS && document.getElementById('particles-contacts')) {
        particlesJS('particles-contacts', {
            particles: {
                number: { value: 25, density: { enable: true, value_area: 800 } },
                color: { value: "#38bdf8" },
                shape: { type: "circle" },
                opacity: { value: 0.25, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" }
                }
            },
            retina_detect: true
        });
    }
}

// ===== NUMBER COUNTER ANIMATION =====
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target, 1500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== COPY DISCORD ID =====
function initCopyDiscordId() {
    const copyBtn = document.querySelector('.copy-btn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', function() {
        const discordId = "panicaxd"; // Replace with your Discord ID
        
        navigator.clipboard.writeText(discordId)
            .then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.background = 'rgba(34, 197, 94, 0.2)';
                this.style.color = '#10b981';
                this.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.color = '';
                    this.style.borderColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Copy error: ', err);
                alert('Failed to copy. Please copy manually: ' + discordId);
            });
    });
}


// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio loaded!');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });
    
    // Start typing animation
    if (typedTextSpan && textArray.length > 0) {
        setTimeout(() => {
            type();
        }, 1000);
    }
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize particles
    initParticlesAll();
    
    // Initialize counters
    initCounters();
    
    // Initialize Discord ID copy
    initCopyDiscordId();
    
    // Add current year if needed
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
});
// ===== 3D DODECAHEDRON WITH THREE.JS =====

class Dodecahedron3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Colors based on theme
        this.colors = {
            primary: new THREE.Color('#38bdf8'),
            secondary: new THREE.Color('#8b5cf6'),
            accent: new THREE.Color('#10b981'),
            dark: new THREE.Color('#0f172a'),
            light: new THREE.Color('#f8fafc')
        };
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            50,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 6;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // Lights
        this.addLights();
        
        // Dodecahedron
        this.createDodecahedron();
        
        // Controls
        this.initControls();
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 8, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.5);
        fillLight.position.set(-5, -3, 3);
        this.scene.add(fillLight);
        
        // Back light for edge highlights
        const backLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
        backLight.position.set(0, 0, -5);
        this.scene.add(backLight);
        
        // Point lights for 3D effect
        const pointLight1 = new THREE.PointLight(this.colors.primary, 0.8, 10);
        pointLight1.position.set(4, 4, 4);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(this.colors.secondary, 0.6, 10);
        pointLight2.position.set(-4, -4, 3);
        this.scene.add(pointLight2);
    }
    
    createDodecahedron() {
        // Geometry - додекаэдр
        const geometry = new THREE.DodecahedronGeometry(2, 0);
        
        // Material - НЕПРОЗРАЧНЫЙ с градиентом
        const material = new THREE.MeshPhysicalMaterial({
            color: this.colors.primary,
            metalness: 0.3,
            roughness: 0.2,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            reflectivity: 0.5,
            side: THREE.DoubleSide,
            transparent: false, // НЕПРОЗРАЧНЫЙ
            opacity: 1.0
        });
        
        // Create mesh
        this.dodecahedron = new THREE.Mesh(geometry, material);
        this.dodecahedron.castShadow = true;
        this.dodecahedron.receiveShadow = true;
        this.scene.add(this.dodecahedron);
        
        // Добавляем текст "Panica" на каждую грань
        this.addTextToFaces();
        
        // Добавляем контур для лучшей видимости граней
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: this.colors.secondary,
            linewidth: 2,
            transparent: true,
            opacity: 0.6
        });
        this.wireframe = new THREE.LineSegments(edges, lineMaterial);
        this.dodecahedron.add(this.wireframe);
    }
    
    addTextToFaces() {
        // Создаем текстуру с текстом "Panica"
        const createTextTexture = (text) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 512;
            
            // Фон
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            // Текст
            context.font = 'bold 120px "Fira Code", monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            // Градиент для текста
            const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, '#38bdf8');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(1, '#8b5cf6');
            
            context.fillStyle = gradient;
            context.shadowColor = 'rgba(0, 0, 0, 0.5)';
            context.shadowBlur = 10;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            
            // Контур текста
            context.strokeStyle = '#0f172a';
            context.lineWidth = 4;
            context.strokeText(text, canvas.width / 2, canvas.height / 2);
            
            return new THREE.CanvasTexture(canvas);
        };
        
        // Создаем 12 разных текстур с "Panica" в разных ориентациях
        const textures = [];
        for (let i = 0; i < 12; i++) {
            const texture = createTextTexture('PANICA');
            texture.needsUpdate = true;
            textures.push(texture);
        }
        
        // Создаем материалы для каждой грани с разными текстурами
        const materials = textures.map(texture => 
            new THREE.MeshPhongMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                shininess: 100,
                specular: 0xffffff,
                side: THREE.DoubleSide
            })
        );
        
        // Заменяем материал додекаэдра на массив материалов
        this.dodecahedron.material = materials;
    }
    
    initControls() {
        // Mouse/touch controls
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        
        // Auto rotation
        this.autoRotateSpeed = 0.003;
        this.isAutoRotating = true;
        
        // Rotation damping
        this.rotationDamping = 0.05;
    }
    
    addEventListeners() {
        // Mouse events
        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        
        // Touch events
        this.container.addEventListener('touchstart', this.onTouchStart.bind(this));
        document.addEventListener('touchmove', this.onTouchMove.bind(this));
        document.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Mouse enter/leave для авто-вращения
        this.container.addEventListener('mouseenter', () => {
            this.isAutoRotating = false;
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (!this.isDragging) {
                this.isAutoRotating = true;
            }
        });
        
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    onMouseDown(event) {
        event.preventDefault();
        this.isDragging = true;
        this.isAutoRotating = false;
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
    
    onMouseMove(event) {
        if (!this.isDragging) return;
        
        const deltaX = event.clientX - this.previousMousePosition.x;
        const deltaY = event.clientY - this.previousMousePosition.y;
        
        this.targetRotationY += deltaX * 0.005;
        this.targetRotationX += deltaY * 0.005;
        
        // Ограничиваем вращение по X
        this.targetRotationX = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.targetRotationX));
        
        this.previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
    
    onMouseUp() {
        this.isDragging = false;
        setTimeout(() => {
            if (!this.isDragging) {
                this.isAutoRotating = true;
            }
        }, 1000);
    }
    
    onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.isDragging = true;
            this.isAutoRotating = false;
            this.previousMousePosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    }
    
    onTouchMove(event) {
        if (!this.isDragging || event.touches.length !== 1) return;
        
        event.preventDefault();
        
        const deltaX = event.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = event.touches[0].clientY - this.previousMousePosition.y;
        
        this.targetRotationY += deltaX * 0.005;
        this.targetRotationX += deltaY * 0.005;
        
        // Ограничиваем вращение по X
        this.targetRotationX = Math.max(-Math.PI/3, Math.min(Math.PI/3, this.targetRotationX));
        
        this.previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
    
    onTouchEnd() {
        this.isDragging = false;
        setTimeout(() => {
            if (!this.isDragging) {
                this.isAutoRotating = true;
            }
        }, 1000);
    }
    
    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
    }
    
    updateRotation() {
        // Авто-вращение
        if (this.isAutoRotating && !this.isDragging) {
            this.targetRotationY += this.autoRotateSpeed;
        }
        
        // Плавная интерполяция
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * this.rotationDamping;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * this.rotationDamping;
        
        // Применяем вращение
        this.dodecahedron.rotation.x = this.currentRotationX;
        this.dodecahedron.rotation.y = this.currentRotationY;
        
        // Легкая пульсация масштаба
        const time = Date.now() * 0.001;
        const pulse = 1 + Math.sin(time * 1.5) * 0.02;
        this.dodecahedron.scale.set(pulse, pulse, pulse);
        
        // Медленное плавающее движение
        const floatY = Math.sin(time * 0.5) * 0.1;
        this.dodecahedron.position.y = floatY;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.updateRotation();
        
        // Медленное вращение света для динамики
        const time = Date.now() * 0.001;
        const light = this.scene.children.find(child => child instanceof THREE.DirectionalLight);
        if (light) {
            light.position.x = Math.sin(time * 0.2) * 6;
            light.position.z = Math.cos(time * 0.2) * 6;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    updateTheme(isLightTheme) {
        if (isLightTheme) {
            // Светлая тема
            if (this.dodecahedron.material instanceof Array) {
                // Обновляем все материалы в массиве
                this.dodecahedron.material.forEach(mat => {
                    if (mat.map) {
                        // Создаем новую текстуру для светлой темы
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = 512;
                        canvas.height = 512;
                        
                        context.fillStyle = 'transparent';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        
                        context.font = 'bold 120px "Fira Code", monospace';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        
                        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
                        gradient.addColorStop(0, '#0f172a');
                        gradient.addColorStop(0.5, '#475569');
                        gradient.addColorStop(1, '#1e293b');
                        
                        context.fillStyle = gradient;
                        context.shadowColor = 'rgba(255, 255, 255, 0.5)';
                        context.shadowBlur = 10;
                        
                        context.fillText('PANICA', canvas.width / 2, canvas.height / 2);
                        
                        context.strokeStyle = '#38bdf8';
                        context.lineWidth = 4;
                        context.strokeText('PANICA', canvas.width / 2, canvas.height / 2);
                        
                        const newTexture = new THREE.CanvasTexture(canvas);
                        newTexture.needsUpdate = true;
                        mat.map = newTexture;
                        mat.needsUpdate = true;
                    }
                });
            }
            
            // Обновляем основной материал
            if (this.dodecahedron.material && this.dodecahedron.material.color) {
                this.dodecahedron.material.color.set('#f8fafc');
            }
            
            // Обновляем контур
            if (this.wireframe && this.wireframe.material) {
                this.wireframe.material.color.set('#475569');
            }
        } else {
            // Темная тема (стандартная)
            if (this.dodecahedron.material instanceof Array) {
                this.dodecahedron.material.forEach(mat => {
                    if (mat.map) {
                        // Возвращаем оригинальную текстуру
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = 512;
                        canvas.height = 512;
                        
                        context.fillStyle = 'transparent';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        
                        context.font = 'bold 120px "Fira Code", monospace';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        
                        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
                        gradient.addColorStop(0, '#38bdf8');
                        gradient.addColorStop(0.5, '#ffffff');
                        gradient.addColorStop(1, '#8b5cf6');
                        
                        context.fillStyle = gradient;
                        context.shadowColor = 'rgba(0, 0, 0, 0.5)';
                        context.shadowBlur = 10;
                        
                        context.fillText('PANICA', canvas.width / 2, canvas.height / 2);
                        
                        context.strokeStyle = '#0f172a';
                        context.lineWidth = 4;
                        context.strokeText('PANICA', canvas.width / 2, canvas.height / 2);
                        
                        const newTexture = new THREE.CanvasTexture(canvas);
                        newTexture.needsUpdate = true;
                        mat.map = newTexture;
                        mat.needsUpdate = true;
                    }
                });
            }
            
            // Обновляем основной материал
            if (this.dodecahedron.material && this.dodecahedron.material.color) {
                this.dodecahedron.material.color.set('#38bdf8');
            }
            
            // Обновляем контур
            if (this.wireframe && this.wireframe.material) {
                this.wireframe.material.color.set('#8b5cf6');
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dodecahedron = new Dodecahedron3D('dodecahedron-container');
});
