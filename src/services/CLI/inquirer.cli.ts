import inquirer from "inquirer";
import { isEmpty } from "lodash";
import { placeRobotCliServiceFactiory } from "../../config/placeRobotCliService.factories";
import { InvalidCommandError } from "../../domain/cli/cli.erros";
import { allowedCommands } from "../../domain/robot/robot";

export interface IanswerDto {
  initialDirection: string;
  position: number[];
  moviment: string;
}

export const promptConfig = [
  {
    type: "input",
    name: "position",
    message: "Place the robot",
    default: "place 0,0 north"
  },
  {
    type: "input",
    name: "moviment",
    message: "Move robot to right, left, ahead, report the current position ",
    default: "move"
  }
];

const placeRobotCliServce = placeRobotCliServiceFactiory();
async function initialCLI(): Promise<any> {
  await inquirer
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

      const { direction, currentPlace, currentPosition } =
        placeRobotCliServce.movimentCliRobot({
          initialDirection,
          position,
          moviment: answer.moviment.toUpperCase()
        });

      async function moveCLI({
        initialDirection,
        position,
        moviment
      }: IanswerDto): Promise<any> {
        let result: any;
        inquirer
          .prompt([promptConfig[1]])
          .then((answer) => {
            result = placeRobotCliServce.movimentCliRobot({
              initialDirection,
              position,
              moviment
            });
          })
          .catch((error) => console.error(error));

        if (result.currentPosition === "") {
          await moveCLI({
            initialDirection: result.currentPosition,
            moviment: result.direction,
            position: result.position
          });
        }

        return result;
      }

      if (isEmpty(currentPlace)) {
        await moveCLI({
          initialDirection: currentPosition,
          moviment: direction,
          position: position
        });
      }
    })
    .catch((error) => console.error(error));
}
//     .then(({ initialDirection, position, moviment }: IanswerDto) => {
//       const { direction, currentPlace, currentPosition } =
//         placeRobotCliServce.movimentCliRobot({
//           initialDirection,
//           position,
//           moviment
//         });

//       if (currentPosition === "") {
//         inquirer.prompt([promptConfig[1]]).then((answer) => {
//           placeRobotCliServce.movimentCliRobot({
//             initialDirection,
//             position,
//             moviment
//           });
//         });
//       }
//     })
//     .catch((error) => console.error(error.message));
// }

initialCLI();

// async function moveCLI({
//   initialDirection,
//   position,
//   moviment
// }: IanswerDto): Promise<any> {
//   let result;
//   inquirer.prompt([promptConfig[1]]).then((answer) => {
//     result = placeRobotCliServce.movimentCliRobot({
//       initialDirection,
//       position,
//       moviment
//     });
//   });

//   return result;
// }
