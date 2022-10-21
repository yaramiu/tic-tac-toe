const player = (name, marker, isFirst) => {
  return { name, marker, isFirst };
};

const gameBoard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const reset = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
  };

  const get = () => {
    return gameboard;
  };

  const change = (index, marker) => {
    gameboard[index] = marker;
  };

  const isIndexEmpty = (index) => {
    if (gameboard[index] === "") {
      return true;
    }
    return false;
  };

  return { get, reset, change, isIndexEmpty };
})();

const displayController = (() => {
  const gameboardGrid = document.querySelector(".gameboard-grid");
  const gameboardCells = gameboardGrid.children;
  let turn = 1;
  const MAX_TURNS = 9;

  const showGameboardDisplay = () => {
    for (let index = 0; index < gameboardCells.length; index++) {
      const gameboardCell = gameboardCells[index];
      const gameboardCellContent = gameboardCell.children[0];

      gameboardCellContent.textContent = gameBoard.get()[index];
    }
  };

  const clearGameboardDisplay = () => {
    gameBoard.reset();
    showGameboardDisplay();
  };

  const ticTacToe = () => {
    for (let index = 0; index < gameboardCells.length; index++) {
      const gameboardCell = gameboardCells[index];
      const gameboardCellContent = gameboardCell.children[0];

      gameboardCellContent.addEventListener("click", () => {
        if (turn <= MAX_TURNS) {
          if (gameBoard.isIndexEmpty(index)) {
            if (turn % 2 !== 0) {
              gameBoard.change(index, "X");
            } else {
              gameBoard.change(index, "O");
            }
            turn++;
            showGameboardDisplay();
          }
        }
      });
    }
  };

  return {
    showGameboardDisplay,
    clearGameboardDisplay,
    ticTacToe,
  };
})();

displayController.ticTacToe();
