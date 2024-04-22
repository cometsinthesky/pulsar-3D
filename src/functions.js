// Configuração básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Esfera representando o pulsar
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const pulsar = new THREE.Mesh(geometry, material);
scene.add(pulsar);

// Cones nos polos do pulsar
const coneGeometry = new THREE.ConeGeometry(0.3, 1, 32);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const cone1 = new THREE.Mesh(coneGeometry, coneMaterial);
const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);

// Posiciona os cones nos polos da esfera
cone1.position.set(0, -1.3, 0);
cone2.position.set(0, 1.3, 0);

// Inverte o cone1 ao longo do eixo Y
cone1.scale.setY(2);
cone2.scale.setY(-2);

// Adiciona os cones como filhos da esfera
pulsar.add(cone1);
pulsar.add(cone2);

// Configuração de luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Posiciona a câmera
camera.position.z = 5;

// Variável para controlar o estado da simulação
let isSimulationRunning = true;

// Função para pausar e retomar a animação
function toggleSimulation() {
    isSimulationRunning = !isSimulationRunning;
    pauseButton.textContent = isSimulationRunning ? 'Pausa' : 'Play';
    if (isSimulationRunning) {
        animate();
    }
}

// Função de animação
function animate() {
    if (isSimulationRunning) {
        requestAnimationFrame(animate);
        
        // Rotaciona apenas a esfera principal (pulsar)
        pulsar.rotation.x += 0.01;
        pulsar.rotation.y += 0.01;

        renderer.render(scene, camera);
    }
}

// Selecione os botões de pausa e reiniciar
const pauseButton = document.querySelector('.pause-button');
const restartButton = document.querySelector('.restart-button');

// Adicione um evento de clique ao botão de pausa/play
pauseButton.addEventListener('click', function() {
    toggleSimulation();
});

// Adicione um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', function() {
    // Implemente a lógica para reiniciar a simulação
    // Isso pode envolver redefinir variáveis, limpar o canvas, etc.
    // Aqui, por exemplo, vamos apenas recarregar a página
    location.reload();
});

// Inicia a animação
animate();
