import Clarifai from 'clarifai';
import apiKey from "../../../config/clarifaiCredentials";

// console.log(apiKey);

const app = new Clarifai.App({
  apiKey: apiKey
})

var ImageRecog = (imageUrl) => {
  console.log('ImageRecog Triggered!')
  app.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
    (res) => console.log('Clarifai Response:', JSON.stringify(res.outputs[0].data.concepts)),
    (err) => console.log('Clarifai Error:', err)
  );
};

export default ImageRecog;