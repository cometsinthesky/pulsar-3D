
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

runSimulation();