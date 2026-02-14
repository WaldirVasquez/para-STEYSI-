const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');
const audio = document.getElementById('bg-music');

// Intenta reproducir el audio automáticamente
document.addEventListener('DOMContentLoaded', function() {
    // Algunos navegadores bloquean autoplay, esto lo maneja
    audio.volume = 0.5; // Volumen al 50%
    
    // Intenta reproducir
    audio.play().catch(e => {
        console.log('Autoplay bloqueado por el navegador. Esperando interacción del usuario.');
    });
});

// Pausa/play opcional al hacer clic en el corazón (opcional)
let isPlaying = true;

document.addEventListener('click', (e) => {
    if (
        e.target.matches(".envelope") || 
        e.target.matches(".tap-right") || 
        e.target.matches(".tap-left") || 
        e.target.matches(".heart")
    ) {
        envelope.classList.toggle('flap');
    } else if (e.target.matches(".envelope *")) {
        if (!letter.classList.contains('opened')) {
            letter.classList.add("letter-opening");

            setTimeout(() => {
                letter.classList.remove('letter-opening');
                letter.classList.add('opened');
            }, 500);
            envelope.classList.add("disable-envelope")
        } else {
            letter.classList.add('closing-letter')
            envelope.classList.remove("disable-envelope")
            letter.classList.remove('opened')
            setTimeout(() => {
                letter.classList.remove('closing-letter');
                letter.classList.remove('opened');
            }, 500);
        }
    }
    
    // Opcional: Control de música al hacer clic en la instrucción
    if (e.target.matches(".instruction")) {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
    }
});