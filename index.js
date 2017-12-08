const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv'); //configure algolia environment
const firebase = require('firebase');

// load values from the .env file in this directory into process.env
dotenv.load();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

/////////////////////////////////////////////////////////////////////////////
// One time get allData from Firebase
// database.ref('item/').once('value', items => {
//   // Build an array of all records to push to Algolia
//   const records = [];
//   items.forEach(items => {
//     // get the key and data from the snapshot
//     const childKey = items.key;
//     const childData = items.val();
//     // We set the Algolia objectID as the Firebase .key
//     childData.objectID = childKey;
//     // Add object for indexing
//     records.push(childData);
//   });
//
//   // Add or update new objects
//   index
//     .saveObjects(records)
//     .then(() => {
//       console.log('items imported into Algolia');
//     })
//     .catch(error => {
//       console.error('Error when importing items into Algolia', error);
//       process.exit(1);
//     });
// });

const items = database.ref('items/');
items.on('child_added', addOrUpdateIndexRecord);
items.on('child_changed', addOrUpdateIndexRecord);
items.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(items) {
  // Get Firebase object
  const records = items.val();
  // Specify Algolia's objectID using the Firebase object key
  records.objectID = items.key;
  // Add or update object
  index
    .saveObject(records)
    .then(() => {
      console.log('Firebase object indexed in Algolia', records.objectID);
    })
    .catch(error => {
      console.error('Error when indexing items into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord(items) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = items.key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting items from Algolia', error);
      process.exit(1);
    });
}
