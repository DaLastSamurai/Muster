import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

   //retrieve the specific logged in users's UID > array of collection IDs
  //add new collectionID key from push into that array

  //add to collection with collectionID key
  //put in other stuff including uid
  // addCategory is a key that is a name.
  // addCollection is a name.
  // photoURL is a string.
export const addNewCollection = function(addCollection, addCategory, photoURL) {
    // console.log('new collection name', addCollection)
    // console.log('new category name', addCategory)
    // console.log('all collections', collection)
    // console.log('currentUID retrieved from auth', firebase.auth().currentUser.uid)
    // console.log('new hash for collection id', collection.push().key)

    let newCollectionId = collection.push().key
    let currentUID = firebase.auth().currentUser.uid

    let updateCollections = function() {
      let collectionData = {
        categoryId: addCategory,
        itemId:{},
        name:addCollection,
        photoUrl:"",
        publicCat: true,
        uid:[currentUID]
      }
      let updates = {};
      updates[newCollectionId] = collectionData;
      return collection.update(updates);
    }

    let updateUsers = function() {
      let updates = {};
      updates[currentUID + '/collectionIds/' + newCollectionId] = newCollectionId;
      return users.update(updates)
    }

    let updateCategory = () => {
      //if category already exists
      //add collection ID to that category -- only need collection ID

      if(this.state.category[addCategory]) {
        // console.log('this category already exists. Add collectionId to preexisting category');
        // console.log(this.state.category[addCategory])
        let updates = {};
        updates[addCategory + '/collectionId/' + newCollectionId] = addCollection
        return category.update(updates)
      } else {
        //if category is new
        //add create an entire new category object
        let updates = {}
        // updates.collectionId = {newCollectionId:collectionName}; //we can't do this here because keys can't be interpreted as variables
        updates.name = addCategory;
        updates.pictureurl = photoURL || "";
        firebase.database().ref('category/' + addCategory).set(updates)
        let collectionIdUpdate = {};
        collectionIdUpdate[addCategory + '/collectionId/' + newCollectionId] = addCollection;
        return category.update(collectionIdUpdate)
      }
    }

    updateCategory();
    updateCollections();
    updateUsers();
  }