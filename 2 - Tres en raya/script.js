const board = document.getElementById('board');
        const cells = document.querySelectorAll('.cell');
        const status = document.getElementById('status');
        const resetButton = document.getElementById('reset');
        let gameState = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        const HUMAN_PLAYER = 'X';
        const AI_PLAYER = 'O';

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
             if (gameState[clickedCellIndex] !== '' || !gameActive) {
                return;
            }
             gameState[clickedCellIndex] = HUMAN_PLAYER;
            clickedCell.textContent = HUMAN_PLAYER;
             if (checkWinner(HUMAN_PLAYER)) {
                endGame(false); // Indica que el humano ha ganado
                return;
            }
             if (gameState.includes('')) {
                status.textContent = 'Turno de la computadora...';
                disableCells(true);
                setTimeout(computerMove, 500);
            } else {
                endGame(true); // Indica que es un empate
            }
        }
         function computerMove() {
            let availableMoves = gameState.reduce((acc, cell, index) => {
                if (cell === '') acc.push(index);
                return acc;
            }, []);
             if (availableMoves.length > 0) {
                let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                gameState[randomMove] = AI_PLAYER;
                cells[randomMove].textContent = AI_PLAYER;
                 if (checkWinner(AI_PLAYER)) {
                    endGame(false); // Indica que la computadora ha ganado
                } else if (gameState.includes('')) {
                    status.textContent = 'Tu turno (X)';
                    disableCells(false);
                } else {
                    endGame(true); // Indica que es un empate
                }
            }
        }
         function checkWinner(player) {
            return winningConditions.some(condition => {
                return condition.every(index => {
                    return gameState[index] === player;
                });
            });
        }
         function endGame(draw) {
            if (draw) {
                status.textContent = '¡Empate!';
            } else {
                const winner = gameState[winningConditions[0][0]];
                status.textContent = winner === HUMAN_PLAYER ? '¡Has ganado!' : '¡La computadora ha ganado!';
                status.classList.add('winner');
            }
            gameActive = false;
        }

        function resetGame() {
            gameState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            status.textContent = 'Tu turno (X)';
            status.classList.remove('winner');
            cells.forEach(cell => cell.textContent = '');
        }

        function disableCells(disable) {
            cells.forEach(cell => {
                cell.style.pointerEvents = disable ? 'none' : 'auto';
            });
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetButton.addEventListener('click', resetGame);