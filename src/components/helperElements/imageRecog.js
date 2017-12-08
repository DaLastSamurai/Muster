import Clarifai from 'clarifai';
import AWS from 'aws-sdk';
import apiKey from "../../../config/clarifaiCredentials";
// var Auth = require("../../../config/creds.json");

// console.log(apiKey);

const app = new Clarifai.App({
  apiKey: apiKey
})

var ImageRecog = (imageUrl, cb = () => {}) => {
  // console.log('ImageRecog Triggered!')
  app.models.predict(Clarifai.GENERAL_MODEL, imageUrl).then(
    (res) => {
      var keywords = res.outputs[0].data.concepts.map(result => result.name)
      console.log('Clarifai Response:', JSON.stringify(keywords))
      // this.setState({
      //   keywords: keywords
      // })
      cb(keywords);
    }, 
    (err) => console.log('Clarifai Error:', err)
  );
};

// var AWSRekognize = (imageUrl) => {
//   var auth = 
//   var creds = new AWS.Credentials(auth.amazon.accessKeyId, auth.amazon.secretAccessKey);
  
//   var myConfig = new AWS.Config({
//     credentials: creds,
//     region: auth.amazon.region
//   })

//   let recog = new AWS.Rekognition(myConfig);
//   let params = {};


//   function toDataURL(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       var reader = new FileReader();
//       reader.onloadend = function () {
//         callback(reader.result);
//       }
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
//   }

//   let content = toDataURL(imageUrl,
//     function (dataUrl) {
//       console.log('toDATAURL RESULT:', dataUrl)
//     });

//   // let content = imageUrl;
//   params.Image = {Bytes: content};


//   return new Promise((resolve, reject) => {
//     recog.detectText(params, function (err, data) {
//       if (err) reject(err);
//       resolve(data);
//       console.log(JSON.stringify(data))
//     });
//   });


  // let faces = new Promise((res, rej) => {
  //   recog.detectFaces(params, function(err, data) {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });

  // let labels = new Promise((res, rej) => {
  //   recog.detectLabels(params, function(err, data) {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });

  // let modlabels = new Promise((res, rej) => {
  //   recog.detectModerationLabels(params, function(err, data) {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });

  // let celebs = new Promise((res, rej) => {
  //   recog.recognizeCelebrities(params, function(err, data) {
  //     if (err) reject(err);
  //     resolve(data);
  //   });
  // });

  // return new Promise((res, rej) => {
  //   console.log('Attempting Amazon recog');
  //   Promise.all([faces, labels, modlabels, celebs]).then(values => {
  //     let faces = values[0];
  //     // let labels = values[1];
  //     // let modlabels = values[2];
  //     // let celebs = values[3];
  //     let result = {
  //       text
  //       // faces, labels, modlabels, celebs
  //     }
  //     resolve({"amazon":result});
  //     console.log(JSON.stringify(result))
  //   })
  // })


// }


export default ImageRecog;
// export default AWSRekognize;