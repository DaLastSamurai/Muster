import React from 'react';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';



class ManageInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categorys: {},
      collections: {},
      items: {},
      sortBycategory: [],
      sortBycollection: [],
      sortBylocation: [],
    }
    this.getCollection = this.getCollection.bind(this);
    this.getItem = this.getItem.bind(this);
    // this.getCategory = this.getCategory.bind(this);
  }
 
  componentDidMount() {
    this.props.userId ? this.getCollection(this.props.userId) : console.log('no props');
  }

  getCollection(userid) {
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
      var itemIdArr = [];
      Object.values(colObj).forEach((eachObj) => {
        if (eachObj.itemId) {
          itemIdArr = itemIdArr.concat(Object.keys(eachObj.itemId));
        }
      })
      this.getItem(itemIdArr);
      this.getCategory();
    })
  }

  getItem(itemIdArr) {
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
    })
  }

  getCategory() {
    let categoryArr = [];
    Object.values(this.state.collections).forEach((obj) => {
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
      console.log('aaaaa', data)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      if(this.props.userId !== null) {
        this.getCollection(this.props.userId)
      }
      return true
    }
    return false
  }
  
  render() {
    return(
      <div>
        <select>
          <option value="collection">by collection</option>
          <option value="location">by location</option>
          <option value="category">by category</option>
        </select>
      </div>
    )
  }
}

export default ManageInventory;

// import React from 'react';
// import Dragula from 'react-dragula';
// import firebase from 'firebase';
// import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';



// class ManageInventory extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       dragNodes: [],
//     }
//     this.dragulaDecorator = this.dragulaDecorator.bind(this);
//   }
 
//   componentDidMount() {
//     var node = this.refs.node;
//     var node2 = this.refs.node2;
//     this.dragulaDecorator([node,node2])
//   }

//   dragulaDecorator(componentBackingInstance){
//     if (componentBackingInstance) {
//       let options = {};
//       Dragula(componentBackingInstance, options).on('drag', function() {
//         console.log('dragging')
//       })
//     }
//   };
  
//   render() {
//       return(
//           <div>
//             <div ref='node'>
//               <div>Swap me around</div>
//               <div>Swap her around</div>
//               <div>Swap him around</div>
//               <div>Swap them around</div>
//               <div>Swap us around</div>
//               <div>Swap things around</div>
//               <div>Swap everything around</div>
//             </div>
//             <div ref='node2'>
//               <div>me around</div>
//               <div>her around</div>
//               <div>him around</div>
//               <div>them around</div>
//               <div>us around</div>
//               <div>things around</div>
//               <div>everything around</div>
//             </div>
//           </div>
//     )
//   }
// }

// export default ManageInventory;