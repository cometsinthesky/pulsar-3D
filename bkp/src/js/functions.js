function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach(block => {
        ctx.fillStyle = block.color;
        ctx.block
        ctx.fillRect(block.x, block.y, blockWidth, blockHeight);
        ctx.fillStyle = '#000';
        ctx.font = '26px Arial';
        ctx.fillText(block.label, block.x + 40, block.y + 60);
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#f0f0f0';
        ctx.fillText(`Temp: ${block.temperature.toFixed(1)} °C`, block.x, block.y - 7);
        ctx.fillText(materialProperties[block.material].name, block.x + 30, block.y + blockHeight + 18);
    }
    )
}

// Variáveis globais
let equilibriumReached = false;

// Função de equalização de temperatura entre os blocos
function equalizeTemperature() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastUpdateTime) / temperatureExchangeRate; // Tempo decorrido em segundos

    for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
            const block1 = blocks[i];
            const block2 = blocks[j];
            const blocksInContact = block1.x < block2.x + blockWidth &&
                block1.x + blockWidth > block2.x &&
                block1.y < block2.y + blockHeight &&
                block1.y + blockHeight > block2.y;

            if (blocksInContact) {
                startTimer(); // Inicia o timer quando os blocos entram em contato
                // Calcular a quantidade de calor transferida (Q) usando a fórmula Q = mcΔT
                const mass1 = block1.mass;
                const mass2 = block2.mass;
                const specificHeat1 = materialProperties[block1.material].specificHeat;
                const specificHeat2 = materialProperties[block2.material].specificHeat;
                const temperatureDifference = Math.abs(block1.temperature - block2.temperature);
                let heatTransfer = (mass1 * specificHeat1 * temperatureDifference / (mass1 + mass2)) * deltaTime;

                // Verificar se o calor transferido excede a diferença de temperatura
                if (heatTransfer > temperatureDifference) {
                    heatTransfer = temperatureDifference;
                }

                // Atualizar as temperaturas dos blocos
                if (block1.temperature > block2.temperature) {
                    block1.temperature -= heatTransfer / (mass1 * specificHeat1);
                    block2.temperature += heatTransfer / (mass2 * specificHeat2);
                } else {
                    block1.temperature += heatTransfer / (mass1 * specificHeat1);
                    block2.temperature -= heatTransfer / (mass2 * specificHeat2);
                }

                // Verificar se as temperaturas estão dentro dos limites dos materiais
                const minTemperature = Math.min(materialProperties[block1.material].minTemperature, materialProperties[block2.material].minTemperature);
                const maxTemperature = Math.max(materialProperties[block1.material].maxTemperature, materialProperties[block2.material].maxTemperature);
                block1.temperature = Math.max(minTemperature, Math.min(maxTemperature, block1.temperature));
                block2.temperature = Math.max(minTemperature, Math.min(maxTemperature, block2.temperature));


                // Verificar o equilíbrio térmico após a equalização de temperatura
                if (Math.abs(block1.temperature - block2.temperature) < 0.05 && !equilibriumReached) {
                    showEquilibriumMessage();
                    equilibriumReached = true;
                }

                // Condições de temperatura e troca de materiais 

                // Verificar se o material do bloco de gelo deve mudar para água
                if (block1.material === 'ice' && block1.temperature > 0) {
                    changeMaterial(i, 'water', block1);
                } else if (block2.material === 'ice' && block2.temperature > 0) {
                    changeMaterial(j, 'water', block2);
                }

                // Verificar se o material do bloco de água deve mudar para gelo
                if (block1.material === 'water' && block1.temperature <= 0) {
                    changeMaterial(i, 'ice', block1);
                } else if (block2.material === 'water' && block2.temperature <= 0) {
                    changeMaterial(j, 'ice', block2);
                }

                // Verificar se o material do bloco de água deve mudar para vapor
                if (block1.material === 'water' && block1.temperature > 100) {
                    changeMaterial(i, 'watervapour', block1);
                } else if (block2.material === 'water' && block2.temperature > 100) {
                    changeMaterial(j, 'watervapour', block2);
                }

                // Verificar se o material do bloco vapor deve mudar para água
                if (block1.material === 'watervapour' && block1.temperature <= 100) {
                    changeMaterial(i, 'water', block1);
                } else if (block2.material === 'watervapour' && block2.temperature <= 100) {
                    changeMaterial(j, 'water', block2);
                }
            }
        }
    }

    lastUpdateTime = currentTime;
}

function showEquilibriumMessage() {
    const equilibriumMessage = document.getElementById('equilibriumMessage');
    equilibriumMessage.classList.remove('hidden');
}




// Atualiza o material do bloco a partir da temperatura do bloco

