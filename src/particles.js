// ADICIONA PARTÍCULAS NOS CONES COMO LINHAS ANIMADAS
// Mantém a mesma proporção visual, extensão e tamanho dos segmentos do jato.

// Definir a quantidade de partículas
const quantidadeParticulas = 10000;
const quantidadeParticulas2 = 10000;

// Definir parâmetros do cone
const raioBaseInicial = 0.015;
const alturaCone = 2000;
const raioBaseFinal = 40;

const raioBaseInicial2 = 0.015;
const alturaCone2 = 2000;
const raioBaseFinal2 = 40;

// Comprimento visual de cada traço do jato (mantido igual ao código original)
const comprimentoSegmento = 10;

// Velocidade do fluxo do jato
const velocidadeJato = 70;

// Geometrias
const particulasGeometry = new THREE.BufferGeometry();
const particulas2Geometry = new THREE.BufferGeometry();

// Arrays de posição
const positions = new Float32Array(quantidadeParticulas * 3 * 2);
const positions2 = new Float32Array(quantidadeParticulas2 * 3 * 2);

// Dados-base das partículas para animação
const particleData = [];
const particleData2 = [];

function calcularRaioCone(alturaAtual, alturaMaxima, raioInicial, raioFinal) {
  const alturaNormalizada = alturaAtual / alturaMaxima;
  return raioInicial + alturaNormalizada * (raioFinal - raioInicial);
}

function preencherSegmentoNoCone(
  array,
  indexBase,
  alturaAtual,
  theta,
  alturaMaxima,
  raioInicial,
  raioFinal,
  direcao,
  raioNormalizado = 1
) {
  const raioMaximo = calcularRaioCone(
    alturaAtual,
    alturaMaxima,
    raioInicial,
    raioFinal
  );

  // sqrt(random) preserva distribuição homogênea em área dentro da seção circular
  const raio = raioMaximo * raioNormalizado;
  const x = raio * Math.cos(theta);
  const z = raio * Math.sin(theta);
  const yInicio = direcao > 0 ? alturaAtual : -alturaAtual;
  const yFim = yInicio + comprimentoSegmento * direcao;

  array[indexBase] = x;
  array[indexBase + 1] = yInicio;
  array[indexBase + 2] = z;

  array[indexBase + 3] = x;
  array[indexBase + 4] = yFim;
  array[indexBase + 5] = z;
}

// Cone positivo
for (let i = 0; i < quantidadeParticulas; i++) {
  const altura = Math.random() * alturaCone;
  const theta = Math.random() * Math.PI * 2;
  const raioNormalizado = Math.sqrt(Math.random());

  particleData.push({
    altura,
    theta,
    raioNormalizado,
    velocidade: velocidadeJato * (0.65 + Math.random() * 0.7),
  });

  preencherSegmentoNoCone(
    positions,
    i * 6,
    altura,
    theta,
    alturaCone,
    raioBaseInicial,
    raioBaseFinal,
    1,
    raioNormalizado
  );
}

// Cone negativo
for (let i = 0; i < quantidadeParticulas2; i++) {
  const altura = Math.random() * alturaCone2;
  const theta = Math.random() * Math.PI * 2;
  const raioNormalizado = Math.sqrt(Math.random());

  particleData2.push({
    altura,
    theta,
    raioNormalizado,
    velocidade: velocidadeJato * (0.65 + Math.random() * 0.7),
  });

  preencherSegmentoNoCone(
    positions2,
    i * 6,
    altura,
    theta,
    alturaCone2,
    raioBaseInicial2,
    raioBaseFinal2,
    -1,
    raioNormalizado
  );
}

// Adicionar as posições à geometria das linhas
particulasGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particulas2Geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions2, 3)
);

// Criar o material das linhas
const particulasMaterial = new THREE.LineBasicMaterial({ color: 0xfaed3a });
const particulas2Material = new THREE.LineBasicMaterial({ color: 0xfaed3a });

// Criar os objetos das linhas
const particulas = new THREE.LineSegments(particulasGeometry, particulasMaterial);
const particulas2 = new THREE.LineSegments(particulas2Geometry, particulas2Material);

// Adicionar as linhas como filhas da esfera
pulsar.add(particulas);
pulsar.add(particulas2);

function atualizarJatoDeParticulas(deltaTime) {
  const posAttr1 = particulasGeometry.attributes.position;
  const posAttr2 = particulas2Geometry.attributes.position;

  for (let i = 0; i < quantidadeParticulas; i++) {
    const p = particleData[i];
    p.altura += p.velocidade * deltaTime;

    if (p.altura > alturaCone) {
      p.altura = 0;
    }

    preencherSegmentoNoCone(
      positions,
      i * 6,
      p.altura,
      p.theta,
      alturaCone,
      raioBaseInicial,
      raioBaseFinal,
      1,
      p.raioNormalizado
    );
  }

  for (let i = 0; i < quantidadeParticulas2; i++) {
    const p = particleData2[i];
    p.altura += p.velocidade * deltaTime;

    if (p.altura > alturaCone2) {
      p.altura = 0;
    }

    preencherSegmentoNoCone(
      positions2,
      i * 6,
      p.altura,
      p.theta,
      alturaCone2,
      raioBaseInicial2,
      raioBaseFinal2,
      -1,
      p.raioNormalizado
    );
  }

  posAttr1.needsUpdate = true;
  posAttr2.needsUpdate = true;
}

// CHECKBOX JATO DE RADIAÇÃO
particulas.visible = false;
particulas2.visible = false;

function toggleCheckbox() {
  var checkbox = document.getElementById("beamsCheckbox");
  checkbox.checked = !checkbox.checked;
}

document
  .getElementById("beamsCheckbox")
  .addEventListener("change", function () {
    if (this.checked) {
      particulas.visible = true;
      particulas2.visible = true;
    } else {
      particulas.visible = false;
      particulas2.visible = false;
    }
  });

document.addEventListener("keydown", function (event) {
  if (event.key === "p" || event.key === "P") {
    toggleCheckbox();

    var checkbox = document.getElementById("beamsCheckbox");

    if (checkbox.checked) {
      particulas.visible = true;
      particulas2.visible = true;
    } else {
      particulas.visible = false;
      particulas2.visible = false;
    }
  }
});
