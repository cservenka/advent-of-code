import fs from "fs";

const data = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

// console.log(data);

function getPosition(data) {
  let horizontal = 0;
  let depth = 0;

  for (const log of data) {
    const [action, value] = log.split(" ");
    if (action === "forward") horizontal += parseInt(value);
    if (action === "down") depth += parseInt(value);
    if (action === "up") depth -= parseInt(value);
  }

  console.log(horizontal, depth, horizontal * depth);
}

getPosition(data);

function getPositionWithAim(data) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const log of data) {
    const [action, value] = log.split(" ");
    if (action === "down") aim += parseInt(value);
    if (action === "up") aim -= parseInt(value);
    if (action === "forward") {
      horizontal += parseInt(value);
      depth += parseInt(value) * aim;
    }
  }

  console.log(horizontal, depth, aim, horizontal * depth);
}

getPositionWithAim(data);
