//ADD FULLSCREEN PRESS F
// Função para alternar o modo de tela cheia
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Entra no modo de tela cheia
    const container = document.getElementById("threejs-container");
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      // Safari
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      // Internet Explorer
      container.msRequestFullscreen();
    }
  } else {
    // Sai do modo de tela cheia
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // Internet Explorer
      document.msExitFullscreen();
    }
  }
}

// Listener para tecla pressionada
document.addEventListener("keydown", function (event) {
  // Verifica se a tecla pressionada é a tecla "F"
  if (event.key === "f" || event.key === "F") {
    toggleFullscreen();
  }
});

// Listener para ajustar o tamanho do renderizador quando sai do modo de tela cheia
document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    // Saiu do modo de tela cheia, redefine o tamanho do renderizador para o tamanho configurado
    adjustRendererSize();
  } else {
    // Entrou no modo de tela cheia, ajusta o tamanho do renderizador para ocupar toda a tela
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
});

// Chame adjustRendererSize() inicialmente para configurar o tamanho do renderizador conforme o tamanho da tela
adjustRendererSize();


document.addEventListener("DOMContentLoaded", function () {
  // Obtém referências para os elementos de áudio e o botão de controle
  var audio1 = document.getElementById("music");
  var audio2 = document.getElementById("sfx");

  // Define a velocidade de reprodução para 1.5 vezes a velocidade normal
  audio2.playbackRate = 1.2; // Isso reproduzirá o áudio 1.5 vezes mais rápido que a velocidade normal

  // Configurações iniciais dos áudios
  audio1.autoplay = true; // Ativa a reprodução automática
  audio1.volume = 0.8; // Define o volume inicial como 80%
  audio2.autoplay = true; // Ativa a reprodução automática
  audio2.volume = 0.9; // Define o volume inicial como 70%

  // Obtém referência para o botão de controle
  var button = document.getElementById("audio-button");

  // Função para alternar entre reproduzir e pausar os áudios
  function toggleAudio() {
    if (audio1.paused && audio2.paused) {
      audio1.play();
      audio2.play();
      button.innerHTML = "&#x1F50A;"; // Altera o ícone para o ícone de alto-falante
    } else {
      audio1.pause();
      audio2.pause();
      button.innerHTML = "&#x1F507;"; // Altera o ícone para o ícone de mudo
    }
  }

  // Inicializa o áudio tocando e define o ícone do botão
  toggleAudio();

  // Adiciona um ouvinte de evento de clique para o botão de controle do áudio
  button.addEventListener("click", toggleAudio);
});

// SLIDERS AND MENU BUTTONS

// ADD SPEED SLIDER
// Seleciona o elemento do slider de velocidade
const sliderInput = document.getElementById("velocidade");

// Define os valores mínimo, máximo e padrão de velocidade de rotação
const minRotationSpeed = -0.01;
const maxRotationSpeed = -0.3;
const defaultRotationSpeed = -0.1;

// Define a função para atualizar a velocidade de rotação com base no valor do slider
function updateRotationSpeed() {
  console.log("Atualizando velocidade de rotação...");
  const speedIndex = parseInt(sliderInput.value);
  const speeds = [-0.01, -0.03, -0.05, -0.07, -0.1, -0.15, -0.2, -0.25, -0.3];
  const speed = speeds[speedIndex];
  rotationSpeed = speed; // Supondo que 'rotationSpeed' é a variável que controla a velocidade de rotação
}

// Chama a função updateRotationSpeed para atualizar a rotação com base no valor padrão
updateRotationSpeed();

// Adiciona um ouvinte de evento de mudança ao elemento de entrada do slider de velocidade
sliderInput.addEventListener("input", updateRotationSpeed);

// Adiciona event listeners para as teclas de adição e subtração
document.addEventListener("keydown", function (event) {
  if (event.key === "+" || event.key === "=") {
    // Aumenta a velocidade da esfera
    const speedIndex = parseInt(sliderInput.value);
    if (speedIndex < 8) {
      sliderInput.value = speedIndex + 1;
      updateRotationSpeed();
    }
  } else if (event.key === "-") {
    // Diminui a velocidade da esfera
    const speedIndex = parseInt(sliderInput.value);
    if (speedIndex > 0) {
      sliderInput.value = speedIndex - 1;
      updateRotationSpeed();
    }
  }
});

// SLIDER LUZ AMBIENTE
// Selecionando o elemento HTML do slider
const slider = document.getElementById("luminosidade");

// Adicionando um evento de escuta para capturar mudanças no valor do slider
slider.addEventListener("input", function () {
  // Obtendo o valor atual do slider
  const sliderValue = parseFloat(this.value) / 100; // Convertendo para um valor entre 0 e 1

  // Mapeando para um intervalo entre 1 e 1.5
  const mappedValue = sliderValue * 0.5 + 1;

  // Limitando o valor mínimo e máximo
  const minValue = 1;
  const maxValue = 1.5;
  const clampedValue = Math.min(Math.max(mappedValue, minValue), maxValue);

  // Atualizando a intensidade da luz ambiente com o valor do slider
  ambientLight.intensity = clampedValue;
});

// Função auxiliar para mapear um valor de um intervalo para outro
function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

// Função para selecionar e desselecionar os vetores de eixo de rotação
function toggleRotationAxisVectors() {
  if (rotationAxisCheckbox.checked) {
    scene.add(arrowHelper1);
    scene.add(arrowHelper2);
  } else {
    scene.remove(arrowHelper1);
    scene.remove(arrowHelper2);
  }
}

// Adiciona um evento de escuta para o clique no checkbox
rotationAxisCheckbox.addEventListener("change", toggleRotationAxisVectors);

// Adiciona um evento de escuta para a tecla "i"
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    rotationAxisCheckbox.checked = !rotationAxisCheckbox.checked; // Inverte o estado do checkbox
    toggleRotationAxisVectors();
  }
});

// Inicialmente, esconde os vetores de eixo de rotação
toggleRotationAxisVectors();

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
// Dispose da geometria
line.geometry.dispose();
// Dispose do material
line.material.dispose();
