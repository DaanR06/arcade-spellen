// 2048 Game Logic
const game2048 = {
    grid: [],
    score: 0,
    gridSize: 4,

    init: function() {
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(0));
        this.score = 0;
        this.updateScore();
        this.addNewNumber();
        this.addNewNumber();
        this.updateGrid();
    },

    addNewNumber: function() {
        const emptyCells = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({x: i, y: j});
                }
            }
        }
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
        }
    },

    updateGrid: function() {
        const gridElement = document.getElementById('grid');
        if (!gridElement) return; // Exit if not on 2048 page
        
        gridElement.innerHTML = '';
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                const value = this.grid[i][j];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.setAttribute('data-value', value);
                }
                gridElement.appendChild(cell);
            }
        }
    },

    updateScore: function() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    },

    moveCells: function(direction) {
        let moved = false;

        switch(direction) {
            case 'up':
                for (let j = 0; j < this.gridSize; j++) {
                    for (let i = 1; i < this.gridSize; i++) {
                        if (this.grid[i][j] !== 0) {
                            let row = i;
                            while (row > 0 && (this.grid[row-1][j] === 0 || this.grid[row-1][j] === this.grid[row][j])) {
                                if (this.grid[row-1][j] === 0) {
                                    this.grid[row-1][j] = this.grid[row][j];
                                    this.grid[row][j] = 0;
                                    moved = true;
                                } else if (this.grid[row-1][j] === this.grid[row][j]) {
                                    this.grid[row-1][j] *= 2;
                                    this.score += this.grid[row-1][j];
                                    this.grid[row][j] = 0;
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
                for (let j = 0; j < this.gridSize; j++) {
                    for (let i = this.gridSize-2; i >= 0; i--) {
                        if (this.grid[i][j] !== 0) {
                            let row = i;
                            while (row < this.gridSize-1 && (this.grid[row+1][j] === 0 || this.grid[row+1][j] === this.grid[row][j])) {
                                if (this.grid[row+1][j] === 0) {
                                    this.grid[row+1][j] = this.grid[row][j];
                                    this.grid[row][j] = 0;
                                    moved = true;
                                } else if (this.grid[row+1][j] === this.grid[row][j]) {
                                    this.grid[row+1][j] *= 2;
                                    this.score += this.grid[row+1][j];
                                    this.grid[row][j] = 0;
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
                for (let i = 0; i < this.gridSize; i++) {
                    for (let j = 1; j < this.gridSize; j++) {
                        if (this.grid[i][j] !== 0) {
                            let col = j;
                            while (col > 0 && (this.grid[i][col-1] === 0 || this.grid[i][col-1] === this.grid[i][col])) {
                                if (this.grid[i][col-1] === 0) {
                                    this.grid[i][col-1] = this.grid[i][col];
                                    this.grid[i][col] = 0;
                                    moved = true;
                                } else if (this.grid[i][col-1] === this.grid[i][col]) {
                                    this.grid[i][col-1] *= 2;
                                    this.score += this.grid[i][col-1];
                                    this.grid[i][col] = 0;
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
                for (let i = 0; i < this.gridSize; i++) {
                    for (let j = this.gridSize-2; j >= 0; j--) {
                        if (this.grid[i][j] !== 0) {
                            let col = j;
                            while (col < this.gridSize-1 && (this.grid[i][col+1] === 0 || this.grid[i][col+1] === this.grid[i][col])) {
                                if (this.grid[i][col+1] === 0) {
                                    this.grid[i][col+1] = this.grid[i][col];
                                    this.grid[i][col] = 0;
                                    moved = true;
                                } else if (this.grid[i][col+1] === this.grid[i][col]) {
                                    this.grid[i][col+1] *= 2;
                                    this.score += this.grid[i][col+1];
                                    this.grid[i][col] = 0;
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
            this.addNewNumber();
            this.updateScore();
            this.updateGrid();
            this.checkGameOver();
        }
    },

    checkGameOver: function() {
        // Controleer of er lege cellen zijn
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) return;
            }
        }

        // Controleer of er nog mogelijke zetten zijn
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (j < this.gridSize-1 && this.grid[i][j] === this.grid[i][j+1]) return;
                if (i < this.gridSize-1 && this.grid[i][j] === this.grid[i+1][j]) return;
            }
        }

        alert('Game Over! Je score is: ' + this.score);
    },

    reset: function() {
        this.init();
    }
};

// Event listeners voor toetsenbord
document.addEventListener('keydown', (event) => {
    // Check if we're on the 2048 page
    if (window.location.pathname.includes('2048')) {
        switch(event.key) {
            case 'ArrowUp':
                game2048.moveCells('up');
                break;
            case 'ArrowDown':
                game2048.moveCells('down');
                break;
            case 'ArrowLeft':
                game2048.moveCells('left');
                break;
            case 'ArrowRight':
                game2048.moveCells('right');
                break;
        }
    }
});

// Initialiseer het juiste spel wanneer de pagina laadt
window.addEventListener('load', () => {
    if (window.location.pathname.includes('2048')) {
        game2048.init();
    }
}); 