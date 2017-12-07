import React from 'react';
import Dragula from 'react-dragula';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';



class ManageInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categorys: [],
      collections: [],
      itmes: [],
    }
    this.getItems = this.getItems.bind(this);
  }
 
  componentDidMount() {
    this.getItems(this.props.userId)
  }

  getItems(userid) {
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
    .then((data) => {
      this.setState({collections: data})
      return data
    })
    .then((collectionArr) => {
      return collectionArr.map(eachCol => {
        return eachCol[1];
      })
    })
    .then((colObjs) => {
      console.log('colobj',colObjs)
    })

  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      if(this.props.userId !== null) {
        this.getItems(this.props.userId)
      }
      return true
    }
    return false
  }
  
  render() {
    return(
      <div>
        <select>
          <option value="volvo">by collection</option>
          <option value="saab">by location</option>
          <option value="mercedes">by category</option>
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