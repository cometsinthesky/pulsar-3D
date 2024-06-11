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
      if (typeof callback === "function") {
        callback();
      }
    }
  }, speed);
}

// Seleciona os elementos parágrafo
const paragraphElement = document.querySelector(
  ".landing-content .landing-paragraph"
);

// Texto para o parágrafo
const paragraphText =
  "Explore o fascinante mundo dos pulsares em uma experiência tridimensional!"; // Certifique-se de que o texto esteja correto

// Velocidades de digitação em milissegundos para o parágrafo
const paragraphTypingSpeed = 50;

setTimeout(() => {
  // Aplica o efeito de máquina de escrever ao parágrafo
  typewriterEffect(paragraphElement, paragraphText, paragraphTypingSpeed);
}, 4000);

// GSAP FADE IN CONTROLER
document.addEventListener("DOMContentLoaded", function () {
  gsap.from(".fade-in-hover", { opacity: 0, duration: 5, delay: 1 });
  gsap.from(".fade-in-title", { opacity: 0, duration: 5, delay: 3 });
  gsap.from(".fade-in-paragraph", { opacity: 0, duration: 5, delay: 3 });
});

//INSTRUCTION BUTTON AND CONTAINER TOGGLE
window.addEventListener("click", function (event) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var joystickIcon = document.querySelector(".dropdown-btn");

  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.style.display === "block") {
      if (
        event.target !== openDropdown &&
        !openDropdown.contains(event.target) &&
        event.target !== joystickIcon &&
        !joystickIcon.contains(event.target)
      ) {
        openDropdown.style.display = "none";
      }
    }
  }
});

document
  .querySelector(".dropdown-btn")
  .addEventListener("click", function (event) {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

document
  .querySelector(".dropdown-content")
  .addEventListener("click", function (event) {
    if (event.target !== this) {
      this.style.display = "none";
    }
  });

document
  .querySelector(".dropdown-content")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });

// BUTTON ENTER SIMULATION
const button = document.querySelector(".enter-button");

// Define as cores
const colors = ["#45a049", "#4CAF50"];

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
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("fade-out");
  // Substitui a entrada atual no histórico de navegação pela página da simulação
  history.replaceState({}, "", "index.html");
}

// Show hidden elements when enter button clicked
document.querySelector(".enter-button").addEventListener("click", function () {
  const backgroundElements = document.querySelectorAll(".hidden");
  backgroundElements.forEach((element) => {
    element.classList.remove("hidden");
  });
});

// Adiciona um ouvinte de evento de transição ao elemento .overlay
const overlay = document.querySelector(".overlay");
overlay.addEventListener("transitionend", function (event) {
  // Verifica se a transição que terminou é a de opacidade
  if (event.propertyName === "opacity") {
    // Remove o elemento .overlay do DOM
    overlay.remove();
    // Inicia a animação do pulsar
    isRotationRunning = true;

    // Remove a classe 'hidden' dos elementos do menu após a transição
    const menu = document.querySelector(".menu");
    menu.classList.remove("hidden");

    // Remove a classe 'hidden' dos elementos de slider e checkboxes após a transição
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
      slider.classList.remove("hidden");
    });
    const checkboxes = document.querySelector(".checkboxes");
    checkboxes.classList.remove("hidden");
  }
});

document.querySelector(".enter-button").addEventListener("click", function () {
  // Remove a classe 'hidden' dos elementos do fundo quando o botão for clicado
  const backgroundElements = document.querySelectorAll(".hidden");
  backgroundElements.forEach((element) => {
    element.classList.remove("hidden");
  });
});
