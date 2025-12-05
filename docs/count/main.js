title = "Count";

description = `
[Tap] to Increase Counter
[Hold] to Confirm
`;

characters = [];

options = {
};

let state;
let roundNumber;
let count;
let guess;
let board;
let boardSize;
let cellSize;
let showTime;
let timer;

function update() {
  if (!ticks) {
    roundNumber = 0;
    state = "show";
    boardSize = 4
    board = initialiseBoard();
    showTime = 120
    timer = 0

  }


  switch (state) {

    case "show":
      const gridPadding = 10;
      const gap = 1;

      const usable = 100 - gridPadding * 2;
      const totalGap = (boardSize - 1) * gap;
      cellSize = (usable - totalGap) / boardSize;

      // Because box() uses center coordinates!
      const start = gridPadding + cellSize / 2;

      for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
          const val = board[r][c];

          color(val === 1 ? "red" : "light_black");

          box(
            start + c * (cellSize + gap),
            start + r * (cellSize + gap),
            cellSize
          );
        }
      }

      timer++;
      if (timer >= showTime) {
        guess = 0
        state = "guess"
        timer = 0
      }
      break;
    case "guess":
      color("cyan")
      text(guess.toString(), 50, 50)
      if (input.isPressed) {
        timer++;
      }
      if (input.isJustReleased) {
        if (timer < 20) {

          guess++;
        }

        timer = 0;
      }
      if (timer > 60) {
        state = "answer"
        timer = 0;
      }
      color("cyan")
      rect(0, 90, 100 * (timer / 60), 10)
      color("white")
      text("Confirm Guess", 10, 95)
      break;

    case "answer":
      color("cyan")
      text("Your Guess:", 30, 40)
      text(guess.toString(), 50, 50)

      color("red")
      text("Answer:", 40, 70)
      text(count.toString(), 50, 80)

      timer++;

      if (timer > 60) {
        timer = 0;
        if (guess == count) {
          addScore(1);
          roundNumber++;
          boardSize = 4 + Math.floor(roundNumber / 4);
          board = initialiseBoard()
          state = "show"
        } else {
          end();
        }
      }




    default:
      break;
  }


}

function initialiseBoard() {
  const total = boardSize * boardSize;
  count = rndi(0 + roundNumber, 5 + (2 * roundNumber));

  let arr = Array(total).fill(0);

  let placed = 0;
  while (placed < count) {
    const idx = rndi(0, total);
    if (arr[idx] === 0) {
      arr[idx] = 1;
      placed++;
    }
  }

  const board = [];
  for (let r = 0; r < boardSize; r++) {
    board.push(arr.slice(r * boardSize, r * boardSize + boardSize));
  }

  return board;

}
