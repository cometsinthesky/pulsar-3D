
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

// Seleciona os elementos parágrafo
const paragraphElement = document.querySelector('.landing-content .landing-paragraph');

// Texto para o parágrafo
const paragraphText = "Explore o fascinante mundo dos pulsares em uma experiência tridimensional!"; // Certifique-se de que o texto esteja correto

// Velocidades de digitação em milissegundos para o parágrafo
const paragraphTypingSpeed = 50;

setTimeout(() => {
    // Aplica o efeito de máquina de escrever ao parágrafo
    typewriterEffect(paragraphElement, paragraphText, paragraphTypingSpeed);
}, 4000);


// GSAP FADE IN CONTROLER
document.addEventListener('DOMContentLoaded', function () {
    gsap.from('.fade-in-hover', { opacity: 0, duration: 5, delay: 1 });
    gsap.from('.fade-in-title', { opacity: 0, duration: 5, delay: 3 });
    gsap.from('.fade-in-paragraph', { opacity: 0, duration: 5, delay: 3 });
});


//INSTRUCTION BUTTON AND CONTAINER TOGGLE
window.addEventListener("click", function (event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var joystickIcon = document.querySelector(".dropdown-btn");

    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
            if (event.target !== openDropdown && !openDropdown.contains(event.target) && event.target !== joystickIcon && !joystickIcon.contains(event.target)) {
                openDropdown.style.display = "none";
            }
        }
    }
});

document.querySelector(".dropdown-btn").addEventListener("click", function (event) {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
    } else {
        dropdownContent.style.display = "block";
    }
});

document.querySelector(".dropdown-content").addEventListener("click", function (event) {
    if (event.target !== this) {
        this.style.display = "none";
    }
});

document.querySelector(".dropdown-content").addEventListener("click", function (event) {
    event.stopPropagation();
});


// BUTTON ENTER SIMULATION
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


//OVERLAY E TRANSIÇÃO
function redirectToSimulation() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('fade-out');
    // Substitui a entrada atual no histórico de navegação pela página da simulação
    history.replaceState({}, '', 'index.html');
}

// Show hidden elements when enter button clicked
document.querySelector('.enter-button').addEventListener('click', function () {
    const backgroundElements = document.querySelectorAll('.hidden');
    backgroundElements.forEach(element => {
        element.classList.remove('hidden');
    });
});

// Adiciona um ouvinte de evento de transição ao elemento .overlay
const overlay = document.querySelector('.overlay');
overlay.addEventListener('transitionend', function (event) {
    // Verifica se a transição que terminou é a de opacidade
    if (event.propertyName === 'opacity') {
        // Remove o elemento .overlay do DOM
        overlay.remove();
        // Inicia a animação do pulsar
        isRotationRunning = true;

        // Remove a classe 'hidden' dos elementos do menu após a transição
        const menu = document.querySelector('.menu');
        menu.classList.remove('hidden');

        // Remove a classe 'hidden' dos elementos de slider e checkboxes após a transição
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            slider.classList.remove('hidden');
        });
        const checkboxes = document.querySelector('.checkboxes');
        checkboxes.classList.remove('hidden');
    }
});


document.querySelector('.enter-button').addEventListener('click', function () {
    // Remove a classe 'hidden' dos elementos do fundo quando o botão for clicado
    const backgroundElements = document.querySelectorAll('.hidden');
    backgroundElements.forEach(element => {
        element.classList.remove('hidden');
    });
});


// Configuração básica da cena
const scene = new THREE.Scene();
//                                     FV, Aspect Ratio, Near plane, Far plane 
const camera = new THREE.PerspectiveCamera(50, 800 / 600, 0.1, 9100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600); // Define o tamanho da janela de renderização
renderer.setClearColor(0x000000); // Define a cor de fundo
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Carregar texturas para cada face do cubo
const textureLoader = new THREE.TextureLoader();
const textures = [
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/right.png'),
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/left.png'),
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/top.png'),
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/bottom.png'),
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/front.png'),
    textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/skybox/back.png')
];

// Criar um material para cada textura
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }));

