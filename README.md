# baseline

## setup

*  `npm install` to install dependencies.
*  `npm start` to run webpack dev server
*  `npm run start:server` to start express server

## features

*  Webpack dev server (with hot reloading) on port 8080: `npm start`
*  Node/Express server (runs with nodemon) on port 3000 (src/api): `npm run start:server`
*  Stylesheets with Sass (src/style)
*  VSCode debugging config (launch.json)
*  Testing with mocha and enzyme: `npm test`
*  Linting with eslint: `npm run lint`
*  React starting point includes redux, react-router, reselect.
*  Module resolution config uses `~` as root of src directory, ie: `import Page from '~/components/Page`
