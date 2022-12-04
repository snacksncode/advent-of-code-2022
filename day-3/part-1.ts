import * as fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const lines = file.split("\n");
let priority = 0;

const splitStringInHalf = (string: string) => {
  const length = string.length;
  return [string.slice(0, length / 2), string.slice(length / 2, length)];
};

const getItemPriority = (item: string) => {
  const asciiCode = item.charCodeAt(0);
  if (asciiCode >= 65 && asciiCode <= 90) {
    return asciiCode - 38;
  }
  if (asciiCode >= 97 && asciiCode <= 122) {
    return asciiCode - 96;
  }
};

lines.forEach((line) => {
  const [leftHalf, rightHalf] = splitStringInHalf(line);
  const items = new Set();
  let itemFound = false;

  leftHalf.split("").forEach((item) => items.add(item));
  rightHalf.split("").forEach((item) => {
    if (!items.has(item) || itemFound) return;
    itemFound = true;
    priority += getItemPriority(item)!;
  });
});

console.log("The sum of the priorities of all items:", priority);
