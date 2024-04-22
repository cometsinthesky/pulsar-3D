document.getElementById('increaseATemperature').addEventListener('click', () => increaseTemperature(0));
document.getElementById('increaseBTemperature').addEventListener('click', () => increaseTemperature(1));
document.getElementById('increaseCTemperature').addEventListener('click', () => increaseTemperature(2));
document.getElementById('decreaseATemperature').addEventListener('click', () => decreaseTemperature(0));
document.getElementById('decreaseBTemperature').addEventListener('click', () => decreaseTemperature(1));
document.getElementById('decreaseCTemperature').addEventListener('click', () => decreaseTemperature(2));
canvas.addEventListener('mousedown', handleMouseDown);

document.getElementById('block-a-select').addEventListener('change', handleMaterialSelectionForBlockA);

document.getElementById('block-b-select').addEventListener('change', handleMaterialSelectionForBlockB);

document.getElementById('block-c-select').addEventListener('change', handleMaterialSelectionForBlockC);


// Selecione os botões de pausa e reiniciar
const pauseButton = document.querySelector('.pause-button');
const restartButton = document.querySelector('.restart-button');

// Adicione um evento de clique ao botão de pausa
pauseButton.addEventListener('click', function() {
    // Alterna o estado da simulação
    isSimulationRunning = !isSimulationRunning;

    // Altera o texto do botão de acordo com o estado da simulação
    pauseButton.textContent = isSimulationRunning ? 'Pausa' : 'Play';
});

// Adicione um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', function() {
    // Implemente a lógica para reiniciar a simulação
    // Isso pode envolver redefinir variáveis, limpar o canvas, etc.
    // Aqui, por exemplo, vamos apenas recarregar a página
    location.reload();
});


// Adiciona Timer
let timerInterval;
let startTime;
let pausedTime = 0;
let isRunning = false;
let lapCounter = 1;

function toggleSimulation() {
  if (isRunning) {
      clearInterval(timerInterval);
      pausedTime = Date.now() - startTime;
      isRunning = false;
      isSimulationRunning = false;
      pauseButton.textContent = 'Play';
  } else {
      startTime = Date.now() - pausedTime;
      timerInterval = setInterval(updateTimer, 10);
      isRunning = true;
      isSimulationRunning = true;
      pauseButton.textContent = 'Pause';
  }
}

function startTimer() {
  if (!isRunning) {
      toggleSimulation();
  }
}

function pauseTimer() {
  if (isRunning) {
      toggleSimulation();
  }
}


function resetTimer() {
  clearInterval(timerInterval);
  pausedTime = 0;
  isRunning = false;
  lapCounter = 1;
  updateTimeDisplay(0);
  clearTimeList();
    // Reinicia a simulação
    location.reload();
}

function saveTime() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  const timeList = document.getElementById("timeList");
  const listItem = document.createElement("li");
  listItem.textContent = `Tempo ${lapCounter}: ${formattedTime}`;
  timeList.appendChild(listItem);
  lapCounter++;
}

function clearTimeList() {
  const timeList = document.getElementById("timeList");
  timeList.innerHTML = "";
}

function formatTime(time) {
  const centiseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  return `${padTime(minutes)} m : ${padTime(seconds)} s : ${padTime(centiseconds)}`;
}

function padTime(value) {
  return value < 10 ? "0" + value : value;
}

function updateTimer() {
  const currentTime = Date.now() - startTime;
  updateTimeDisplay(currentTime);
}

function updateTimeDisplay(time) {
  const formattedTime = formatTime(time);
  document.getElementById("timer").textContent = formattedTime;
}

runSimulation();


