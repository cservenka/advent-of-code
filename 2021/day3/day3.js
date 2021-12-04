import fs from "fs";

const data = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split("\n");

// const data = [
//   "00100",
//   "11110",
//   "10110",
//   "10111",
//   "10101",
//   "01111",
//   "00111",
//   "11100",
//   "10000",
//   "11001",
//   "00010",
//   "01010",
// ];

function getGammaRate(data) {
  const binaryLength = data[0].length;

  let gamma = [];
  let epsilon = [];

  for (let col = 0; col < binaryLength; col++) {
    const counts = [0, 0];
    for (let row = 0; row < data.length; row++) {
      counts[data[row][col]] += 1;
    }

    gamma.push(counts[0] <= counts[1] ? 1 : 0);
    epsilon.push(counts[0] <= counts[1] ? 0 : 1);
  }

  return { gamma, epsilon };
}
const { gamma, epsilon } = getGammaRate(data);
console.log(parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2));

function getLifeSupportRating(data) {
  let oxygen = [...data];
  let co2 = [...data];
  for (let i = 0; i < data[0].length; i++) {
    const { gamma } = getGammaRate(oxygen);
    const { epsilon } = getGammaRate(co2);
    if (oxygen.length > 1)
      oxygen = oxygen.filter((o) => parseInt(o[i]) === parseInt(gamma[i]));
    if (co2.length > 1)
      co2 = co2.filter((c) => parseInt(c[i]) === parseInt(epsilon[i]));
  }

  console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
}

getLifeSupportRating(data);
