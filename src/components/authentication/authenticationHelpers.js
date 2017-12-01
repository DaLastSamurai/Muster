import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

export const checkAuthStatus = function() {
  firebaseAuth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        authed: true,
        user: user,
      }, () => {
        let basicInfo = {
          email: user.email, 
          isPaidUser: false, 
        }
        let profileInfo = {
          profilePhoto: 'http://bit.ly/2BoCV0Y', 
          following: ['PVj0eR1eM7NyTOlsKUv2Qt9K6293'], // =seamus lol 
          followers: ['PVj0eR1eM7NyTOlsKUv2Qt9K6293'], // =seamus lol 
          bio: 'tell me about yourself...', 
          favoriteCategories: ['Baseball Cards'],
          username : user.email, 
        }
        let updates = {};
        updates[user.uid + '/profileInfo'] = profileInfo
        updates[user.uid + '/collectionIds'] = [0]; 
        updates[user.uid + '/info'] = basicInfo;
        return users.update(updates)
      })
    } else {
      this.setState({
        authed : false,
        user : null,
      })
    }
  })
}

