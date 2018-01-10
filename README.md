Chatty App
=====================

Basic chat app that uses websockets and React

### Screenshots

!["Homepage"]()

!["Sending messages"]()

!["Sending multiple images"]()

### Getting Started

Clone the chatty-app and create your own git repo.

```
git clone git@github.com:acdarroll/chatty-app
cd chatty-app
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the webpack dependencies:

```
npm install
```

Install the websocket dependencies:

```
cd chatty-server
npm install
cd ..
```

Run the server from the project root:

```
npm start-webpack
npm start-websockets
```

Navigate to `localhost:3000`;

### Dependencies

Websockets

* Node
* Express
* UUID - for unique ids
* ws - websockets

Webpack

* React
* React-DOM

### Dev Dependencies

* Webpack
* Loaders: SASS, Babel, style, CSS
* Node-sass
* Babel - core and the following presets: ES2015 and React
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