// Criar um cubo com esses materiais
const skyboxGeometry = new THREE.BoxGeometry(9000, 9000, 9000); // Tamanho do cubo
const skybox = new THREE.Mesh(skyboxGeometry, materials);

// Adicionar o cubo do skybox à cena
scene.add(skybox);


// Esfera representando o pulsar com textura de estrelas
const geometry = new THREE.SphereGeometry(0.5, 256, 256);
const starTexture = textureLoader.load('https://raw.githubusercontent.com/cometsinthesky/pulsar-3D/main/images/map.jpg');
// Criar um material PBR (Physically Based Rendering) usando MeshStandardMaterial
const pulsarMaterial = new THREE.MeshStandardMaterial({
    map: starTexture, // Mapa de textura da estrela
    metalness: 0.2, // Definindo o valor de metalness para 1 para uma aparência totalmente metálica
    roughness: 0.5 // Definindo o valor de roughness para controlar o quanto a superfície é áspera (0 = muito brilhante, 1 = muito fosco)
});
// Ativar o uso do envMap padrão
pulsarMaterial.envMap = scene.background;
// Criar a esfera representando o pulsar com o novo material
const pulsar = new THREE.Mesh(geometry, pulsarMaterial);
// Adicionar a esfera à cena
scene.add(pulsar);


// Cones nos polos do pulsar
const coneGeometry = new THREE.ConeGeometry(0.2, 1, 64);
const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xfaed3a });
const cone1 = new THREE.Mesh(coneGeometry, coneMaterial);
const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);
// Definindo a transparência do material do cone
coneMaterial.transparent = true; // Permite que o material seja transparente
coneMaterial.opacity = 0.4; // Define a opacidade do material (0 = totalmente transparente, 1 = totalmente opaco)

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(1, 0, 10);
scene.add(pointLight);

// Posiciona a câmera
// Definindo a posição inicial da câmera
camera.position.set(0.5, 0.1, 0);

// Distância da câmera do Pulsar
camera.position.z = 5;

// Adiciona OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Movimento suave da câmera
controls.dampingFactor = 0.1; // Fator de amortecimento


// Variável para controlar o estado da simulação
let isSimulationRunning = true;

// Velocidade inicial de rotação e sentido de rotação
let rotationSpeed = -0.2;

// Variável para controlar a rotação
let isRotationRunning = false;


// Função para pausar e retomar a rotação
function toggleRotation() {
    isRotationRunning = !isRotationRunning;
    pauseButton.textContent = isRotationRunning ? 'Pausa' : 'Play';
}

// Selecione os botões de pausa e reiniciar
const pauseButton = document.querySelector('.pause-button');
const restartButton = document.querySelector('.restart-button');

// Adicione um evento de clique ao botão de pausa/play
pauseButton.addEventListener('click', function () {
    toggleRotation();
});

// Adicione um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', function () {
    isRotationRunning = false; // Define a rotação como parada
    pauseButton.textContent = 'Play'; // Atualiza o texto do botão pauseButton para 'Play'
});


// Função de animação
function animate() {
    requestAnimationFrame(animate);

    if (isRotationRunning) {
        // Se a rotação estiver ativa, aplicar a rotação em torno do eixo y
        pulsar.rotation.y += rotationSpeed;
    }

    // Verifica a posição da câmera
    const cameraDistance = camera.position.length();

    // Limita a distância da câmera a 1200 unidades
    if (cameraDistance > 1400) {
        // Define a posição da câmera para estar a 1200 unidades de distância
        camera.position.setLength(1400);
    }
    // Limita a distância da câmera
    if (cameraDistance < 0.8) {
        // Define a posição da câmera para estar a 1 unidade
        camera.position.setLength(0.8);
    }

    // Define a inclinação de 45 graus em relação aos eixos x e z
    pulsar.rotation.x = Math.PI / 4; // 45 graus em radianos
    pulsar.rotation.z = Math.PI / 4; // 45 graus em radianos

    // Atualiza os OrbitControls
    controls.update();

    renderer.render(scene, camera);
}

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