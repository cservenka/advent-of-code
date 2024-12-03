import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "./data/day3.txt"))
  .toString();

function part1() {
  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(mulRegex) || [];
  let sum = 0;
  for (const match of matches) {
    const [x, y] = match.slice(4, -1).split(",");
    sum += parseInt(x) * parseInt(y);
  }

  console.log(sum);
}

function part2() {
  const regex = /(?:do\(\)|don't\(\))|mul\(\d{1,3},\d{1,3}\)/g;
  const matches = input.match(regex) || [];
  let sum = 0;
  let isEnabled = true;
  for (const match of matches) {
    if (match === "do()") isEnabled = true;
    else if (match === "don't()") isEnabled = false;
    if (!isEnabled || !match.startsWith("mul(")) continue;
    const [x, y] = match.slice(4, -1).split(",");
    sum += parseInt(x) * parseInt(y);
  }
  console.log(sum);
}

part2();
