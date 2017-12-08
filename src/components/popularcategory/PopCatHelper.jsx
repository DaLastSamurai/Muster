import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';


export const addToFavCat = function(category) {
  let currentUID = firebase.auth().currentUser.uid;
  let updates = {};
  updates[currentUID + '/profileInfo/favoriteCategories/' + category] = category
  return users.update(updates);
}


export const removeFromFavCat = function(category) {
  let currentUID = firebase.auth().currentUser.uid;
  console.log('this should DELETE from your favorites')
  firebase.database().ref("users/" + currentUID+ "/profileInfo/favoriteCategories/" + category).remove()
}
