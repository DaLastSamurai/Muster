import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import { TradeSearch } from './TradeSearch.jsx'
import Search from './TradeSearch.jsx'
import SearchToggler from '../helperElements/SearchToggler.jsx'


class MakeRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchUser: '',
      exUserObj:[],
      exchangeeUid: '',
      itemId: null,
      offer: null,
      message: '',
      trade: false,
      pay: false,
      showSearch: false,
      selectedItem: window.selectedItem,
    }
  this.handleRequest = this.handleRequest.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.getUser = this.getUser.bind(this);
  this.toggleCheckbox = this.toggleCheckbox.bind(this);
  this.toggleShowSearch = this.toggleShowSearch.bind(this);
  }

handleChange(e) {
  e.preventDefault()
  let name = e.target.name;
  let value = e.target.value;
  this.setState({[name]: value})
};

getUser(userName) {
  let allUser = {}
  new Promise((resolve, reject) => {
    users.on('value', (snap) => {
      allUser = snap.val();
      resolve(snap.val())
    })
  })
  .then((user) => {
    Object.keys(user).forEach((userId) => {
      if (allUser[userId]['profileInfo']['username'] === userName) {
        this.setState({getUser: [userId, allUser[userId]]})
      }
    })
  })
}

handleRequest() {
  this.setState({selectedItem: window.selectedItem})
  console.log('state', this.state.selectedItem)
}

toggleCheckbox(e) {
  let name = e.target.name;
  this.setState({
    [name]: !this.state[name]
  })
}

toggleShowSearch() {
  this.setState({showSearch: true})
}


  render() {
    return(
      <div>
        <h3>search</h3>

        {/* <input name="searchUser"
          type="text"
          placeholder="search for user"
          value={this.state.searchUser}
          onChange={this.handleChange}/>

        <button onClick={() => {
          this.setState({searchUser: ''})
          return this.getUser(this.state.searchUser)
          }}>search</button> */}
          
        <SearchToggler searchBy={this.props.searchBy} toggleShowSearch={this.toggleShowSearch}/>

        {this.state.showSearch ? (< TradeSearch/>) : null } 
        {this.state.showSearch ? < Search /> : null }

        <h3>offer</h3>
        <label>trade</label>
        <input name="trade"
               type="checkbox"
               onChange={this.toggleCheckbox}/>
        <label>pay</label>
        <input name="pay"
               type="checkbox"
               onChange={this.toggleCheckbox}/>
        <input name="offer"
               type="text"
               placeholder="type your offer price"/>
        <input name="itemId"
               />
      </div>
    )
  }
}

export default MakeRequest;

// request: 
//   userId: {
//     made: {
//       item: {itemId: itemId, itemId:itemId},
//       exchangee: 'uid',
//       lend: date,
//       offer: {itemId: itemId, itemId: itemId  }|| price,
//       accepted: true || false,
//       message: '',
//       received: true || false,
//       sent: true || false,
//       address: '',
//       paied: false,
//     },
//     received: {
//       item: {itemId: itemId, itemId:itemId},
//       exchangee: 'uid',
//       rent: date,
//       offer: {itemId: itemId, itemId: itemId  }|| price,
//       accept: true || false,
//       message: '',
//       sent: true || false,
//       received: false,
//       address: '',
//     }
//   }