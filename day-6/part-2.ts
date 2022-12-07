import * as fs from "fs";
import * as path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const chars = file.split("");
let answer: number | null = null;
const START_OF_MESSAGE_MARKER_LENGTH = 14;

for (let i = START_OF_MESSAGE_MARKER_LENGTH; i < chars.length; i++) {
  const charsSlice = chars.slice(i - START_OF_MESSAGE_MARKER_LENGTH, i);
  const sliceSet = new Set(charsSlice);
  if (sliceSet.size === START_OF_MESSAGE_MARKER_LENGTH) {
    answer = i;
    break;
  }
}

console.log(answer);
