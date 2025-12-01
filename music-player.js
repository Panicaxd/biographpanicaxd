// ===== FIXED MUSIC PLAYER FOR SWEATER_WEATHE.MP3 =====
class FixedMusicPlayer {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.toggleBtn = document.getElementById('music-toggle');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.trackTitle = document.querySelector('.track-title');
        
        this.isPlaying = false;
        this.currentVolume = 0.5;
        
        console.log('🎵 Initializing player for Sweater_Weathe.mp3');
        
        // Динамически устанавливаем путь к аудио
        this.setupAudioSource();
        
        this.init();
    }
    
    setupAudioSource() {
        // Создаем абсолютный путь к файлу
        const baseUrl = window.location.origin + window.location.pathname;
        const directory = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
        const audioUrl = directory + '/music/Sweater_Weathe.mp3';
        
        console.log('Base URL:', baseUrl);
        console.log('Directory:', directory);
        console.log('Audio URL:', audioUrl);
        
        // Устанавливаем источник
        this.audio.src = audioUrl;
        
        // Альтернативный способ: относительный путь
        // this.audio.src = 'music/Sweater_Weathe.mp3';
        
        // Проверяем доступность файла
        this.checkFileAccessibility(audioUrl);
    }
    
    checkFileAccessibility(url) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                console.log('File check status:', response.status);
                if (response.ok) {
                    console.log('✅ Audio file found and accessible');
                    this.trackTitle.textContent = 'Sweater Weather - Ready';
                } else {
                    console.error('❌ File not accessible:', response.status);
                    this.trackTitle.textContent = 'File not found';
                }
            })
            .catch(error => {
                console.error('❌ Error checking file:', error);
                this.trackTitle.textContent = 'Connection error';
            });
    }
    
    init() {
        // Громкость
        this.audio.volume = this.currentVolume;
        if (this.volumeSlider) {
            this.volumeSlider.value = this.currentVolume * 100;
            
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
        
        // Кнопка воспроизведения
        this.toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePlay();
        });
        
        // Обработчики событий для отладки
        this.setupEventListeners();
        
        // Восстанавливаем настройки
        this.restoreSettings();
        
        // Обновляем UI
        this.updateUI();
    }
    
    setupEventListeners() {
        // Все возможные события аудио для отладки
        const events = [
            'loadstart', 'progress', 'suspend', 'abort', 'error',
            'emptied', 'stalled', 'loadedmetadata', 'loadeddata',
            'canplay', 'canplaythrough', 'playing', 'waiting',
            'seeking', 'seeked', 'ended', 'durationchange',
            'timeupdate', 'play', 'pause', 'ratechange',
            'volumechange'
        ];
        
        events.forEach(event => {
            this.audio.addEventListener(event, (e) => {
                console.log(`🎵 Audio event: ${event}`);
                
                if (event === 'error') {
                    console.error('Audio error details:', {
                        code: this.audio.error?.code,
                        message: this.audio.error?.message,
                        src: this.audio.src
                    });
                    
                    // Показываем пользователю
                    this.trackTitle.textContent = 'Error loading audio';
                    
                    // Пробуем альтернативный путь
                    this.tryAlternativePath();
                }
                
                if (event === 'canplay') {
                    console.log('✅ Audio can play! Duration:', this.audio.duration);
                    this.trackTitle.textContent = 'Sweater Weather - Ready';
                }
                
                if (event === 'playing') {
                    this.trackTitle.textContent = 'Sweater Weather - Playing';
                }
            });
        });
    }
    
    tryAlternativePath() {
        // Пробуем разные пути к файлу
        const alternativePaths = [
            'Sweater_Weathe.mp3',                          // Тот же уровень
            './music/Sweater_Weathe.mp3',                  // Поддиректория
            'music/Sweater_Weathe.mp3',                    // Поддиректория без точки
            '../music/Sweater_Weathe.mp3',                 // На уровень выше
            window.location.origin + '/music/Sweater_Weathe.mp3' // Абсолютный
        ];
        
        console.log('Trying alternative paths...');
        
        // Пробуем каждый путь по очереди
        let currentIndex = 0;
        const tryNextPath = () => {
            if (currentIndex < alternativePaths.length) {
                const path = alternativePaths[currentIndex];
                console.log(`Trying path ${currentIndex + 1}: ${path}`);
                
                this.audio.src = path;
                currentIndex++;
                
                // Даем время на загрузку
                setTimeout(() => {
                    if (this.audio.error) {
                        tryNextPath();
                    } else {
                        console.log(`✅ Found working path: ${path}`);
                        this.trackTitle.textContent = 'Sweater Weather - Found!';
                    }
                }, 1000);
            } else {
                console.error('❌ All paths failed');
                this.trackTitle.textContent = 'Cannot find audio file';
            }
        };
        
        tryNextPath();
    }
    
    togglePlay() {
        console.log('Toggle play - current state:', this.isPlaying ? 'playing' : 'paused');
        console.log('Audio src:', this.audio.src);
        console.log('Audio readyState:', this.audio.readyState);
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        console.log('Attempting to play audio...');
        
        // Показываем состояние загрузки
        this.trackTitle.textContent = 'Loading...';
        
        const playPromise = this.audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('✅ Playback started successfully');
                    this.isPlaying = true;
                    this.updateUI();
                    localStorage.setItem('musicPlaying', 'true');
                })
                .catch(error => {
                    console.error('❌ Playback failed:', error);
                    console.error('Error name:', error.name);
                    console.error('Error message:', error.message);
                    
                    this.isPlaying = false;
                    this.updateUI();
                    
                    // Показываем инструкцию для пользователя
                    this.showPlayInstructions();
                });
        }
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
        localStorage.setItem('musicPlaying', 'false');
        this.trackTitle.textContent = 'Sweater Weather - Paused';
    }
    
    setVolume(value) {
        this.currentVolume = Math.max(0, Math.min(1, value));
        this.audio.volume = this.currentVolume;
        
        if (this.volumeSlider) {
            this.volumeSlider.value = this.currentVolume * 100;
        }
        
        localStorage.setItem('musicVolume', this.currentVolume);
    }
    
    restoreSettings() {
        const savedVolume = localStorage.getItem('musicVolume');
        const savedState = localStorage.getItem('musicPlaying');
        
        if (savedVolume) {
            this.setVolume(parseFloat(savedVolume));
        }
        
        // Не восстанавливаем состояние воспроизведения автоматически
        // из-за ограничений автоплея в браузерах
    }
    
    updateUI() {
        const icon = this.toggleBtn.querySelector('i');
        
        if (this.isPlaying) {
            icon.className = 'fas fa-pause';
            this.toggleBtn.classList.add('playing');
            this.toggleBtn.title = 'Pause music';
        } else {
            icon.className = 'fas fa-play';
            this.toggleBtn.classList.remove('playing');
            this.toggleBtn.title = 'Play Sweater Weather';
        }
    }
    
    showPlayInstructions() {
        // Создаем всплывающую подсказку
        const popup = document.createElement('div');
        popup.className = 'music-instructions';
        popup.innerHTML = `
            <div class="instructions-content">
                <h3>🎵 Playback Issue</h3>
                <p>To play music, you might need to:</p>
                <ol>
                    <li>Click the play button again</li>
                    <li>Enable autoplay in browser settings</li>
                    <li>Check if file exists at: <code>${this.audio.src}</code></li>
                </ol>
                <button class="close-btn">Got it!</button>
            </div>
        `;
        
        // Стили для попапа
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border: 2px solid var(--primary-color);
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: fadeIn 0.3s ease;
        `;
        
        popup.querySelector('.instructions-content').style.cssText = `
            color: white;
            font-family: 'Inter', sans-serif;
        `;
        
        popup.querySelector('h3').style.cssText = `
            color: var(--primary-color);
            margin-bottom: 15px;
            font-family: 'Fira Code', monospace;
        `;
        
        popup.querySelector('p').style.cssText = `
            margin-bottom: 15px;
            line-height: 1.5;
        `;
        
        popup.querySelector('ol').style.cssText = `
            margin-bottom: 20px;
            padding-left: 20px;
        `;
        
        popup.querySelector('li').style.cssText = `
            margin-bottom: 8px;
        `;
        
        popup.querySelector('code').style.cssText = `
            background: rgba(255,255,255,0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9em;
            word-break: break-all;
            display: block;
            margin-top: 5px;
        `;
        
        const closeBtn = popup.querySelector('.close-btn');
        closeBtn.style.cssText = `
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            width: 100%;
            margin-top: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });
        
        document.body.appendChild(popup);
        
        // Автоматическое закрытие через 10 секунд
        setTimeout(() => {
            if (document.body.contains(popup)) {
                popup.remove();
            }
        }, 10000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== SWEATER WEATHER PLAYER INIT ===');
    console.log('Current URL:', window.location.href);
    console.log('Current path:', window.location.pathname);
    
    window.musicPlayer = new FixedMusicPlayer();
    
    // Простая проверка структуры проекта
    console.log('=== PROJECT STRUCTURE CHECK ===');
    console.log('1. Check if "music" folder exists');
    console.log('2. Check if "Sweater_Weathe.mp3" is in music folder');
    console.log('3. File should be at: [project]/music/Sweater_Weathe.mp3');
});