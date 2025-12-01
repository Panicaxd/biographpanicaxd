// INTEGRATED MUSIC PLAYER - BASED ON WORKING TEST
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INTEGRATED MUSIC PLAYER START ===');
    
    // Ждем полной загрузки всех ресурсов
    setTimeout(initMusicPlayer, 1000);
});

function initMusicPlayer() {
    console.log('Initializing integrated music player...');
    
    // 1. Удаляем старые аудио элементы если есть
    document.querySelectorAll('audio').forEach(audio => {
        if (audio.id !== 'integrated-music') {
            audio.pause();
            audio.src = '';
        }
    });
    
    // 2. Удаляем старые кнопки плеера
    const oldPlayers = document.querySelectorAll('.integrated-player, .music-player, .music-player-minimal');
    oldPlayers.forEach(player => player.remove());
    
    // 3. Создаем новый аудио элемент
    const audio = new Audio();
    
    // Пробуем разные пути (используйте тот, что работал в тесте)
    const audioPaths = [
        'music/Sweater_Weathe.mp3',      // Из теста
        './music/Sweater_Weathe.mp3',    // Относительный
        window.location.pathname.replace(/\/[^\/]*$/, '') + '/music/Sweater_Weathe.mp3'
    ];
    
    let currentPathIndex = 0;
    
    function tryNextPath() {
        if (currentPathIndex >= audioPaths.length) {
            console.error('All paths failed');
            createErrorUI();
            return;
        }
        
        const path = audioPaths[currentPathIndex];
        console.log(`Trying audio path: ${path}`);
        
        audio.src = path;
        audio.load();
        
        audio.addEventListener('canplaythrough', function onCanPlay() {
            console.log(`✅ Audio loaded from: ${path}`);
            audio.removeEventListener('canplaythrough', onCanPlay);
            createPlayerUI();
        }, { once: true });
        
        audio.addEventListener('error', function onError() {
            console.log(`Path failed: ${path}`, audio.error);
            audio.removeEventListener('error', onError);
            currentPathIndex++;
            setTimeout(tryNextPath, 500);
        }, { once: true });
        
        // Таймаут
        setTimeout(() => {
            if (audio.error) {
                currentPathIndex++;
                tryNextPath();
            }
        }, 2000);
    }
    
    // 4. Создаем интерфейс плеера
    function createPlayerUI() {
        const playerHTML = `
            <div class="integrated-player" style="
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 99999;
                background: rgba(15, 23, 42, 0.98);
                backdrop-filter: blur(20px);
                border-radius: 50px;
                border: 2px solid rgba(56, 189, 248, 0.5);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 12px 25px;
                animation: slideInRight 0.5s ease;
            ">
                <button id="integrated-play-btn" style="
                    background: linear-gradient(135deg, #38bdf8, #8b5cf6);
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-play"></i>
                </button>
                
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <span style="
                        font-family: 'Fira Code', monospace;
                        font-size: 0.9rem;
                        color: #38bdf8;
                        font-weight: 600;
                    ">Sweater Weather</span>
                    <span style="
                        font-size: 0.8rem;
                        color: #94a3b8;
                    " id="integrated-status">Ready</span>
                </div>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-left: 10px;">
                    <input type="range" id="integrated-volume" min="0" max="100" value="50" style="
                        width: 80px;
                        height: 4px;
                        -webkit-appearance: none;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 2px;
                        cursor: pointer;
                    ">
                </div>
            </div>
            
            <style>
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                #integrated-play-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
                }
                
                #integrated-play-btn.playing {
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
                    100% { boxShadow: 0 0 0 0 rgba(56, 189, 248, 0); }
                }
                
                #integrated-volume::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #38bdf8;
                    cursor: pointer;
                    border: 2px solid white;
                }
                
                #integrated-volume::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #38bdf8;
                    cursor: pointer;
                    border: 2px solid white;
                }
                
                @media (max-width: 768px) {
                    .integrated-player {
                        bottom: 20px;
                        right: 20px;
                        padding: 10px 15px;
                    }
                    
                    #integrated-volume {
                        width: 60px;
                    }
                }
            </style>
        `;
        
        // Добавляем в DOM
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = playerHTML;
        document.body.appendChild(tempDiv.firstElementChild);
        
        // Настройка элементов управления
        const playBtn = document.getElementById('integrated-play-btn');
        const volumeSlider = document.getElementById('integrated-volume');
        const statusText = document.getElementById('integrated-status');
        
        // Воспроизведение/пауза
        playBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (audio.paused) {
                playAudio();
            } else {
                pauseAudio();
            }
        });
        
        function playAudio() {
            console.log('Integrated player: Play');
            
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✅ Integrated: Playback started');
                        playBtn.querySelector('i').className = 'fas fa-pause';
                        playBtn.classList.add('playing');
                        statusText.textContent = 'Playing';
                    })
                    .catch(error => {
                        console.error('❌ Integrated: Playback error:', error);
                        statusText.textContent = 'Click to play';
                        
                        // Показываем подсказку
                        showPlayHint();
                    });
            }
        }
        
        function pauseAudio() {
            audio.pause();
            playBtn.querySelector('i').className = 'fas fa-play';
            playBtn.classList.remove('playing');
            statusText.textContent = 'Paused';
        }
        
        // Громкость
        volumeSlider.addEventListener('input', function(e) {
            const volume = e.target.value / 100;
            audio.volume = volume;
            localStorage.setItem('musicVolume', volume);
        });
        
        // Восстановление громкости
        const savedVolume = localStorage.getItem('musicVolume');
        if (savedVolume) {
            audio.volume = parseFloat(savedVolume);
            volumeSlider.value = savedVolume * 100;
        }
        
        // Обработчики событий аудио
        audio.addEventListener('playing', () => {
            statusText.textContent = 'Playing';
        });
        
        audio.addEventListener('pause', () => {
            statusText.textContent = 'Paused';
        });
        
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            playAudio();
        });
        
        // Автоплей если ранее был включен
        if (localStorage.getItem('musicPlaying') === 'true') {
            setTimeout(() => playAudio(), 1000);
        }
        
        // Сохраняем состояние при закрытии
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicPlaying', !audio.paused);
        });
    }
    
    function createErrorUI() {
        const errorHTML = `
            <div class="music-error" style="
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(239, 68, 68, 0.1);
                border: 2px solid #ef4444;
                border-radius: 10px;
                padding: 10px 15px;
                z-index: 99999;
                max-width: 300px;
            ">
                <p style="margin: 0; color: #ef4444; font-size: 0.9rem;">
                    🎵 Music file not found at: <code>music/Sweater_Weathe.mp3</code>
                </p>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', errorHTML);
    }
    
    function showPlayHint() {
        const hint = document.createElement('div');
        hint.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(15, 23, 42, 0.95);
                color: white;
                padding: 15px;
                border-radius: 10px;
                border: 2px solid #38bdf8;
                z-index: 100000;
                max-width: 300px;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: fadeIn 0.3s ease;
            ">
                <p style="margin: 0 0 10px 0; color: #38bdf8; font-weight: 600;">
                    🎵 Music Playback
                </p>
                <p style="margin: 0; line-height: 1.5;">
                    Click the music player button to start playback.
                    Some browsers require manual interaction.
                </p>
            </div>
        `;
        
        document.body.appendChild(hint);
        
        setTimeout(() => {
            if (hint.parentNode) {
                hint.remove();
            }
        }, 5000);
    }
    
    // Начинаем попытки загрузки
    tryNextPath();
    
    // Экспортируем аудио для отладки
    window.integratedAudio = audio;
}