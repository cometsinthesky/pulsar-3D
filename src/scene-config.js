
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
const coneGeometry1 = new THREE.ConeGeometry(0.2, 1, 64);
const coneMaterial1 = new THREE.MeshStandardMaterial({ color: 0xfaed3a });
const cone1 = new THREE.Mesh(coneGeometry1, coneMaterial1);
const cone2 = new THREE.Mesh(coneGeometry1, coneMaterial1);

// Definindo a transparência do material do cone
coneMaterial1.transparent = true; // Permite que o material seja transparente
coneMaterial1.opacity = 0.4; // Define a opacidade do material (0 = totalmente transparente, 1 = totalmente opaco)

// Posiciona os cones nos polos da esfera
cone1.position.set(0, -1.15, 0);
cone2.position.set(0, 1.15, 0);

// Inverte o cone1 ao longo do eixo Y
cone1.scale.setY(2);
cone2.scale.setY(-2);

// Adiciona os cones como filhos da esfera
pulsar.add(cone1);
pulsar.add(cone2);


//ADICIONA PARTÍCULAS NOS CONES
// Definir a quantidade de partículas
const quantidadeParticulas = 10000;

// Definir parâmetros do cone
const raioBaseInicial = 0.05;
const alturaCone = 9000;
const raioBaseFinal = 250; // Vértice do cone

// Criar a geometria das partículas
const particulasGeometry = new THREE.BufferGeometry();

// Criar arrays para armazenar as posições das partículas
const positions = new Float32Array(quantidadeParticulas * 3);

// Preencher os arrays com posições ao longo do cone
for (let i = 0; i < quantidadeParticulas; i++) {
    // Gerar coordenadas cilíndricas aleatórias dentro do cone
    const altura = Math.random() * alturaCone;
    const alturaNormalizada = altura / alturaCone; // Normaliza a altura entre 0 e 1
    const theta = Math.random() * (Math.PI * 2) * Math.PI; // Ângulo aleatório

    // Calcula o raio usando uma função cônica para evitar aglomeração nas bordas
    const raio = raioBaseInicial + alturaNormalizada * (raioBaseFinal - raioBaseInicial);

    // Converter coordenadas cilíndricas para cartesianas
    const x = raio * Math.cos(theta);
    const z = raio * Math.sin(theta);

    // Definir a posição da partícula
    positions[i * 3] = x;
    positions[i * 3 + 1] = altura;
    positions[i * 3 + 2] = z;
}

// Adicionar as posições à geometria das partículas
particulasGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Criar o material das partículas
const particulasMaterial = new THREE.PointsMaterial({ color: 0xfaed3a, size: 0.05 });

// Criar o objeto das partículas
const particulas = new THREE.Points(particulasGeometry, particulasMaterial);

// Adicionar as partículas como filhas da esfera
pulsar.add(particulas);


//ADD PARTÍCULAS CONE NEGATIVO
// Definir a quantidade de partículas
const quantidadeParticulas2 = 10000;

// Definir parâmetros do cone
const raioBaseInicial2 = 0.05;
const alturaCone2 = 9000;
const raioBaseFinal2 = 250; // Vértice do cone
// Criar a geometria das partículas
const particulas2Geometry = new THREE.BufferGeometry();

// Criar arrays para armazenar as posições das partículas
const positions2 = new Float32Array(quantidadeParticulas2 * 3);

// Preencher os arrays com posições ao longo do cone
for (let i = 0; i < quantidadeParticulas2; i++) {
    // Gerar coordenadas cilíndricas aleatórias dentro do cone
    const altura = (Math.random() * -1) * alturaCone2;
    const alturaNormalizada = altura / alturaCone2; // Normaliza a altura entre 0 e 1
    const theta = Math.random() * (Math.PI * 2) * Math.PI; // Ângulo aleatório

    // Calcula o raio usando uma função cônica para evitar aglomeração nas bordas
    const raio = raioBaseInicial2 + alturaNormalizada * (raioBaseFinal2 - raioBaseInicial2);

    // Converter coordenadas cilíndricas para cartesianas
    const x = raio * Math.cos(theta);
    const z = raio * Math.sin(theta);

    // Definir a posição da partícula
    positions2[i * 3] = x;
    positions2[i * 3 + 1] = altura;
    positions2[i * 3 + 2] = z;
}


