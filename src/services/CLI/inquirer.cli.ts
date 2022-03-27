import inquirer from "inquirer";

let positionX = 0;
let positionY = 0;

async function initialCLI(): Promise<any> {
  const result = await inquirer
    .prompt([
      {
        type: "input",
        name: "position",
        message: "Place the robot",
        default: [0, 0]
      }
    ])
    .then((answer) => {
      const newAnswer = answer.position
        .match(/([A-Za-z]+)/gm)
        .map((word: string) => word.toUpperCase()) as string[];

      const positions: number[] = [];
      let direction: string = "";

      if (
        newAnswer.includes("PLACE") &&
        initialDirections.includes(newAnswer[1])
      ) {
        answer.position.toUpperCase();

        direction = newAnswer[1];

        const a = Array.from(answer.position);

        console.log(a);
        a.forEach((pos: any) => {
          console.log(pos);
          if (["0", "1", "2", "3", "4"].includes(pos)) {
            positions.push(Number(pos));
          }
        });

        positionX = positions[0];
        positionY = positions[1];
      }

      return { position: [positionX, positionY], direction };
    });

  console.log(result);
}

export const directions = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST"
};

export const initialDirections = ["NORTH", "SOUTH", "EAST", "WEST"];

initialCLI();
