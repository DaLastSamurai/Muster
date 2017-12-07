import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

export const addToFavCat = function(category) {
  let currentUID = firebase.auth().currentUser.uid;
  console.log('this is the uid ' + currentUID)

  let updates = {};
  updates[currentUID + '/profileInfo/favoriteCategories/' + category] = 'can we maybe sort this by most recently updated cat? '
  return users.update(updates);
}
