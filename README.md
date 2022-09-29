# Party Poopers

This HTML5 game is created withusing Phaser 3.55 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Webpack 5](https://webpack.js.org/) for bundling.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                      |
| `npm start`     | Build project and open web server running project, watching for changes           |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder
and Webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Configuring Webpack

- Edit the file `webpack/common.js` to edit common configurations.
- Edit the file `webpack/dev.js` to edit the development build.
- Edit the file `webpack/prod.js` to edit the distribution build.
