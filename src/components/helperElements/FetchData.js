import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

export const getPopularCategory = function() {
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
  };

  export const getCollection = function(userid) {
    new Promise((resolve, reject) => {
      users.child(userid).on('value',(snap) => {
        let array = [];
        for(var key in snap.val().collectionIds){
          if(key !== "0") {
            array.push(key)
          }
        }
        return resolve(array)
      })
    })
    .then((collectionIdArr) => {
      var arr = [];
      collectionIdArr.forEach(id => {
        var tempPromise = new Promise((resolve, reject) => {
          collection.child(id).on('value', (snap) => {
            resolve([id, snap.val()])
          })
        })
        arr.push(tempPromise);
      })
      return Promise.all(arr);
    })
    .then((colArr) => {
      var tempObj = {};
      colArr.forEach((col) => {
        tempObj[col[0]] = col[1]
      })
      this.setState({collections: tempObj});
      return tempObj;
    })
    .then((colObj) => {
      // console.log('from state collections', this.state.collections)
      var itemIdArr = [];
      Object.values(colObj).forEach((eachObj) => {
        if (eachObj.itemId) {
          itemIdArr = itemIdArr.concat(Object.keys(eachObj.itemId));
        }
      })
      this.getItem(itemIdArr);
      this.getCategory(this.state.collections);
    })
  }

  export const getItem = function(itemIdArr) {
    let itemObjArr = [];
    itemIdArr.forEach((itemId) => {
      let tempPromise = new Promise((resolve, reject) => {
        item.child(itemId).on('value', (snap) => {
          resolve([itemId, snap.val()])
        })
      })
      itemObjArr.push(tempPromise)
    })
    return Promise.all(itemObjArr)
    .then((data) => {
      let tempObj = {};
      data.forEach((arr) => {
        tempObj[arr[0]] = arr[1]
      })
      this.setState({items: tempObj})
    })
    .then(() => {
      // console.log('from state items', this.state.items)
    })
  }

  export const getCategory = function(collectionObj) {
    let categoryArr = [];
    Object.values(collectionObj).forEach((obj) => {
      let catId = obj.categoryId
      let temp = new Promise((resolve, reject) => {
        category.child(catId).on('value', (snap) => {
          resolve([catId, snap.val()])
        })
      })
      categoryArr.push(temp);
    })
    return Promise.all(categoryArr)
    .then((data) => {
      let tempObj = {};
      data.forEach((arr) => {
        tempObj[arr[0]] = arr[1]
      })
      this.setState({categorys: tempObj})
      // console.log('get category from state', this.state.categorys)
    })
  }
