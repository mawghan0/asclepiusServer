const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData");

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: result > 0.5 ? "Cancer" : "Non-cancer",
    suggestion:
      result > 0.5
        ? "Segera konsultasi ke dokter secepatnya"
        : "Tetap jaga kesehatan anda",
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
};

const postCheckFailHandler = (request, h) => {
  const response = request.response;

  if (response.isBoom && response.output.statusCode == 500) {
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      })
      .code(400);
  }

  if (response.isBoom && response.output.statusCode == 413) {
    return h
      .response({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      })
      .code(413);
  }

  return h.continue;
};

module.exports = {
  postPredictHandler,
  getHistoryHandler,
  postCheckFailHandler,
};
