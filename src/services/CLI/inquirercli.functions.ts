import inquirer from "inquirer";
import { placeRobotCliServiceFactiory } from "../../config/placeRobotCliService.factories";
import { InvalidCommandError } from "../../domain/cli/cli.erros";
import { allowedCommands } from "../../domain/robot/robot";
import { promptConfig } from "./constants";

export interface IanswerDto {
  initialDirection: string;
  position: number[];
  moviment: string;
}

const placeRobotCliServce = placeRobotCliServiceFactiory();
export async function initialCLI(): Promise<any> {
  let movimentResult;
  movimentResult = await inquirer
    .prompt(promptConfig)
    .then(async (answer) => {
      const newAnswer = answer.position
        .match(/([A-Za-z]+)/gm)
        .map((word: string) => word.toUpperCase()) as string[];

      if (!newAnswer.includes(allowedCommands.PLACE)) {
        throw new InvalidCommandError();
      }

      const { initialDirection, position } =
        placeRobotCliServce.cliPlaceRobot(answer);

      movimentResult = placeRobotCliServce.movimentCliRobot({
        initialDirection,
        position,
        moviment: answer.moviment.toUpperCase()
      });

      return movimentResult;
    })
    .catch((error) => console.error(error));

  return movimentResult;
}

export async function moveCLI({
  initialDirection,
  position,
  moviment
}: IanswerDto): Promise<any> {
  let result;
  result = await inquirer
    .prompt([promptConfig[1]])
    .then((answer) => {
      result = placeRobotCliServce.movimentCliRobot({
        initialDirection,
        position,
        moviment: answer.moviment
      });

      if (result === false) {
        return { initialDirection, position, moviment };
      }

      return result;
    })
    .catch((error) => {
      console.log(error.message);
    });

  return result;
}