// Adicionar as posições à geometria das partículas
particulas2Geometry.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

// Criar o material das partículas
const particulas2Material = new THREE.PointsMaterial({ color: 0xfaed3a, size: 0.05 });

// Criar o objeto das partículas
const particulas2 = new THREE.Points(particulas2Geometry, particulas2Material);

// Adicionar as partículas como filhas da esfera
pulsar.add(particulas2);





//ADICIONA VETORES
// EIXO DE ROTAÇÃO UP
var direction1 = new THREE.Vector3(0, 1, 0); // direção para cima
var origin1 = cone1.position.clone(); // posição do cone1
var length1 = 3; // comprimento do vetor
var color1 = 0xff0000; // cor do vetor
var headLength1 = 0.1; // comprimento da cabeça do vetor
var headWidth1 = 0.1; // largura da cabeça do vetor
var arrowHelper1 = new THREE.ArrowHelper(direction1, origin1, length1, color1);
arrowHelper1.setLength(length1, headLength1, headWidth1);
scene.add(arrowHelper1);

// DOWN
var direction2 = new THREE.Vector3(0, -1, 0); // direção para baixo
var origin2 = cone2.position.clone(); // posição do cone2
var length2 = 3; // comprimento do vetor
var color2 = 0xff0000; // cor do vetor
var headLength2 = 0.1; // comprimento da cabeça do vetor
var headWidth2 = 0.1; // largura da cabeça do vetor
var arrowHelper2 = new THREE.ArrowHelper(direction2, origin2, length2, color2);
arrowHelper2.setLength(length2, headLength2, headWidth2);
scene.add(arrowHelper2);

// // ADICIONA VETORES DOS CONES
// // Vetor acima do cone1
// var direction3 = new THREE.Vector3(0, 1, 0); // direção para cima
// var origin3 = cone1.position.clone(); // posição do cone1
// var length3 = 1000; // comprimento do vetor
// var color3 = 0xfaed3a ; // cor do vetor
// var arrowHelper3 = new THREE.ArrowHelper(direction3, origin3, length3, color3);
// pulsar.add(arrowHelper3);

// // Vetor acima do cone2
// var direction4 = new THREE.Vector3(0, -1, 0); // direção para cima
// var origin4 = cone2.position.clone(); // posição do cone2
// var length4 = 1000; // comprimento do vetor
// var color4 = 0xfaed3a ; // cor do vetor
// var arrowHelper4 = new THREE.ArrowHelper(direction4, origin4, length4, color4);
// pulsar.add(arrowHelper4);



// Configuração de luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(1, 0, 10);
scene.add(pointLight);

// Posiciona a câmera
// Definindo a posição inicial da câmera
camera.position.set(0.3, 0.1, 0);

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

    // Define o valor do slider para a posição original (45 graus)
    const defaultSliderPosition = 45;
    sliderInput.value = defaultSliderPosition;

// Define a inclinação da esfera para 45 graus em relação aos eixos x e z
const degrees = 45; // 0 a 90 graus
const inclination = degrees * Math.PI/180; // Convertendo para radianos
pulsar.rotation.x = inclination;
pulsar.rotation.z = inclination;

    // Atualiza a intensidade da luz ambiente para o valor padrão
    const defaultIntensity = ((defaultSliderPosition - minSliderValue) / (maxSliderValue - minSliderValue)) * (maxIntensity - minIntensity) + minIntensity;
    ambientLight.intensity = defaultIntensity;

    // Atualiza a velocidade de rotação para o valor padrão
    updateRotationSpeed();
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

    // // Define a inclinação de 45 graus em relação aos eixos x e z
    // pulsar.rotation.x = Math.PI / 4; // 45 graus em radianos
    // pulsar.rotation.z = Math.PI / 4; // 45 graus em radianos
    

// Verifique o valor do slider e atualize a inclinação da esfera
const sliderValue = parseInt(document.getElementById('inclinação').value);
// Mapeia o valor do slider de 0 a 100 para 0 a 90 graus
const inclination = mapRange(sliderValue, 0, 100, 0, Math.PI/2);
pulsar.rotation.z = inclination;
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