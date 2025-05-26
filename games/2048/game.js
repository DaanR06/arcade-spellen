let grid = [];
let score = 0;
const gridSize = 4;

// Initialiseer het spel
function initGame() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    score = 0;
    updateScore();
    addNewNumber();
    addNewNumber();
    updateGrid();
}

// Voeg een nieuw nummer toe (2 of 4)
function addNewNumber() {
    const emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update de grid weergave
function updateGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            const value = grid[i][j];
            if (value !== 0) {
                cell.textContent = value;
                cell.setAttribute('data-value', value);
            }
            gridElement.appendChild(cell);
        }
    }
}

// Update de score
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Verplaats de cellen
function moveCells(direction) {
    let moved = false;
    const oldGrid = JSON.stringify(grid);

    switch(direction) {
        case 'up':
            for (let j = 0; j < gridSize; j++) {
                for (let i = 1; i < gridSize; i++) {
                    if (grid[i][j] !== 0) {
                        let row = i;
                        while (row > 0 && (grid[row-1][j] === 0 || grid[row-1][j] === grid[row][j])) {
                            if (grid[row-1][j] === 0) {
                                grid[row-1][j] = grid[row][j];
                                grid[row][j] = 0;
                                moved = true;
                            } else if (grid[row-1][j] === grid[row][j]) {
                                grid[row-1][j] *= 2;
                                score += grid[row-1][j];
                                grid[row][j] = 0;
                                moved = true;
                                break;
                            }
                            row--;
                        }
                    }
                }
            }
            break;
        case 'down':
            for (let j = 0; j < gridSize; j++) {
                for (let i = gridSize-2; i >= 0; i--) {
                    if (grid[i][j] !== 0) {
                        let row = i;
                        while (row < gridSize-1 && (grid[row+1][j] === 0 || grid[row+1][j] === grid[row][j])) {
                            if (grid[row+1][j] === 0) {
                                grid[row+1][j] = grid[row][j];
                                grid[row][j] = 0;
                                moved = true;
                            } else if (grid[row+1][j] === grid[row][j]) {
                                grid[row+1][j] *= 2;
                                score += grid[row+1][j];
                                grid[row][j] = 0;
                                moved = true;
                                break;
                            }
                            row++;
                        }
                    }
                }
            }
            break;
        case 'left':
            for (let i = 0; i < gridSize; i++) {
                for (let j = 1; j < gridSize; j++) {
                    if (grid[i][j] !== 0) {
                        let col = j;
                        while (col > 0 && (grid[i][col-1] === 0 || grid[i][col-1] === grid[i][col])) {
                            if (grid[i][col-1] === 0) {
                                grid[i][col-1] = grid[i][col];
                                grid[i][col] = 0;
                                moved = true;
                            } else if (grid[i][col-1] === grid[i][col]) {
                                grid[i][col-1] *= 2;
                                score += grid[i][col-1];
                                grid[i][col] = 0;
                                moved = true;
                                break;
                            }
                            col--;
                        }
                    }
                }
            }
            break;
        case 'right':
            for (let i = 0; i < gridSize; i++) {
                for (let j = gridSize-2; j >= 0; j--) {
                    if (grid[i][j] !== 0) {
                        let col = j;
                        while (col < gridSize-1 && (grid[i][col+1] === 0 || grid[i][col+1] === grid[i][col])) {
                            if (grid[i][col+1] === 0) {
                                grid[i][col+1] = grid[i][col];
                                grid[i][col] = 0;
                                moved = true;
                            } else if (grid[i][col+1] === grid[i][col]) {
                                grid[i][col+1] *= 2;
                                score += grid[i][col+1];
                                grid[i][col] = 0;
                                moved = true;
                                break;
                            }
                            col++;
                        }
                    }
                }
            }
            break;
    }

    if (moved) {
        addNewNumber();
        updateScore();
        updateGrid();
        checkGameOver();
    }
}

// Controleer of het spel voorbij is
function checkGameOver() {
    // Controleer of er lege cellen zijn
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) return;
        }
    }

    // Controleer of er nog mogelijke zetten zijn
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (j < gridSize-1 && grid[i][j] === grid[i][j+1]) return;
            if (i < gridSize-1 && grid[i][j] === grid[i+1][j]) return;
        }
    }

    alert('Game Over! Je score is: ' + score);
}

// Reset het spel
function resetGame() {
    initGame();
}

// Event listeners voor toetsenbord
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            moveCells('up');
            break;
        case 'ArrowDown':
            moveCells('down');
            break;
        case 'ArrowLeft':
            moveCells('left');
            break;
        case 'ArrowRight':
            moveCells('right');
            break;
    }
});

// Start het spel
initGame(); 