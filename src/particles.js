// ADICIONA PARTÍCULAS NOS CONES COMO LINHAS
// Definir a quantidade de partículas
const quantidadeParticulas = 10000;

// Definir parâmetros do cone
const raioBaseInicial = 0.05;
const alturaCone = 2000;
const raioBaseFinal = 80; // Vértice do cone

// Criar a geometria das linhas
const particulasGeometry = new THREE.BufferGeometry();

// Criar arrays para armazenar as posições das linhas
const positions = new Float32Array(quantidadeParticulas * 3 * 2); // * 2 porque cada linha tem dois pontos

// Preencher os arrays com posições ao longo do cone
for (let i = 0; i < quantidadeParticulas; i++) {
    // Gerar coordenadas cilíndricas aleatórias dentro do cone
    const altura = Math.random() * alturaCone;
    const alturaNormalizada = altura / alturaCone; // Normaliza a altura entre 0 e 1
    const theta = Math.random() * Math.PI * 2; // Ângulo aleatório

    // Calcula o raio usando uma função cônica para evitar aglomeração nas bordas
    const raio = raioBaseInicial + alturaNormalizada * (raioBaseFinal - raioBaseInicial);

    // Converter coordenadas cilíndricas para cartesianas
    const x = raio * Math.cos(theta);
    const z = raio * Math.sin(theta);

    // Definir a posição do início da linha
    positions[i * 6] = x;
    positions[i * 6 + 1] = altura;
    positions[i * 6 + 2] = z;

    // Definir a posição do fim da linha (um pouco deslocada)
    positions[i * 6 + 3] = x;
    positions[i * 6 + 4] = altura + 5; // Ajuste a altura para um pequeno deslocamento
    positions[i * 6 + 5] = z;
}

// Adicionar as posições à geometria das linhas
particulasGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Criar o material das linhas
const particulasMaterial = new THREE.LineBasicMaterial({ color: 0xfaed3a });

// Criar o objeto das linhas
const particulas = new THREE.LineSegments(particulasGeometry, particulasMaterial);

// Adicionar as linhas como filhas da esfera
pulsar.add(particulas);

// ADD PARTÍCULAS CONE NEGATIVO COMO LINHAS
// Definir a quantidade de partículas
const quantidadeParticulas2 = 10000;

// Definir parâmetros do cone
const raioBaseInicial2 = 0.05;
const alturaCone2 = 2000;
const raioBaseFinal2 = 80; // Vértice do cone

// Criar a geometria das linhas
const particulas2Geometry = new THREE.BufferGeometry();

// Criar arrays para armazenar as posições das linhas
const positions2 = new Float32Array(quantidadeParticulas2 * 3 * 2); // * 2 porque cada linha tem dois pontos

// Preencher os arrays com posições ao longo do cone
for (let i = 0; i < quantidadeParticulas2; i++) {
    // Gerar coordenadas cilíndricas aleatórias dentro do cone
    const altura = (Math.random() * -1) * alturaCone2;
    const alturaNormalizada = altura / alturaCone2; // Normaliza a altura entre 0 e 1
    const theta = Math.random() * Math.PI * 2; // Ângulo aleatório

    // Calcula o raio usando uma função cônica para evitar aglomeração nas bordas
    const raio = raioBaseInicial2 + alturaNormalizada * (raioBaseFinal2 - raioBaseInicial2);

    // Converter coordenadas cilíndricas para cartesianas
    const x = raio * Math.cos(theta);
    const z = raio * Math.sin(theta);

    // Definir a posição do início da linha
    positions2[i * 6] = x;
    positions2[i * 6 + 1] = altura;
    positions2[i * 6 + 2] = z;

    // Definir a posição do fim da linha (um pouco deslocada)
    positions2[i * 6 + 3] = x;
    positions2[i * 6 + 4] = altura - 5; // Ajuste a altura para um pequeno deslocamento
    positions2[i * 6 + 5] = z;
}

// Adicionar as posições à geometria das linhas
particulas2Geometry.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

// Criar o material das linhas
const particulas2Material = new THREE.LineBasicMaterial({ color: 0xfaed3a });

// Criar o objeto das linhas
const particulas2 = new THREE.LineSegments(particulas2Geometry, particulas2Material);


//CHECKBOX JATO DE RADIAÇÃO
// Inicialmente, ocultar as partículas
particulas.visible = false;
particulas2.visible = false;

// Adicionar um evento de escuta à checkbox
document.getElementById('beamsCheckbox').addEventListener('change', function () {
    if (this.checked) {
        // Se a checkbox for selecionada, mostrar as partículas
        particulas.visible = true;
        particulas2.visible = true;
    } else {
        // Se a checkbox for desmarcada, ocultar as partículas
        particulas.visible = false;
        particulas2.visible = false;
    }
});


// Adicionar as linhas como filhas da esfera
pulsar.add(particulas2);
