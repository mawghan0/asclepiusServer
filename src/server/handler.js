const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const { storeData, getData } = require("./service/storeData");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: result > 0.5 ? "Cancer" : "Non-cancer",
    suggestion:
      result > 0.5 ? "Segera periksa ke dokter" : "Terus menjaga kesehatan",
    createdAt,
  };

  await storeData(id, data);

  return h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    })
    .code(201);
}

const getHistoryHandler = async (_, h) => {
  const histories = await getData();

  return h
    .response({
      status: "success",
      data: histories,
    })
    .code(200);
};

module.exports = { postPredictHandler, getHistoryHandler };
