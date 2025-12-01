// DEBUG CONFLICTS SCRIPT
console.log('=== CHECKING FOR CONFLICTS ===');

// 1. Проверяем другие музыкальные плееры
const audioElements = document.querySelectorAll('audio');
console.log(`Found ${audioElements.length} audio elements:`);
audioElements.forEach((audio, i) => {
    console.log(`  Audio ${i}:`, {
        id: audio.id,
        src: audio.src,
        parent: audio.parentElement?.className,
        error: audio.error
    });
});

// 2. Проверяем музыкальные кнопки
const musicButtons = document.querySelectorAll('[id*="music"], [class*="music"], button');
console.log(`Found ${musicButtons.length} potential music buttons`);
musicButtons.forEach((btn, i) => {
    if (btn.id.includes('music') || btn.className.includes('music')) {
        console.log(`  Music button ${i}:`, {
            id: btn.id,
            class: btn.className,
            text: btn.textContent
        });
    }
});

// 3. Проверяем глобальные переменные
console.log('Global music objects:');
['musicPlayer', 'audio', 'player', 'MusicPlayer'].forEach(name => {
    if (window[name]) {
        console.log(`  window.${name}:`, typeof window[name]);
    }
});

// 4. Отключаем другие музыкальные скрипты временно
setTimeout(() => {
    console.log('=== DISABLING OTHER AUDIO ===');
    audioElements.forEach(audio => {
        if (!audio.id.includes('integrated')) {
            console.log(`Pausing and clearing: ${audio.id || 'unnamed'}`);
            audio.pause();
            audio.src = '';
            audio.remove();
        }
    });
}, 2000);