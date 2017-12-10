const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv'); //configure algolia environment
const firebase = require('firebase');
// load values from the .env file in this directory into process.env
dotenv.load();

//////////////////////////////////////////// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const database = firebase.database();

//////////////////////////////////////////// install api client / configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
///////////////////////////////////////////// create my indexes
const item = algolia.initIndex('item');
const users  = algolia.initIndex('users')
const category  = algolia.initIndex('category')
const collection  = algolia.initIndex('collection')
////////////////////////////////////////////

// item.setSettings({
//   searchableAttributes: [
//     'name',
//     'categories',
//     'users'
//   ]
  // customRanking: ['desc(popularity)'],
// });

///////////////////////////////////////////////////////////////////////////// INitial Import / One time get allData from Firebase
// database.ref('users/').once('value', item => {
//   // Build an array of all records to push to Algolia
//   const records = [];
//   item.forEach(item => {
//     // get the key and data from the snapshot
//     const childKey = item.key;
//     const childData = item.val();
//     // We set the Algolia objectID as the Firebase .key
//     childData.objectID = childKey;
//     // Add object for indexing
//     records.push(childData);
//   });

//   // Add or update new objects
//   users
//     .saveObjects(records)
//     .then(() => {
//       console.log('items imported into Algolia');
//     })
//     .catch(error => {
//       console.error('Error when importing items into Algolia', error);
//       process.exit(1);
//     });
// });
/////////////////////////////////////////////////////////////////////////////

const itemRef = database.ref('item/');
itemRef.on('child_added', addOrUpdateItemRecord);
itemRef.on('child_changed', addOrUpdateItemRecord);
itemRef.on('child_removed', deleteItemRecord);

function addOrUpdateItemRecord(items) {
  // Get Firebase object
  const records = items.val();
  // Specify Algolia's objectID using the Firebase object key
  records.objectID = items.key;
  // Add or update object
  item
    .saveObject(records)
    .then(() => {
      console.log('Firebase object indexed in Algolia', records.objectID);
    })
    .catch(error => {
      console.error('Error when indexing items into Algolia', error);
      process.exit(1);
    });
}

function deleteItemRecord(items) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = items.key;
  // Remove the object from Algolia
  item
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting item from Algolia', error);
      process.exit(1);
    });
}

const userRef = database.ref('users/');
userRef.on('child_added', addOrUpdateUserRecord);
userRef.on('child_changed', addOrUpdateUserRecord);
userRef.on('child_removed', deleteUserRecord);

function addOrUpdateUserRecord(user) {
  // Get Firebase object
  const records = user.val();
  // Specify Algolia's objectID using the Firebase object key
  records.objectID = user.key;
  // Add or update object
  users
    .saveObject(records)
    .then(() => {
      console.log('Firebase object indexed in Algolia', records.objectID);
    })
    .catch(error => {
      console.error('Error when indexing users into Algolia', error);
      process.exit(1);
    });
}

function deleteUserRecord(user) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = user.key;
  // Remove the object from Algolia
  users
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting user from Algolia', error);
      process.exit(1);
    });
}


// const userRef = database.ref('users/');
// userRef.on('child_added', addOrUpdateUserRecord);
// userRef.on('child_changed', addOrUpdateUserRecord);
// userRef.on('child_removed', deleteUserRecord);

// function addOrUpdateUserRecord(user) {
//   // Get Firebase object
//   const records = user.val();
//   // Specify Algolia's objectID using the Firebase object key
//   records.objectID = user.key;
//   // Add or update object
//   users
//     .saveObject(records)
//     .then(() => {
//       console.log('Firebase object indexed in Algolia', records.objectID);
//     })
//     .catch(error => {
//       console.error('Error when indexing users into Algolia', error);
//       process.exit(1);
//     });
// }

// function deleteUserRecord(user) {
//   // Get Algolia's objectID from the Firebase object key
//   const objectID = user.key;
//   // Remove the object from Algolia
//   users
//     .deleteObject(objectID)
//     .then(() => {
//       console.log('Firebase object deleted from Algolia', objectID);
//     })
//     .catch(error => {
//       console.error('Error when deleting user from Algolia', error);
//       process.exit(1);
//     });
// }
