import fs from "fs";
import path from "path";

const grid = fs
  .readFileSync(path.join(__dirname, "./data/day4.txt"))
  .toString()
  .split("\n");

const rows = grid.length;
const cols = grid[0].length;

const directions = {
  Down: [1, 0],
  Right: [0, 1],
  Up: [-1, 0],
  Left: [0, -1],
  DownRight: [1, 1],
  UpLeft: [-1, -1],
  DownLeft: [1, -1],
  UpRight: [-1, 1],
};
type direction = keyof typeof directions;

function hasWord(x: number, y: number, d: direction, word: string): boolean {
  const [dx, dy] = directions[d];
  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (grid?.[nx]?.[ny] !== word[i]) return false;
  }
  return true;
}

function part1() {
  let count = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const d in directions) {
        if (hasWord(x, y, d as direction, "XMAS")) count++;
      }
    }
  }

  console.log(count);
}

function part2() {
  let count = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] !== "A") continue;
      const topToBottom =
        hasWord(x - 1, y - 1, "DownRight", "MAS") ||
        hasWord(x - 1, y - 1, "DownRight", "SAM");
      if (!topToBottom) continue;

      const bottomToTop =
        hasWord(x + 1, y - 1, "UpRight", "MAS") ||
        hasWord(x + 1, y - 1, "UpRight", "SAM");
      if (!bottomToTop) continue;
      count++;
    }
  }
  console.log(count);
}

part1();
part2();
