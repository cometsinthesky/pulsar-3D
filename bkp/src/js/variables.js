let initialX, initialY;
let selectedBlockIndex = -1;
let isSimulationRunning = true;
let lastUpdateTime = Date.now();


const blockWidth = 100;
const blockHeight = 100;
const timeInterval = 10000; // Intervalo de tempo em milissegundos


const ctx = canvas.getContext('2d');

const blocks = [
  {
    x: 75,
    y: 60,
    color: '#ff6666',
    temperature: 0,
    label: 'A',
    material: 'ice',
    mass: 1
  },
  {
    x: 275,
    y: 60,
    color: '#00bfff',
    temperature: 60,
    label: 'B',
    material: 'water',
    mass: 1
  },
  {
    x: 475,
    y: 60,
    color: '#28f200',
    temperature: 20,
    label: 'C',
    material: 'glass',
    mass: 1
  }
];

// Slider

const exchangeRateSlider = document.getElementById('exchangeRateSlider');
const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');

// Mapeando os valores do slider para valores de taxa de troca de temperatura
const exchangeRateValues = [30000, 20000, 10000, 5000, 1000];

// Definir o valor inicial do slider e da taxa de troca de temperatura para 10000
exchangeRateSlider.value = 2;
let temperatureExchangeRate = exchangeRateValues[2];

// Atualiza o valor da taxa de troca de temperatura e exibe na tela
function updateExchangeRate() {
  const sliderValue = exchangeRateSlider.value;
  const exchangeRate = exchangeRateValues[sliderValue];
  temperatureExchangeRate = exchangeRate; // Atualiza o valor da constante temperatureExchangeRate
}

exchangeRateSlider.addEventListener('input', updateExchangeRate);

// Inicializa o display com o valor padrão do slider
updateExchangeRate();
