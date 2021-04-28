const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node')
const mobilenet = require('@tensorflow-models/mobilenet');
const canvasAPP = require('canvas');
const cocoSsd = require('@tensorflow-models/coco-ssd');


async function drawBoxes(img){
  var image = await canvasAPP.loadImage(img)
  const canvas = await canvasAPP.createCanvas(image.width, image.height)
  const ctx = await canvas.getContext('2d')
  await ctx.drawImage(image, 0, 0)
  const model = await cocoSsd.load();
  var imgPixel = await tf.browser.fromPixels(canvas)
  const predictions = await model.detect(imgPixel, 20, 0.1)
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    // Label background
    ctx.fillStyle = "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
  });
  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
  const buffer = canvas.toBuffer('image/png')
  return buffer
};
async function catdetector(imagePath){
  let result
  var image = await canvasAPP.loadImage(imagePath)
  const canvas = await canvasAPP.createCanvas(image.width, image.height)
  const ctx = await canvas.getContext('2d')

  await ctx.drawImage(image, 0, 0)
    //const decodedImage = await tfn.node.decodeImage(image, 3);
  const model = await mobilenet.load()
  var imgPixel = await tf.browser.fromPixels(canvas)
  result = await model.classify(imgPixel)
  return result
}


module.exports = {
  catdetector,
  drawBoxes
}
