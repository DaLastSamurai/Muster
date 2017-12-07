import Clarifai from 'clarifai';
import apiKey from "../../../config/clarifaiCredentials";

// console.log(apiKey);

const app = new Clarifai.App({
  apiKey: apiKey
})

var ImageRecog = (imageUrl) => {
  console.log('ImageRecog Triggered!')
  app.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
    (res) => {
      var keywords = res.outputs[0].data.concepts.map(result => result.name)
      console.log('Clarifai Response:', JSON.stringify(keywords))
    },
    (err) => console.log('Clarifai Error:', err)
  );
};

export default ImageRecog;