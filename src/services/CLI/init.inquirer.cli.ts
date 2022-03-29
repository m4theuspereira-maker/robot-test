/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { isUndefined } from "lodash";
import { initialCLI, moveCLI } from "./inquirercli.functions";

let initialResult: any;
let movimentResult: any;
let lastResult: any;
(async () => {
  do {
    initialResult = await initialCLI();
    if (!isUndefined(initialResult)) {
      movimentResult = await moveCLI({
        initialDirection: initialResult.direction,
        position: initialResult.currentPosition,
        moviment: initialResult.moviment
      });
    }
  } while (initialResult === false || isUndefined(initialResult));
  do {
    do {
      lastResult = await moveCLI({
        initialDirection: movimentResult.direction,
        position: movimentResult.currentPosition,
        moviment: movimentResult.moviment
      });
    } while (lastResult === false || isUndefined(lastResult));

    movimentResult =
      lastResult ||
      (await moveCLI({
        initialDirection: lastResult.direction,
        position: lastResult.currentPosition,
        moviment: lastResult.anteriorDirection
      }));
  } while (movimentResult.currentPlace === "");
})();
