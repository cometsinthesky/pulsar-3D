// Configuração básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600); // Define o tamanho da janela de renderização
renderer.setClearColor(0x000000); // Define a cor de fundo como branco
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Esfera representando o pulsar
const geometry = new THREE.SphereGeometry(0.5, 64, 64);
const material = new THREE.MeshPhongMaterial({ color: 0xabe5ff });
const pulsar = new THREE.Mesh(geometry, material);
scene.add(pulsar);


// // Esfera representando o pulsar com textura de estrelas
// const geometry = new THREE.SphereGeometry(0.5, 64, 64);
// const textureLoader = new THREE.TextureLoader();
// const starTexture = textureLoader.load('https://blenderartists.org/uploads/default/original/4X/4/e/3/4e31caa0f5acc386e4a504eab2269ebdb47f0307.jpg');
// const starMaterial = new THREE.MeshBasicMaterial({ map: starTexture });
// const pulsar = new THREE.Mesh(geometry, starMaterial);
// scene.add(pulsar);


// Cones nos polos do pulsar
const coneGeometry = new THREE.ConeGeometry(0.2, 1, 64);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xfaed3a });
const cone1 = new THREE.Mesh(coneGeometry, coneMaterial);
const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);

// Posiciona os cones nos polos da esfera
cone1.position.set(0, -1.15, 0);
cone2.position.set(0, 1.15, 0);

// Inverte o cone1 ao longo do eixo Y
cone1.scale.setY(2);
cone2.scale.setY(-2);

// Adiciona os cones como filhos da esfera
pulsar.add(cone1);
pulsar.add(cone2);

// Configuração de luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 0, 5);
scene.add(pointLight);

// Posiciona a câmera
camera.position.z = 5;

// Adiciona OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Movimento suave da câmera
controls.dampingFactor = 0.3; // Fator de amortecimento

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
        
        // Define a rotação em torno do eixo y com inclinação de 45 graus em relação ao eixo x
        pulsar.rotation.y += 0.01;
        pulsar.rotation.x = Math.PI / 4; // 45 graus em radianos
        pulsar.rotation.z = Math.PI / 4; // 45 graus em radianos

        // Atualiza os OrbitControls
        controls.update();

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
