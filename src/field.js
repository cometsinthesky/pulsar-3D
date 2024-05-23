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
    document.getElementById("malhaCheckbox").addEventListener("change", function () {
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
    const term1 = r.clone().multiplyScalar(3 * rDotM / Math.pow(rMag, 5));
    const term2 = m.clone().multiplyScalar(1 / Math.pow(rMag, 3));
    const B = new THREE.Vector3().subVectors(term1, term2);
    return B;
}

// Declare uma lista para armazenar as linhas de campo magnético
const fieldLines = [];

// Função para desenhar linhas de campo magnético
function drawFieldLines() {
    // Limpe quaisquer linhas de campo magnético existentes antes de desenhar novas
    clearFieldLines();

    const numLines = 20; // Número de linhas de campo
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7cd5ff, transparent: true, opacity: 0.8 });

    for (let i = 0; i < numLines; i++) {
        // Distribuição uniforme usando a técnica de Fibonacci
        const offset = 2 / numLines;
        const increment = Math.PI * (2 - Math.sqrt(8));

        const y = ((i * offset) - 1) + (offset / 2);
        const radius = Math.sqrt(1 - y * y);

        const phi = i * increment;

        const x = Math.cos(phi) * radius;
        const z = Math.sin(phi) * radius;

        const lineGeometry = new THREE.BufferGeometry();
        const points = [];
        let position = new THREE.Vector3(x, y, z).multiplyScalar(1); // Começa logo fora da esfera

        for (let j = 0; j < 3000; j++) {
            points.push(position.clone());
            const B = calculateMagneticField(position).normalize();
            position.add(B.multiplyScalar(0.1)); // Tamanho do passo
            if (position.length() > 100) points.length = 0; // Evita que as linhas se estendam indefinidamente
        }

        lineGeometry.setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.userData.isFieldLine = true; // Marcador para identificar linhas de campo magnético
        fieldLines.push(line); // Adiciona a linha ao array
        scene.add(line); // Adiciona a linha à cena
    }
}

// Selecione o checkbox pelo ID
const checkbox = document.getElementById('fieldCheckbox');

// Adicione um event listener para o evento de mudança
checkbox.addEventListener('change', function() {
    // Verifique se o checkbox está selecionado
    if (this.checked) {
        // Se estiver selecionado, chame a função drawFieldLines
        drawFieldLines(); // Desenha as linhas
    } else {
        // Se não estiver selecionado, limpe as linhas da cena
        clearFieldLines();
    }
});

// Função para limpar as linhas de campo magnético da cena
function clearFieldLines() {
    // Remova todas as linhas de campo magnético da cena
    fieldLines.forEach(line => scene.remove(line));
    // Limpe a lista fieldLines
    fieldLines.length = 0;
}
