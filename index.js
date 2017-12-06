const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
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
// Get allData from Firebase
// database.ref().once('value', allData => {
//   // Build an array of all records to push to Algolia
//   const records = [];
//   allData.forEach(allData => {
//     // get the key and data from the snapshot
//     const childKey = allData.key;
//     const childData = allData.val();
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
//       console.log('allData imported into Algolia');
//     })
//     .catch(error => {
//       console.error('Error when importing allData into Algolia', error);
//       process.exit(1);
//     });
// });

const rootRef = database.ref();
rootRef.on('child_added', addOrUpdateIndexRecord);
rootRef.on('child_changed', addOrUpdateIndexRecord);
rootRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(rootRef) {
  // Get Firebase object
  const records = rootRef.val();
  // Specify Algolia's objectID using the Firebase object key
  records.objectID = rootRef.key;
  // Add or update object
  index
    .saveObject(records)
    .then(() => {
      console.log('Firebase object indexed in Algolia', records.objectID);
    })
    .catch(error => {
      console.error('Error when indexing rootRef into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord(rootRef) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = rootRef.key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting rootRef from Algolia', error);
      process.exit(1);
    });
}
