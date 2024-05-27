require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/inferenceService");
const { postCheckFailHandler } = require("../server/handler");

const init = async () => {
  console.log("Loading model...");
  const model = await loadModel();
  console.log("Model loaded!");

  const server = Hapi.server({
    host: "0.0.0.0",
    port: 3000,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.app.model = model;
  server.route(routes);

  server.ext("onPreResponse", postCheckFailHandler);

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
};

init();
