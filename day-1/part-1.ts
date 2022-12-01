import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf-8");
const lines = file.split("\n");
let sum = 0;
let biggestSum = 0;

lines.forEach((line) => {
  sum += Number(line);
  if (line === "") {
    if (sum > biggestSum) {
      biggestSum = sum;
    }
    sum = 0;
  }
});

console.log(biggestSum);
