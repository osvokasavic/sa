const mazeSize = 10;
const maze = [];
let playerPosition = { x: 0, y: 0 };
let keysCollected = 0;

document.addEventListener('DOMContentLoaded', () => {
    createMaze();
    renderMaze();
});

function createMaze() {
    for (let y = 0; y < mazeSize; y++) {
        const row = [];
        for (let x = 0; x < mazeSize; x++) {
            if (x === 0 && y === 0) {
                row.push('start');
            } else if (x === mazeSize - 1 && y === mazeSize - 1) {
                row.push('end');
            } else {
                const isWall = Math.random() < 0.2;
                row.push(isWall ? 'wall' : 'path');
            }
        }
        maze.push(row);
    }
    // Place keys at random positions
    const numberOfKeys = 5;
    for (let i = 0; i < numberOfKeys; i++) {
        let keyPlaced = false;
        while (!keyPlaced) {
            const x = Math.floor(Math.random() * mazeSize);
            const y = Math.floor(Math.random() * mazeSize);
            if (maze[y][x] === 'path') {
                maze[y][x] = 'key';
                keyPlaced = true;
            }
        }
    }
}

function renderMaze() {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.innerHTML = '';
    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            const cell = document.createElement('div');
            cell.className = `cell ${maze[y][x]}`;
            if (x === playerPosition.x && y === playerPosition.y) {
                cell.innerHTML = 'P';
            } else if (maze[y][x] === 'key') {
                cell.innerHTML = 'K';
            }
            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(direction) {
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    if (direction === 'up' && y > 0) newY -= 1;
    if (direction === 'down' && y < mazeSize - 1) newY += 1;
    if (direction === 'left' && x > 0) newX -= 1;
    if (direction === 'right' && x < mazeSize - 1) newX += 1;

    if (maze[newY][newX] !== 'wall') {
        playerPosition = { x: newX, y: newY };
        if (maze[newY][newX] === 'key') {
            keysCollected += 1;
            document.getElementById('keys-count').textContent = keysCollected;
            maze[newY][newX] = 'path';
        }
        if (maze[newY][newX] === 'end') {
            alert(`Congratulations! You collected ${keysCollected} keys.`);
            restartGame();
        }
        renderMaze();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movePlayer('up');
    if (event.key === 'ArrowDown') movePlayer('down');
    if (event.key === 'ArrowLeft') movePlayer('left');
    if (event.key === 'ArrowRight') movePlayer('right');
});

function restartGame() {
    playerPosition = { x: 0, y: 0 };
    keysCollected = 0;
    document.getElementById('keys-count').textContent = keysCollected;
    createMaze();
    renderMaze();
}
