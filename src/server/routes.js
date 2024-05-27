const postPredictHandler = require("../server/handler");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        /*Mengizinkan data berupa gambar*/
        maxBytes: 1000000,
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
];

module.exports = routes;
