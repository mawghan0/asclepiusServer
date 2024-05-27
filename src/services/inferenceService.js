const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);

  const classes = ['Cancer', 'Non-cancer'];
 
  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const label = classes[classResult];

  let suggestion;
 
  if (label === 'Cancer') {
    suggestion = "Segera konsultasi dengan dokter terdekat untuk meminimalisasi penyebaran kanker."
  }
 
  if (label === 'Non-cancer') {
    suggestion = "Tetap Jaga Kesehatanmu."
  }
  return { label, suggestion };
}

module.exports = predictClassification;