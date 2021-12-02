import fs from "fs";

const data = fs
  .readFileSync(__dirname + "/day1_input.txt")
  .toString()
  .split("\n")
  .map((i) => parseInt(i));

// const data = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

let count = 0;
let last = Number.MAX_SAFE_INTEGER;
for (const num of data) {
  if (num > last) count++;
  last = num;
}

console.log(count);
