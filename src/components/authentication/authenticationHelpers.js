import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import firebase from 'firebase'

export const checkAuthStatus = function() {
  firebaseAuth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        authed: true,
        user: user,
        userId: user.uid,
      }, () => {
        firebase.database().ref(`/users/${user.uid}/defaultsSet`).on('value', (snapshot) => {
          // if the defaults have not been set: 
          if (!snapshot.val()) { 
            // set defaults:
            let basicInfo = {
              email: user.email, 
              isPaidUser: false, 
            }
            let profileInfo = {
              profilePhoto: 'http://bit.ly/2BoCV0Y', 
              following: ['AStkSi2lt3hFprd77H8GXoNq2KJ3'], // =seamus lol 
              followers: ['AStkSi2lt3hFprd77H8GXoNq2KJ3'], // =seamus lol 
              bio: 'tell me about yourself...', 
              favoriteCategories: ['Baseball Cards'],
              username : user.email, 
            }
            let updates = {};
            updates[user.uid + '/defaultsSet'] = true; 
            updates[user.uid + '/profileInfo'] = profileInfo
            updates[user.uid + '/collectionIds'] = [0]; 
            updates[user.uid + '/info'] = basicInfo;
            return users.update(updates)
          }
        })
      })
    } else {
      this.setState({
        authed : false,
        user : null,
      })
    }
  })
}

