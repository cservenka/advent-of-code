import fs from "fs";

const data = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

// const data = [
//   "0,9 -> 5,9",
//   "8,0 -> 0,8",
//   "9,4 -> 3,4",
//   "2,2 -> 2,1",
//   "7,0 -> 7,4",
//   "6,4 -> 2,0",
//   "0,9 -> 2,9",
//   "3,4 -> 1,4",
//   "0,0 -> 8,8",
//   "5,5 -> 8,2",
// ];

function generateDiagram(data) {
  const diagram = {};
  for (const line of data) {
    const [a, b] = line.split(" -> ");
    const [x1, y1] = a.split(",").map((c) => parseInt(c));
    const [x2, y2] = b.split(",").map((c) => parseInt(c));

    if (x1 === x2) {
      const from = Math.min(y1, y2);
      const to = Math.max(y1, y2);
      for (let i = from; i <= to; i++) {
        const pos = `${x1},${i}`;
        if (!diagram[pos]) diagram[pos] = 0;
        diagram[pos] += 1;
      }
    }

    if (y1 === y2) {
      const from = Math.min(x1, x2);
      const to = Math.max(x1, x2);
      for (let i = from; i <= to; i++) {
        const pos = `${i},${y1}`;
        if (!diagram[pos]) diagram[pos] = 0;
        diagram[pos] += 1;
      }
    }

    // part 2
    if (x1 !== x2 && y1 !== y2) {
      const delta = Math.abs(x1 - x2);
      for (let i = 0; i <= delta; i++) {
        const x = x1 < x2 ? x1 + i : x1 - i;
        const y = y1 < y2 ? y1 + i : y1 - i;

        const pos = `${x},${y}`;

        if (!diagram[pos]) diagram[pos] = 0;
        diagram[pos] += 1;
      }
    }
  }
  return diagram;
}

const diagram = generateDiagram(data);

let num = 0;
for (const [_, count] of Object.entries(diagram)) {
  if (count > 1) num += 1;
}
console.log(num);
