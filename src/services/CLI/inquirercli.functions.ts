import inquirer from "inquirer";
import { isUndefined } from "lodash";
import { InvalidCommandError } from "../../domain/cli/cli.erros";
import { allowedCommands } from "../../domain/robot/robot";
import { placeRobotCliServiceFactiory } from "../../factories/placeRobotCliService.factories";
import { promptConfig } from "./constants";

export interface IanswerDto {
  initialDirection: string;
  position: number[];
  moviment: string;
}

const placeRobotCliServce = placeRobotCliServiceFactiory();

export async function initialCLI(): Promise<any> {
  try {
    let movimentResult: any;
    movimentResult = await inquirer.prompt(promptConfig);

    const newAnswer = movimentResult.position
      .match(/([A-Za-z]+)/gm)
      .map((word: string) => word.toUpperCase()) as string[];

    if (!newAnswer.includes(allowedCommands.PLACE)) {
      throw new InvalidCommandError();
    }

    const { initialDirection, position } =
      placeRobotCliServce.cliPlaceRobot(movimentResult);

    movimentResult = placeRobotCliServce.movimentCliRobot({
      initialDirection,
      position,
      moviment: movimentResult.moviment.toUpperCase()
    });

    return movimentResult;
  } catch (error) {
    throw new InvalidCommandError();
  }
}

export async function moveCLI({
  initialDirection,
  position,
  moviment
}: IanswerDto): Promise<any> {
  try {
    let result;
    result = await inquirer.prompt([promptConfig[1]]);

    result = placeRobotCliServce.movimentCliRobot({
      initialDirection,
      position,
      moviment: result.moviment
    });

    if (isUndefined(result)) {
      return { initialDirection, position, moviment };
    }

    return result;
  } catch (error) {
    throw new InvalidCommandError();
  }
}
