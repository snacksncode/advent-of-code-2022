import * as fs from "fs";
import path from "path";

const getItemPriority = (item: string) => {
  const asciiCode = item.charCodeAt(0);
  if (asciiCode >= 65 && asciiCode <= 90) {
    return asciiCode - 38;
  }
  if (asciiCode >= 97 && asciiCode <= 122) {
    return asciiCode - 96;
  }
};

let sumOfAllItemPriorities = 0;
const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const lines = file.split("\n");
const groupedLines = lines.reduce(
  (accumulator, currentValue, currentIndex, array) => {
    accumulator[accumulator.length - 1].push(currentValue);
    if ((currentIndex + 1) % 3 === 0 && currentIndex !== array.length - 1) {
      accumulator.push([]);
    }
    return accumulator;
  },
  [[]] as string[][]
);

for (const lines of groupedLines) {
  const [firstLine, secondLine, thirdLine] = lines;
  const firstLineItems = new Set(firstLine);
  const itemsBothInFirstAndSecondLines = new Set();
  let sharedItemAmongAllLines: string;

  secondLine.split("").forEach((item) => {
    if (firstLineItems.has(item)) {
      itemsBothInFirstAndSecondLines.add(item);
    }
  });

  thirdLine.split("").forEach((item) => {
    if (itemsBothInFirstAndSecondLines.has(item)) {
      sharedItemAmongAllLines = item;
    }
  });

  sumOfAllItemPriorities += getItemPriority(sharedItemAmongAllLines!)!;
}

console.log("The sum of the priorities of all items:", sumOfAllItemPriorities);
