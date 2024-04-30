
// Função para efeito de máquina de escrever
function typewriterEffect(element, text, speed, callback) {
    let index = 0;
    const interval = setInterval(() => {
        // Adiciona o próximo caractere ao elemento
        element.textContent += text[index];
        index++;
        // Verifica se todo o texto foi digitado
        if (index === text.length) {
            clearInterval(interval);
            // Chama a função de retorno de chamada quando a digitação estiver concluída
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, speed);
}

// Seleciona os elementos de título e parágrafo
const titleElement = document.querySelector('h1');
const paragraphElement = document.querySelector('.landing-content .landing-paragraph');

// Textos para os títulos e parágrafos
const titleText = "Bem-vind@ à Simulação Pulsar 3D";
const paragraphText = "Explore o fascinante mundo dos pulsares em uma experiência tridimensional!"; // Certifique-se de que o texto esteja correto

// Velocidades de digitação em milissegundos para o título e parágrafo
const titleTypingSpeed = 100;
const paragraphTypingSpeed = 50;

// Aplica o efeito de máquina de escrever ao título
typewriterEffect(titleElement, titleText, titleTypingSpeed, () => {
    // Aplica o efeito de máquina de escrever ao parágrafo após a digitação do título ser concluída
    typewriterEffect(paragraphElement, paragraphText, paragraphTypingSpeed);
});

// Seleciona o botão
const button = document.querySelector('.enter-button');

// Define as cores
const colors = ['#45a049', '#4CAF50'];

let index = 0;

// Função para alternar as cores
function cycleColors() {
    button.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
}

// Inicia o ciclo a cada 1 segundo
setInterval(cycleColors, 1600);


function redirectToSimulation() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('fade-out');
    // Substitui a entrada atual no histórico de navegação pela página da simulação
    history.replaceState({}, '', 'index.html');
}

// Adiciona um ouvinte de evento de transição ao elemento .overlay
const overlay = document.querySelector('.overlay');
overlay.addEventListener('transitionend', function (event) {
    // Verifica se a transição que terminou é a de opacidade
    if (event.propertyName === 'opacity') {
        // Remove o elemento .overlay do DOM
        overlay.remove();
        // Inicia a animação do pulsar
        isRotationRunning = true;
    }
});

// Configuração básica
const scene = new THREE.Scene();
//                                     FV, Aspect Ratio, Near plane, Far plane 
const camera = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600); // Define o tamanho da janela de renderização
renderer.setClearColor(0x000000); // Define a cor de fundo
document.getElementById('threejs-container').appendChild(renderer.domElement);


// Esfera representando o pulsar com textura de estrelas
const geometry = new THREE.SphereGeometry(0.5, 100, 100);
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/images/map.jpg');
const starMaterial = new THREE.MeshBasicMaterial({ map: starTexture });
const pulsar = new THREE.Mesh(geometry, starMaterial);
scene.add(pulsar);

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(10, 0, 10);
scene.add(pointLight);

// Posiciona a câmera
// Distância da câmera do Pulsar
camera.position.z = 5;

// Adiciona OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Movimento suave da câmera
controls.dampingFactor = 0.1; // Fator de amortecimento


// Variável para controlar o estado da simulação
let isSimulationRunning = true;

// Velocidade inicial de rotação
let rotationSpeed = -0.05;

// Variável para controlar a rotação
let isRotationRunning = false;

// Função para pausar e retomar a rotação
function toggleRotation() {
    isRotationRunning = !isRotationRunning;
    pauseButton.textContent = isRotationRunning ? 'Pausa' : 'Play';
}

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    if (isRotationRunning) {
        // Se a rotação estiver ativa, aplicar a rotação em torno do eixo y
        pulsar.rotation.y += rotationSpeed;
    }

    // Define a inclinação de 45 graus em relação aos eixos x e z
    pulsar.rotation.x = Math.PI / 4; // 45 graus em radianos
    pulsar.rotation.z = Math.PI / 4; // 45 graus em radianos

    // Atualiza os OrbitControls
    controls.update();

    renderer.render(scene, camera);
}

// Selecione os botões de pausa e reiniciar
const pauseButton = document.querySelector('.pause-button');
const restartButton = document.querySelector('.restart-button');

// Adicione um evento de clique ao botão de pausa/play
pauseButton.addEventListener('click', function () {
    toggleRotation();
});

// Defina angleInRadians no escopo global e inicialize com 0 graus
let angleInRadians = THREE.MathUtils.degToRad(0);

// Adicione um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', function () {
    // Reinicia a simulação
    isRotationRunning = false; // Para a rotação
    angleInRadians = THREE.MathUtils.degToRad(180); // Define o ângulo em 180 graus
    pulsar.rotation.set(0, angleInRadians, 0); // Aplica a nova rotação
    controls.reset(); // Redefine os controles da câmera
});

// Função para definir a rotação com base em graus
function setRotationInDegrees(angleInDegrees) {
    // Atualiza o ângulo em radianos
    angleInRadians = THREE.MathUtils.degToRad(angleInDegrees);
    // Define a rotação do objeto pulsar em torno do eixo Y
    pulsar.rotation.set(0, angleInRadians, 0);
}

// Define a rotação inicial em 180 graus
setRotationInDegrees(180);


// Inicia a animação
animate();