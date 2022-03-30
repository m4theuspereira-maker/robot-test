## Description
This project simulates a robot above a table and can be used by CLI and by an interface. The propose is resolve the pinpeople's technical test. To get more informations about the test: https://github.com/pin-people/toy_robot#readme

## Instalation

```bash
$ yarn
```

## Running the app
```bash
#development
$ yarn dev

#prod
$yarn start
```

## Running tests
```bash
yarn test
```

## Running CLI
```bash
$ yarn cli
```

## Project organization
```
├─ .eslintignore
├─ .eslintrc.json
├─ .gitignore
├─ .prettierrc.json
├─ .vscode
│  └─ launch.json
├─ README.md
├─ jest.config.js
├─ nodemon.json
├─ package.json
├─ src
│  ├─ config
│  │  ├─ dotenv.config.ts
│  │  ├─ envoiriment.consts.ts
│  │  ├─ placeRobotCliService.factories.ts
│  │  └─ table.factories.ts
│  ├─ controller
│  │  └─ table.controller.ts
│  ├─ domain
│  │  ├─ cli
│  │  │  ├─ cli.erros.ts
│  │  │  └─ cli.handlers.ts
│  │  ├─ robot
│  │  │  ├─ robot.ts
│  │  │  └─ robotErros.ts
│  │  └─ table
│  │     ├─ table.ts
│  │     └─ tableErros.ts
│  ├─ index.ts
│  ├─ infrastructure
│  │  └─ server.errors.ts
│  ├─ routes.ts
│  └─ services
│     ├─ CLI
│     │  ├─ constants.ts
│     │  ├─ init.inquirer.cli.ts
│     │  ├─ inquirercli.functions.ts
│     │  └─ place-robot.cli.servide.ts
│     └─ table-service
│        └─ table.service.ts
├─ tests
│  ├─ controller
│  │  └─ table.controller.int.spec.ts
│  ├─ domain
│  │  ├─ robot
│  │  │  └─ robot.spec.ts
│  │  └─ table
│  │     └─ table.spec.ts
│  └─ services
│     └─ table.service.spec.ts
├─ tsconfig-build.json
├─ tsconfig.json
├─ yarn-error.log
└─ yarn.lock

```
