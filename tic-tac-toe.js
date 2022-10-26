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
    return gameboard[index] === "";
  };

  const checkWinnerOrTie = () => {
    let hasPlayerWon = false;
    let hasPlayersTied = false;
    let winningPlayer = 0;
    let winningPosition = "";
    let result = [hasPlayerWon, hasPlayersTied, winningPlayer, winningPosition];
    const topHorizontalXWin =
      gameboard[0] === "X" && gameboard[1] === "X" && gameboard[2] === "X";
    const topHoriztonalOWin =
      gameboard[0] === "O" && gameboard[1] === "O" && gameboard[2] === "O";
    const middleHorizontalXWin =
      gameboard[3] === "X" && gameboard[4] === "X" && gameboard[5] === "X";
    const middleHorizontalOWin =
      gameboard[3] === "O" && gameboard[4] === "O" && gameboard[5] === "O";
    const bottomHoriztonalXWin =
      gameboard[6] === "X" && gameboard[7] === "X" && gameboard[8] === "X";
    const bottomHorizontalOWin =
      gameboard[6] === "O" && gameboard[7] === "O" && gameboard[8] === "O";
    const leftVerticalXWin =
      gameboard[0] === "X" && gameboard[3] === "X" && gameboard[6] === "X";
    const leftVerticalOWin =
      gameboard[0] === "O" && gameboard[3] === "O" && gameboard[6] === "O";
    const centerVerticalXWin =
      gameboard[1] === "X" && gameboard[4] === "X" && gameboard[7] === "X";
    const centerVeritcalOWin =
      gameboard[1] === "O" && gameboard[4] === "O" && gameboard[7] === "O";
    const rightVerticalXWin =
      gameboard[2] === "X" && gameboard[5] === "X" && gameboard[8] === "X";
    const rightVerticalOWin =
      gameboard[2] === "O" && gameboard[5] === "O" && gameboard[8] === "O";
    const downwardDiagonalXWin =
      gameboard[0] === "X" && gameboard[4] === "X" && gameboard[8] === "X";
    const downwardDiagonalOWin =
      gameboard[0] === "O" && gameboard[4] === "O" && gameboard[8] === "O";
    const upwardDiagonalXWin =
      gameboard[6] === "X" && gameboard[4] === "X" && gameboard[2] === "X";
    const upwardDiagonalOWin =
      gameboard[6] === "O" && gameboard[4] === "O" && gameboard[2] === "O";

    if (topHorizontalXWin) {
      result = [true, false, 1, "top-horizontal"];
    } else if (topHoriztonalOWin) {
      result = [true, false, 2, "top-horizontal"];
    } else if (middleHorizontalXWin) {
      result = [true, false, 1, "middle-horizontal"];
    } else if (middleHorizontalOWin) {
      result = [true, false, 2, "middle-horizontal"];
    } else if (bottomHoriztonalXWin) {
      result = [true, false, 1, "bottom-horizontal"];
    } else if (bottomHorizontalOWin) {
      result = [true, false, 2, "bottom-horizontal"];
    } else if (leftVerticalXWin) {
      result = [true, false, 1, "left-vertical"];
    } else if (leftVerticalOWin) {
      result = [true, false, 2, "left-vertical"];
    } else if (centerVerticalXWin) {
      result = [true, false, 1, "center-vertical"];
    } else if (centerVeritcalOWin) {
      result = [true, false, 2, "center-vertical"];
    } else if (rightVerticalXWin) {
      result = [true, false, 1, "right-vertical"];
    } else if (rightVerticalOWin) {
      result = [true, false, 2, "right-vertical"];
    } else if (downwardDiagonalXWin) {
      result = [true, false, 1, "downward-diagonal"];
    } else if (downwardDiagonalOWin) {
      result = [true, false, 2, "downward-diagonal"];
    } else if (upwardDiagonalXWin) {
      result = [true, false, 1, "upward-diagonal"];
    } else if (upwardDiagonalOWin) {
      result = [true, false, 2, "upward-diagonal"];
    } else {
      if (isBoardFull()) {
        console.log(gameboard);
        console.log("board is full");
        result = [false, true, 0, ""];
      } else {
        result = [false, false, 0, ""];
      }
    }

    return result;
  };

  const isBoardFull = () => {
    for (let index = 0; index < gameboard.length; index++) {
      const gameboardCell = gameboard[index];
      if (gameboardCell === "") {
        return false;
      }
    }

    return true;
  };

  return { get, reset, change, isIndexEmpty, checkWinnerOrTie };
})();

