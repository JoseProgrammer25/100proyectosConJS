const texts = [
    "La mecanografía es una habilidad esencial en el mundo moderno. Escribir rápidamente y con precisión puede mejorar la productividad y facilitar la comunicación. Practicar regularmente es clave para dominar esta destreza.",
    "La lectura y la escritura son fundamentales para el aprendizaje. A través de la escritura, podemos expresar nuestras ideas y pensamientos de manera clara. La práctica constante nos ayuda a mejorar nuestras habilidades.",
    "La tecnología ha transformado la forma en que nos comunicamos. Hoy en día, la mayoría de las interacciones se realizan a través de dispositivos digitales. Aprender a escribir bien en estos dispositivos es más importante que nunca."
];

// Seleccionar un texto aleatorio
const textToType = texts[Math.floor(Math.random() * texts.length)];
document.getElementById('text-to-type').innerText = textToType;

const userInput = document.getElementById('user-input');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('time');
let timeLeft = 60;
let timer;

userInput.addEventListener('input', () => {
    const inputValue = userInput.value;
    const displayText = textToType.split('').map((char, index) => {
        if (inputValue[index] === char) {
            return `<span class="correct">${char}</span>`;
        } else if (inputValue[index] !== undefined) {
            return `<span class="incorrect">${char}</span>`;
        }
        // Resaltar la siguiente letra en blanco
        return index === inputValue.length ? `<span class="next">${char}</span>` : `<span style="color: #ccc;">${char}</span>`;
    }).join('');
    
    document.getElementById('text-to-type').innerHTML = displayText;

    if (inputValue === textToType) {
        result.innerText = '¡Correcto!';
        clearInterval(timer);
    } else {
        result.innerText = '';
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            result.innerText = '¡Tiempo terminado!';
        }
    }, 1000);
}

startTimer();