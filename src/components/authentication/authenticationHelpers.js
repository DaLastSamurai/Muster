import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import firebase from 'firebase'

// this is used in the app.js to check to see if there is a user signed in. 

export const checkAuthStatus = function(cb1, cb2, cb3) {

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
              following: ['RKBeM50YH3VBRY6Io8UUL8eojPo1'], // =seamus lol 
              followers: ['RKBeM50YH3VBRY6Io8UUL8eojPo1'], // =seamus lol 
              bio: 'tell me about yourself...', 
              username : user.email, 
            }
            let updates = {};
            updates[user.uid + '/defaultsSet'] = true; 
            updates[user.uid + '/profileInfo'] = profileInfo
            updates[user.uid + '/info'] = basicInfo;
            return users.update(updates)
          }
          cb1(user.uid)
          cb2(user.uid)
          cb3(user.uid)
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

