const { Firestore } = require("@google-cloud/firestore");

const storeData = async (id, data) => {
  const db = new Firestore();
  const predictCollections = db.collection("predictions");
  return predictCollections.doc(id).set(data);
};

module.exports = storeData;
