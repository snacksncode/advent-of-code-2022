import * as fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const lines = file.split("\n");
let rangesThatAreFullyContainedInAnotherOne = 0;

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
  const firstRange = getRangeFromString(firstRangeString);
  const secondRange = getRangeFromString(secondRangeString);
  const longerRange = firstRange.length > secondRange.length ? firstRange : secondRange;
  const shorterRange = firstRange.length > secondRange.length ? secondRange : firstRange;
  const longerRangeSet = new Set(longerRange);
  let oneFullyContainsAnother = true;

  for (const number of shorterRange) {
    if (!longerRangeSet.has(number)) {
      oneFullyContainsAnother = false;
      break;
    }
  }

  if (oneFullyContainsAnother) {
    rangesThatAreFullyContainedInAnotherOne += 1;
  }
}

console.log("Fully contained:", rangesThatAreFullyContainedInAnotherOne);
