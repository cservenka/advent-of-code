import fs from "fs";

const data = fs
  .readFileSync(__dirname + "/day1_input.txt")
  .toString()
  .split("\n")
  .map((i) => parseInt(i));

// const data = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

function part1(input) {
  let count = 0;
  let last = Number.MAX_SAFE_INTEGER;
  for (const num of input) {
    if (num > last) count++;
    last = num;
  }

  console.log(count);
  return count;
}

// part1(data);

function part2() {
  let sums = [];

  for (const [i, num] of data.entries()) {
    for (let j = 2; j > -1; j--) {
      if (i - j < 0) continue;
      if (!sums[i - j]) sums[i - j] = 0;
      sums[i - j] += num;
    }
  }

  part1(sums);
}
part2();
