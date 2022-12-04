import assert from "assert";
import * as fs from "fs";

const file = fs.readFileSync("./input.txt", "utf-8");
const lines = file.split("\n");
let score = 0;

enum Shape {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors",
}

enum Winner {
  Opponent = "Opponent",
  You = "You",
  Draw = "Draw",
}

enum Action {
  Win = "Win",
  Lose = "Lose",
  Draw = "Draw",
}

const getShapeFromInput = (input: string): Shape | null => {
  if (input === "A") return Shape.Rock;
  if (input === "B") return Shape.Paper;
  if (input === "C") return Shape.Scissors;
  return null;
};

const getActionFromInput = (input: string): Action | null => {
  if (input === "X") return Action.Lose;
  if (input === "Y") return Action.Draw;
  if (input === "Z") return Action.Win;
  return null;
};

const getShapeFromAction = (action: Action, opponentsShape: Shape): Shape | null => {
  if (action === Action.Draw) {
    if (opponentsShape === Shape.Rock) return Shape.Rock;
    if (opponentsShape === Shape.Paper) return Shape.Paper;
    if (opponentsShape === Shape.Scissors) return Shape.Scissors;
  }
  if (action === Action.Lose) {
    if (opponentsShape === Shape.Rock) return Shape.Scissors;
    if (opponentsShape === Shape.Paper) return Shape.Rock;
    if (opponentsShape === Shape.Scissors) return Shape.Paper;
  }
  if (action === Action.Win) {
    if (opponentsShape === Shape.Rock) return Shape.Paper;
    if (opponentsShape === Shape.Paper) return Shape.Scissors;
    if (opponentsShape === Shape.Scissors) return Shape.Rock;
  }
  return null;
};

const playRockPaperScissors = (opponentsShape: Shape, yourShape: Shape): Winner | null => {
  if (opponentsShape === Shape.Rock) {
    if (yourShape === Shape.Rock) return Winner.Draw;
    if (yourShape === Shape.Paper) return Winner.You;
    if (yourShape === Shape.Scissors) return Winner.Opponent;
  }
  if (opponentsShape === Shape.Paper) {
    if (yourShape === Shape.Rock) return Winner.Opponent;
    if (yourShape === Shape.Paper) return Winner.Draw;
    if (yourShape === Shape.Scissors) return Winner.You;
  }
  if (opponentsShape === Shape.Scissors) {
    if (yourShape === Shape.Rock) return Winner.You;
    if (yourShape === Shape.Paper) return Winner.Opponent;
    if (yourShape === Shape.Scissors) return Winner.Draw;
  }
  return null;
};

const calculatePoints = (yourShape: Shape, winner: Winner): number => {
  let points = 0;
  if (yourShape === Shape.Rock) points += 1;
  if (yourShape === Shape.Paper) points += 2;
  if (yourShape === Shape.Scissors) points += 3;

  if (winner === Winner.You) points += 6;
  if (winner === Winner.Draw) points += 3;
  if (winner === Winner.Opponent) points += 0;

  return points;
};

for (const line of lines) {
  const [opponentsInput, yourInput] = line.split(" ");
  const opponentsShape = getShapeFromInput(opponentsInput)!;
  const yourAction = getActionFromInput(yourInput)!;
  const yourShape = getShapeFromAction(yourAction, opponentsShape)!;
  const winner = playRockPaperScissors(opponentsShape, yourShape)!;
  const yourPoints = calculatePoints(yourShape, winner);
  score += yourPoints;
}

console.log("Your final score:", score);
