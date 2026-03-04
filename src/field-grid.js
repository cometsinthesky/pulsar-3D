// ADD GRID
var gridColor = 0xf0f0f0;
var gridHelper = new THREE.GridHelper(30, 50, gridColor, gridColor);
gridHelper.material.opacity = 0.4;
gridHelper.material.transparent = true;
gridHelper.visible = false; // Define a grade como invisível inicialmente
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

  // Event listener para a tecla 'G'
  document.addEventListener("keydown", function (event) {
    if (event.key === "g" || event.key === "G") {
      // Inverte o estado do checkbox
      document.getElementById("malhaCheckbox").checked =
        !document.getElementById("malhaCheckbox").checked;
      toggleGridHelperVisibility(); // Atualiza a visibilidade da grade
    }
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

// Lista para armazenar as linhas de campo magnético
const fieldLines = [];

// ✅ Grupo do campo magnético preso ao pulsar (herda rotação e inclinação)
const magneticFieldGroup = new THREE.Group();
magneticFieldGroup.name = "magneticFieldGroup";
pulsar.add(magneticFieldGroup);

// Limpa as linhas de campo magnético existentes (remove do grupo, não da cena)
function clearFieldLines() {
  fieldLines.forEach((line) => magneticFieldGroup.remove(line));
  fieldLines.length = 0;
}

// Desenha linhas de campo magnético (dentro do grupo preso ao pulsar)
function drawFieldLines() {
  clearFieldLines();

  const numLines = 10; // Número de linhas de campo
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7cd5ff,
    transparent: true,
    opacity: 0.8,
  });

  // Abertura inicial das linhas (apenas distribuição). A inclinação global vem do pulsar.rotation.
  const inclinationAngle = THREE.Math.degToRad(30);

  for (let i = 0; i < numLines; i++) {
    const theta = (i / numLines) * 2 * Math.PI;
    const x = Math.sin(inclinationAngle) * Math.cos(theta);
    const z = Math.sin(inclinationAngle) * Math.sin(theta);
    const y = Math.cos(inclinationAngle);

    const lineGeometry = new THREE.BufferGeometry();
    const points = [];
    let position = new THREE.Vector3(x, y, z).multiplyScalar(0.5); // Começa logo fora da esfera

    for (let j = 0; j < 1061; j++) {
      points.push(position.clone());
      const B = calculateMagneticField(position).normalize();
      position.add(B.multiplyScalar(0.1)); // Tamanho do passo
      if (position.length() > 1060) break; // Extensão limitada a 1060 unidades
    }

    if (points.length > 0) {
      lineGeometry.setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      fieldLines.push(line);
      magneticFieldGroup.add(line);
    }
  }
}

// Toggle via tecla "M"
document.addEventListener("keydown", function (event) {
  if (event.key === "m" || event.key === "M") {
    const checkbox = document.getElementById("fieldCheckbox");
    checkbox.checked = !checkbox.checked;
    handleCheckboxToggle();
  }
});

// Toggle via checkbox
document
  .getElementById("fieldCheckbox")
  .addEventListener("change", handleCheckboxToggle);

// Liga/desliga o campo magnético sem mexer em rotação/inclinação do pulsar
function handleCheckboxToggle() {
  const checkbox = document.getElementById("fieldCheckbox");
  if (checkbox.checked) {
    drawFieldLines();
  } else {
    clearFieldLines();
  }
}

