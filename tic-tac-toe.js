const player = (name, symbol, isFirst) => {
  return { name, symbol, isFirst };
};

const gameBoard = (() => {
  let gameboard = [];

  return { gameboard };
})();

const displayController = (() => {
  let gameboardGrid = document.querySelector(".gameboard-grid");
  let gameboardCells = gameboardGrid.children;

  const changeGameboardDisplay = (change) => {
    for (let index = 0; index < gameboardCells.length; index++) {
      const gameboardCell = gameboardCells[index];
      const gameboardCellContent = gameboardCell.firstChild;

      if (change === "show") {
        gameboardCellContent.textContent = gameBoard.gameboard[index];
      } else if (change === "clear") {
        gameboardCellContent.textContent = "";
      }
    }
  };

  const showGameboardDisplay = () => {
    changeGameboardDisplay("show");
  };

  const clearGameboardDisplay = () => {
    changeGameboardDisplay("clear");
  };

  return { showGameboardDisplay, clearGameboardDisplay };
})();

gameBoard.gameboard = ["X", "X", "O", "O", "X", "O", "O", "X", "O"];
displayController.showGameboardDisplay();
