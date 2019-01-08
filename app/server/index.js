require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const app = express();
const helpers = require('./src/config/helpers');

const alexa = require("alexa-app");
let alexaApp = new alexa.app("clearview");

alexaApp.intent("ProjectIntent", {
  "slots": {},
  "utterances": []
},
  function (request, response) {
    console.log('ALEXA TEST');
    response.say("Success!");
  }
);

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  // checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  // debug: true
});


alexaApp.error = function (exception, request, response) {
  console.log('ALEXA Error :');
  response.say("Sorry, something is wrong on interactive sports services, Try again");
};

alexaApp.launch(function (request, response) {
  response.say('Welcome to Clearview');
});

alexaApp.intent("AMAZON.HelpIntent", {
  "slots": {},
  "utterances": []
},
  function (request, response) {
    var helpOutput = "You can say 'some statement' or ask 'some question'. You can also say stop or exit to quit.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  }
);









//Route Name
// const projectRouter = require('./src/routes/project');
// const userRouter = require('./src/routes/user');

const port = process.env.PORT || 8000;
// const publicPath = path.join(__dirname, "../../public");
// Middleware
// app.use(busboy());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(express.static(publicPath));
// app.use(express.urlencoded({ extended: false }));
// app.use(busboyBodyParser());

//Routes
// app.use('/project', projectRouter);
// app.use('/user', userRouter);

// app.get("*", (req, res, next) => {
//   if (req.url.includes("api")) return next();
//   res.sendFile(path.resolve(publicPath, "index.html"));
// });

// app.use((req, res, next) => {
//   next(createError(404));
// });
// app.use((err, req, res, next) => {
//   console.log("err.status :", err.status);
//   res.status(err.status || 500).json({
//     message: "An error has ocurred.",
//     data: req.app.get("env") === "development" ? err : null
//   });
// });

// helpers.initApp();

app.listen(port, _ => console.log(`The server is listening on port ${port}`));
