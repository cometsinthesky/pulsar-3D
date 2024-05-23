// Função para desenhar linhas de campo magnético
function drawFieldLines() {
  const numLines = 20; // Número de linhas de campo
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7cd5ff, transparent: true, opacity: 0.8 });
  const lines = []; // Array para armazenar as linhas

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
      lines.push(line); // Adiciona a linha ao array
  }

  return lines; // Retorna todas as linhas criadas
}

clearFieldLines()

// Selecione o checkbox pelo ID
const checkbox = document.getElementById('fieldCheckbox');

// Adicione um event listener para o evento de mudança
checkbox.addEventListener('change', function() {
    // Verifique se o checkbox está selecionado
    if (this.checked) {
        // Se estiver selecionado, chame a função drawFieldLines
        const lines = drawFieldLines(); // Desenha as linhas
        lines.forEach(line => scene.add(line)); // Adiciona as linhas à cena
    } else {
        // Se não estiver selecionado, limpe as linhas da cena
        clearFieldLines();
    }
});

// Função para limpar as linhas de campo magnético da cena
function clearFieldLines() {
  // Remova todas as linhas da cena
  const linesToRemove = [];
  scene.children.forEach((child) => {
      if (child instanceof THREE.Line) {
          linesToRemove.push(child);
      }
  });
  linesToRemove.forEach((line) => {
      scene.remove(line);
  });
}
