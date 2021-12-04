import fs from "fs";

class BingoBoard {
  constructor(board) {
    this.board = board;
  }

  markNumber(num) {
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      for (let col = 0; col < row.length; col++) {
        if (row[col] === num) {
          row[col] = "x";
          return this.hasBingoRow(this.board[i]) || this.hasBingoCol(col);
        }
      }
    }
  }

  hasBingoRow(row) {
    return Object.values(row).every((v) => v === "x");
  }

  hasBingoCol(col) {
    for (let row = 0; row < this.board.length; row++) {
      if (this.board[row][col] !== "x") return false;
    }
    return true;
  }

  getUnmarkedSum() {
    let sum = 0;
    for (const row of this.board) {
      for (const num of row) {
        if (num !== "x") sum += parseInt(num);
      }
    }
    return sum;
  }
}

const data = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

let input = data[0].split(",");
let boards = [];

let tmp = [];
for (let i = 2; i < data.length; i++) {
  const row = data[i];
  if (row) tmp.push(row.trim().split(/\s+/gi));
  if (tmp.length === 5) {
    boards.push(new BingoBoard(tmp));
    tmp = [];
  }
}

// Part 1
function findWinningBoard(input, boards) {
  for (const num of input) {
    for (const board of boards) {
      const hasBingo = board.markNumber(num);
      if (hasBingo) {
        console.log(num * board.getUnmarkedSum());
        return;
      }
    }
  }
}
// findWinningBoard(input, boards);

// Part 2
function findLosingBoard(input, boards) {
  const finishedBoards = [];
  for (const num of input) {
    for (const [i, board] of Object.entries(boards)) {
      if (finishedBoards.includes(i)) continue;
      const hasBingo = board.markNumber(num);
      if (hasBingo) {
        finishedBoards.push(i);
      }
    }

    if (finishedBoards.length === boards.length) {
      const lastBoard = boards[finishedBoards[finishedBoards.length - 1]];
      console.log(num * lastBoard.getUnmarkedSum());
      return;
    }
  }
}
findLosingBoard(input, boards);