function increaseTemperature(blockIndex) {
    const block = blocks[blockIndex];
    block.temperature += 10;

    // gelo para água
    if (block.material === 'ice' && block.temperature > 0) {
        changeMaterial(blockIndex, 'water', block)

        if (blockIndex === 0) {
            document.getElementById("block-a-select").value = "water"
        }

        else if (blockIndex === 1) {
            document.getElementById("block-b-select").value = "water"
        }

        else if (blockIndex === 2) {
            document.getElementById("block-c-select").value = "water"
        }
    }

    //água para vapor
    if (block.material === 'water' && block.temperature >= 100) {
        changeMaterial(blockIndex, 'watervapour', block)

        if (blockIndex === 0) {
            document.getElementById("block-a-select").value = "watervapour"
        }

        else if (blockIndex === 1) {
            document.getElementById("block-b-select").value = "watervapour"
        }

        else if (blockIndex === 2) {
            document.getElementById("block-c-select").value = "watervapour"
        }
    }
}

lastUpdateTime = currentTime;


// Diminui temperatura bloco

function decreaseTemperature(blockIndex) {
    const block = blocks[blockIndex];
    block.temperature -= 10;
    // Verificar se a temperatura atingiu o zero absoluto
    if (block.temperature < -273.15) {
        block.temperature = -273.15;
    } else if (block.temperature <= 0 && block.temperature > -273.15)

        //água para gelo
        if (block.material === 'water' && block.temperature < 0) {
            changeMaterial(blockIndex, 'ice', block)

            if (blockIndex === 0) {
                document.getElementById("block-a-select").value = "ice"
            }

            else if (blockIndex === 1) {
                document.getElementById("block-b-select").value = "ice"
            }

            else if (blockIndex === 2) {
                document.getElementById("block-c-select").value = "ice"
            }
        }

    // vapor para água
    if (block.material === 'watervapour' && block.temperature < 100) {
        changeMaterial(blockIndex, 'water', block)

        if (blockIndex === 0) {
            document.getElementById("block-a-select").value = "water"
        }

        else if (blockIndex === 1) {
            document.getElementById("block-b-select").value = "water"
        }

        else if (blockIndex === 2) {
            document.getElementById("block-c-select").value = "water"
        }
    }
}

lastUpdateTime = currentTime;

function handleMouseDown(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    blocks.forEach((block, index) => {
        if (mouseX >= block.x && mouseX <= block.x + blockWidth &&
            mouseY >= block.y && mouseY <= block.y + blockHeight) {
            selectedBlockIndex = index;
            initialX = mouseX - block.x;
            initialY = mouseY - block.y;
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
        }
    });
}

function handleMouseMove(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (selectedBlockIndex !== -1) {
        const block = blocks[selectedBlockIndex];
        block.x = mouseX - initialX;
        block.y = mouseY - initialY;
        drawBlocks();
    }
}

function handleMouseUp() {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
    selectedBlockIndex = -1;
}

function changeMaterial(blockIndex, material, currentBlock) {
    blocks[blockIndex].material = material;
    blocks[blockIndex].specificHeat = materialProperties[material].specificHeat;
    blocks[blockIndex].latentHeat = materialProperties[material].latentHeat;
    blocks[blockIndex].temperature = currentBlock.temperature;
}


//TO-DO
// Atualizar automaticamente o botão correspondente
const selectElementId = `block-${blockIndex}-select`;
document.getElementById(selectElementId).value = material;




function setupInitialMaterialConditions(blockIndex, material) {
    blocks[blockIndex].material = material;
    blocks[blockIndex].specificHeat = materialProperties[material].specificHeat;
    blocks[blockIndex].latentHeat = materialProperties[material].latentHeat;
    blocks[blockIndex].temperature = materialProperties[material].averageTemperature;
}

function handleMaterialSelection(event) {
    const material = event.target.getAttribute('data-material');
    const blockIndex = blocks.findIndex(block => block.label === event.target.getAttribute('data-block'));

    if (blockIndex !== -1) {
        setupInitialMaterialConditions(blockIndex, material);
    }
}

// 
function handleMaterialSelectionForBlockA(event) {
    let material = event.target.value;

    /** Numero 0 no primeiro argumento indica a posicao do bloco no array de blocks.
    * O numero deve variar de acordo com a posicao do bloco no array.
    */
    setupInitialMaterialConditions(0, material);
}

function handleMaterialSelectionForBlockB(event) {
    let material = event.target.value;


    /** Numero 0 no primeiro argumento indica a posicao do bloco no array de blocks.
    * O numero deve variar de acordo com a posicao do bloco no array.
    */
    setupInitialMaterialConditions(1, material);
}

function handleMaterialSelectionForBlockC(event) {
    let material = event.target.value;


    /** Numero 0 no primeiro argumento indica a posicao do bloco no array de blocks.
    * O numero deve variar de acordo com a posicao do bloco no array.
    */
    setupInitialMaterialConditions(2, material);
}


// Função Run Simulation
function runSimulation() {
    if (isSimulationRunning) {
        equalizeTemperature();
        drawBlocks();
    }
    requestAnimationFrame(runSimulation);
}



