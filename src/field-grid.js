// ADD GRID
var gridColor = 0xf0f0f0;
var gridHelper = new THREE.GridHelper(30, 50, gridColor, gridColor);
gridHelper.material.opacity = 0.4;
gridHelper.material.transparent = true;
gridHelper.visible = true; // Torna a grade visível
scene.add(gridHelper);

document.addEventListener("DOMContentLoaded", function () {
  // Função para esconder ou mostrar o gridHelper
  function toggleGridHelperVisibility() {
    gridHelper.visible = document.getElementById("malhaCheckbox").checked;
  }

  // Event listener para o checkbox
  document
    .getElementById("malhaCheckbox")
    .addEventListener("change", function () {
      toggleGridHelperVisibility(); // Chama a função para esconder ou mostrar o gridHelper
    });

  // Inicialmente, esconder o gridHelper
  toggleGridHelperVisibility();
});


// Função para calcular o vetor de campo magnético B em um ponto r
function calculateMagneticField(r) {
  const m = new THREE.Vector3(0, 1, 0); // Momento dipolar magnético
  const rMag = r.length();
  const rDotM = r.dot(m);
  const term1 = r.clone().multiplyScalar((3 * rDotM) / Math.pow(rMag, 5));
  const term2 = m.clone().multiplyScalar(1 / Math.pow(rMag, 3));
  const B = new THREE.Vector3().subVectors(term1, term2);
  return B;
}

// Declare uma lista para armazenar as linhas de campo magnético
const fieldLines = [];

// Função para limpar as linhas de campo magnético existentes
function clearFieldLines() {
  fieldLines.forEach((line) => scene.remove(line));
  fieldLines.length = 0;
}

// Função para desenhar linhas de campo magnético
function drawFieldLines() {
  // Limpe quaisquer linhas de campo magnético existentes antes de desenhar novas
  clearFieldLines();

  const numLines = 10; // Número de linhas de campo
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7cd5ff,
    transparent: true,
    opacity: 0.8,
  });

  const inclinationAngle = THREE.Math.degToRad(30); // Convertendo 30 graus para radianos

  for (let i = 0; i < numLines; i++) {
    const theta = (i / numLines) * 2 * Math.PI;
    const x = Math.sin(inclinationAngle) * Math.cos(theta);
    const z = Math.sin(inclinationAngle) * Math.sin(theta);
    const y = Math.cos(inclinationAngle); // Ajustando y para a inclinação de 30 graus

    const lineGeometry = new THREE.BufferGeometry();
    const points = [];
    let position = new THREE.Vector3(x, y, z).multiplyScalar(0.5); // Começa logo fora da esfera

    for (let j = 0; j < 1061; j++) {
      points.push(position.clone());
      const B = calculateMagneticField(position).normalize();
      position.add(B.multiplyScalar(0.1)); // Tamanho do passo
      if (position.length() > 1060) {
        // Extensão limitada a 1060 unidades
        break;
      }
    }

    if (points.length > 0) {
      lineGeometry.setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      fieldLines.push(line);
      scene.add(line);
    }
  }
}

// Selecione o checkbox pelo ID
const checkbox = document.getElementById("fieldCheckbox");

// Adicione um event listener para o evento de mudança
checkbox.addEventListener("change", function () {
    // Verifique se o checkbox está selecionado
    if (this.checked) {
        // Se estiver selecionado, chame a função drawFieldLines
        drawFieldLines(); // Desenha as linhas

        // Pausa a simulação
        isRotationRunning = false;
        pauseButton.textContent = 'Play'; // Atualiza o texto do botão pauseButton para 'Play'

        // Coloca a inclinação em 0 graus
        const inclination = 0;
        pulsar.rotation.x = inclination;
        pulsar.rotation.z = inclination;

        // Ajusta o valor do slider para 0
        const slider = document.getElementById('inclinação');
        slider.value = 0;
    } else {
        // Se não estiver selecionado, limpe as linhas da cena
        clearFieldLines();
    }
});

// Função para limpar as linhas de campo magnético da cena
function clearFieldLines() {
    // Remova todas as linhas de campo magnético da cena
    fieldLines.forEach((line) => scene.remove(line));
    // Limpe a lista fieldLines
    fieldLines.length = 0;
}

