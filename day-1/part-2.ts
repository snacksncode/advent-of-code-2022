import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf-8");
const lines = file.split("\n");

let elves = [0];

lines.forEach((line) => {
  if (line === "") {
    // we have a new elv
    elves.push(0);
    return;
  }
  // add elv total to last one
  elves[elves.length - 1] += Number(line);
});

elves.sort((a, b) => b - a);
console.log(elves[0] + elves[1] + elves[2]);
