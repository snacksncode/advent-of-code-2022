import * as fs from "fs";
import * as path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const chars = file.split("");
let answer: number | null = null;

for (let i = 4; i < chars.length; i++) {
  const charsSlice = chars.slice(i - 4, i);
  const sliceSet = new Set(charsSlice);
  if (sliceSet.size === 4) {
    answer = i;
    break;
  }
}

console.log(answer);
