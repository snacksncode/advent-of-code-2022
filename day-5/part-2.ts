import * as fs from "fs";
import * as path from "path";
import { Stack } from "../shared/stack";

const file = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const [drawing, instructions] = file.split("\n\n");
const drawingLines = drawing.split("\n");
const instructionsLines = instructions.split("\n");
const drawingNumberRow = drawingLines.pop()!;

const amountOfStacks = Number([...drawingNumberRow?.matchAll(/\d/g)!].at(-1)![0]);
const stacks: Stack<string>[] = Array.from({ length: amountOfStacks }, (_) => new Stack<string>());

// Parse drawing and put "crates" into appropriate stacks
drawingLines.reverse().forEach((line) => {
  const crates = line.split(/(.{3})(?:\s?)/).filter(Boolean);
  crates.forEach((crate, index) => {
    if (crate === "   ") return;
    const unpackedCrate = crate.replaceAll(/\[|\]/g, "");
    stacks[index].push(unpackedCrate);
  });
});

type Instruction = {
  amount: number;
  originIndex: number;
  destinationIndex: number;
};

// Parse instructions
let parsedInstructions: Instruction[] = [];
instructionsLines.forEach((instruction) => {
  const [_, amount, originIndex, destinationIndex] = instruction.match(/move (\d+) from (\d+) to (\d+)/);
  parsedInstructions.push({
    amount: Number(amount),
    originIndex: Number(originIndex) - 1,
    destinationIndex: Number(destinationIndex) - 1,
  });
});

parsedInstructions.forEach((instruction) => {
  const { amount, originIndex, destinationIndex } = instruction;
  if (amount === 1) {
    const crate = stacks[originIndex].pop();
    stacks[destinationIndex].push(crate);
    return;
  }
  const miniStack = [];
  for (let i = 0; i < amount; i++) {
    miniStack.push(stacks[originIndex].pop());
  }
  miniStack.reverse().forEach((crate) => {
    stacks[destinationIndex].push(crate);
  });
});

let finalArrangement = "";
stacks.forEach((stack) => {
  finalArrangement += stack.peek();
});
console.log(finalArrangement);
