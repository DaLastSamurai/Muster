import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../config/firebaseCredentials';

const getPopularCategory = function() {
    new Promise((resolve, reject) => {
      category.on('value', (snap) => {
        return resolve(snap.val())
      })
    })
    .then((categoryObj) => {
      var arr = [];
      Object.keys(categoryObj).forEach((key) => {
        var tempPromise = new Promise((resolve, reject) => {
          let collectionCount = Object.keys(categoryObj[key]['collectionId']).length
          resolve([key, categoryObj[key], collectionCount])
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .then((data) => {
      return data.sort((a, b) => {
        return b[2] - a[2];
      })
    })
    .then(data => {
      this.setState({popularCategoryList: data})
    })
  }

  exports.getPopularCategory