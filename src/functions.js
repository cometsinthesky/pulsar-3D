
document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências para o elemento de áudio e o botão de controle
    var audio = document.getElementById('music');
    var button = document.getElementById('audio-button');

    // Configurações iniciais do áudio
    audio.autoplay = true; // Ativa a reprodução automática
    audio.volume = 1; // Define o volume inicial como 50%

    // Função para alternar entre reproduzir e pausar o áudio
    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            button.innerHTML = "&#x1F50A;"; // Altera o ícone para o ícone de alto-falante
        } else {
            audio.pause();
            button.innerHTML = "&#x1F507;"; // Altera o ícone para o ícone de mudo
        }
    }

    // Inicializa o áudio tocando e define o ícone do botão
    toggleAudio();

    // Adiciona um ouvinte de evento de clique para o botão de controle do áudio
    button.addEventListener('click', toggleAudio);
});


// SLIDERS AND MENU BUTTONS

// SLIDER VELOCIDADE
// Função para mapear um valor de um intervalo para outro
function mapRange(value, minInput, maxInput, minOutput, maxOutput) {
    return minOutput + (value - minInput) * (maxOutput - minOutput) / (maxInput - minInput);
}

// SLIDER VELOCIDADE
// Seleciona o elemento de entrada do slider
const sliderInput = document.getElementById('velocidade');

// Define os valores mínimo, máximo e padrão do slider
const minRotationSpeed = -0.05;
const maxRotationSpeed = -0.4;
const defaultRotationSpeed = -0.2;

// Define a função para atualizar a velocidade de rotação com base no valor do slider
function updateRotationSpeed() {
    // Obtém o valor atual do slider
    const sliderValue = parseFloat(sliderInput.value);

    // Calcula a velocidade de rotação com base no valor do slider
    rotationSpeed = minRotationSpeed + (maxRotationSpeed - minRotationSpeed) * (sliderValue / 100);

    // Atualiza a velocidade de rotação
    if (isRotationRunning) {
        pulsar.rotation.y = rotationSpeed;
    }
}

// Define o valor inicial do slider como o valor padrão
sliderInput.value = ((defaultRotationSpeed - minRotationSpeed) / (maxRotationSpeed - minRotationSpeed)) * 100;

// Chama a função updateRotationSpeed para atualizar a rotação com base no valor padrão
updateRotationSpeed();

// Adiciona um ouvinte de evento de mudança ao elemento de entrada do slider
sliderInput.addEventListener('input', updateRotationSpeed);

// Define a velocidade de rotação inicial com base no valor padrão do slider
updateRotationSpeed();


// SLIDER LUZ AMBIENTE
// Selecionando o elemento HTML do slider
const slider = document.getElementById('luminosidade');

// Adicionando um evento de escuta para capturar mudanças no valor do slider
slider.addEventListener('input', function () {
    // Obtendo o valor atual do slider
    const sliderValue = parseFloat(this.value) / 100; // Convertendo para um valor entre 0 e 1

    // Limitando o valor mínimo e máximo
    const minValue = 0.3;
    const maxValue = 0.95;
    const clampedValue = Math.min(Math.max(sliderValue, minValue), maxValue);

    // Atualizando a intensidade da luz ambiente com o valor do slider
    ambientLight.intensity = clampedValue;
});

// Função auxiliar para mapear um valor de um intervalo para outro
function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


// Função para adicionar ou remover os vetores de eixo de rotação
function toggleRotationAxisVectors(checked) {
    if (checked) {
        scene.add(arrowHelper1);
        scene.add(arrowHelper2);
    } else {
        scene.remove(arrowHelper1);
        scene.remove(arrowHelper2);
    }
}

// Evento de escuta para detectar mudanças no estado do checkbox
var rotationAxisCheckbox = document.getElementById('rotationAxisCheckbox');
rotationAxisCheckbox.addEventListener('change', function (event) {
    var checked = event.target.checked;
    toggleRotationAxisVectors(checked);
});

// Inicialmente, esconde os vetores de eixo de rotação
toggleRotationAxisVectors(false);


//CHECKBOX JATO DE RADIAÇÃO
// Inicialmente, ocultar as partículas
particulas.visible = false;
particulas2.visible = false;

// Adicionar um evento de escuta à checkbox
document.getElementById('beamsCheckbox').addEventListener('change', function() {
    if (this.checked) {
        // Se a checkbox for selecionada, mostrar as partículas
        particulas.visible = true;
        particulas2.visible = true;
    } else {
        // Se a checkbox for desmarcada, ocultar as partículas
        particulas.visible = false;
        particulas2.visible = false;
    }
});



// Inicia a animação
animate();


// Descarta os recursos usados pelos objetos quando não for mais necessário
// Remove quaisquer referências a recursos de memória associados a esse objeto, 
// permitindo que o coletor de lixo do JavaScript os libere quando apropriado.

gridHelper.dispose();
arrowHelper1.dispose();
arrowHelper2.dispose();
particulas.dispose();
particulas2.dispose();