const displayController = (() => {
  const gameboardGrid = document.querySelector(".gameboard-grid");
  const gameboardCells = gameboardGrid.children;
  let turn = 1;
  const MAX_TURNS = 9;
  let isGameFinished = false;

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

  const styleGameboardDisplay = (winningPosition) => {
    const topLeftCell = document.querySelector(".top.left");
    const topCenterCell = document.querySelector(".top.center");
    const topRightCell = document.querySelector(".top.right");
    const middleLeftCell = document.querySelector(".middle.left");
    const middleCenterCell = document.querySelector(".middle.center");
    const middleRightCell = document.querySelector(".middle.right");
    const bottomLeftCell = document.querySelector(".bottom.left");
    const bottomCenterCell = document.querySelector(".bottom.center");
    const bottomRightCell = document.querySelector(".bottom.right");

    switch (winningPosition) {
      case "top-horizontal":
        topLeftCell.classList.add("win");
        topLeftCell.lastElementChild.classList.add("horizontal");
        topCenterCell.classList.add("win");
        topCenterCell.lastElementChild.classList.add("horizontal");
        topRightCell.classList.add("win");
        topRightCell.lastElementChild.classList.add("horizontal");
        break;
      case "middle-horizontal":
        middleLeftCell.classList.add("win");
        middleLeftCell.lastElementChild.classList.add("horizontal");
        middleCenterCell.classList.add("win");
        middleCenterCell.lastElementChild.classList.add("horizontal");
        middleRightCell.classList.add("win");
        middleRightCell.lastElementChild.classList.add("horizontal");
        break;
      case "bottom-horizontal":
        bottomLeftCell.classList.add("win");
        bottomLeftCell.lastElementChild.classList.add("horizontal");
        bottomCenterCell.classList.add("win");
        bottomCenterCell.lastElementChild.classList.add("horizontal");
        bottomRightCell.classList.add("win");
        bottomRightCell.lastElementChild.classList.add("horizontal");
        break;
      case "left-vertical":
        topLeftCell.classList.add("win");
        topLeftCell.lastElementChild.classList.add("vertical");
        middleLeftCell.classList.add("win");
        middleLeftCell.lastElementChild.classList.add("vertical");
        bottomLeftCell.classList.add("win");
        bottomLeftCell.lastElementChild.classList.add("vertical");
        break;
      case "center-vertical":
        topCenterCell.classList.add("win");
        topCenterCell.lastElementChild.classList.add("vertical");
        middleCenterCell.classList.add("win");
        middleCenterCell.lastElementChild.classList.add("vertical");
        bottomCenterCell.classList.add("win");
        bottomCenterCell.lastElementChild.classList.add("vertical");
        break;
      case "right-vertical":
        topRightCell.classList.add("win");
        topRightCell.lastElementChild.classList.add("vertical");
        middleRightCell.classList.add("win");
        middleRightCell.lastElementChild.classList.add("vertical");
        bottomRightCell.classList.add("win");
        bottomRightCell.lastElementChild.classList.add("vertical");
        break;
      case "downward-diagonal":
        topLeftCell.classList.add("win");
        topLeftCell.lastElementChild.classList.add("downward");
        topLeftCell.lastElementChild.classList.add("diagonal");
        middleCenterCell.classList.add("win");
        middleCenterCell.lastElementChild.classList.add("downward");
        middleCenterCell.lastElementChild.classList.add("diagonal");
        bottomRightCell.classList.add("win");
        bottomRightCell.lastElementChild.classList.add("downward");
        bottomRightCell.lastElementChild.classList.add("diagonal");
        break;
      case "upward-diagonal":
        bottomLeftCell.classList.add("win");
        bottomLeftCell.lastElementChild.classList.add("upward");
        bottomLeftCell.lastElementChild.classList.add("diagonal");
        middleCenterCell.classList.add("win");
        middleCenterCell.lastElementChild.classList.add("upward");
        middleCenterCell.lastElementChild.classList.add("diagonal");
        topRightCell.classList.add("win");
        topRightCell.lastElementChild.classList.add("upward");
        topRightCell.lastElementChild.classList.add("diagonal");
        break;
      default:
        break;
    }
  };

  const ticTacToe = () => {
    for (let index = 0; index < gameboardCells.length; index++) {
      const gameboardCell = gameboardCells[index];
      const gameboardCellContent = gameboardCell.children[0];

      gameboardCellContent.addEventListener("click", () => {
        if (turn <= MAX_TURNS && !isGameFinished) {
          if (gameBoard.isIndexEmpty(index)) {
            if (turn % 2 !== 0) {
              gameBoard.change(index, "X");
            } else {
              gameBoard.change(index, "O");
            }
            turn++;
            showGameboardDisplay();

            result = gameBoard.checkWinnerOrTie();

            const hasPlayerWon = result[0];
            if (hasPlayerWon) {
              const winningPlayer = result[2];
              const winningPosition = result[3];

              if (winningPlayer === 1) {
                alert("Player 1 has won");
              } else if (winningPlayer === 2) {
                alert("Player 2 has won");
              }
              styleGameboardDisplay(winningPosition);
              isGameFinished = true;
            }

            const hasPlayersTied = result[1];
            if (hasPlayersTied) {
              alert("The game has ended in a tie");
            }
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
