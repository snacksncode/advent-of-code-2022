import * as fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const lines = file.split("\n");
let rangesThatOverlap = 0;

const getRangeFromString = (input: string) => {
  const [start, end] = input.split("-").map((numberAsAString) => Number(numberAsAString));
  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

for (const line of lines) {
  const [firstRangeString, secondRangeString] = line.split(",");
  const firstRangeSet = new Set(getRangeFromString(firstRangeString));
  const secondRange = getRangeFromString(secondRangeString);
  let overlapFound = false;

  for (const number of secondRange) {
    if (firstRangeSet.has(number)) {
      overlapFound = true;
      break;
    }
  }

  if (overlapFound) {
    rangesThatOverlap += 1;
  }
}

console.log("Overlaps found:", rangesThatOverlap);
