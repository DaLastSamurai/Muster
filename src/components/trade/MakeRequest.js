import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import TradeSearchToggler from './TradeSearchToggler.jsx';
import { TradeSearch, Search } from './TradeSearch.jsx';

class MakeRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchUser: '',
      exUserObj:[],
      selectedItem:['-L05bY3TFt2wbfh5TtOf', {uid: 'ra2wZZt7aYguQMpjKwtZ0HRIpMh1', imageUrl: "https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F9f1f7675-9a93-4555-b70d-1ca1f40e446a.jpg?alt=media&token=7c42873c-18fc-4f42-91a5-2f354325cb35", name: "onion"}],
      trade: false,
      tradeItem: {}, //items id that user selected to trade with
      buy: false,
      price: '',
      tradeCol: '',
      loan: false,
      dueDate:'',
      initPrice:'',
      lateFee: '',
      message: '',
      showSearchBox : false,
      selectedItem : window.selectedItem,
    }
  this.handleRequest = this.handleRequest.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.getUser = this.getUser.bind(this);
  this.toggleCheckbox = this.toggleCheckbox.bind(this);
  this.handleSelect = this.handleSelect.bind(this);
  this.handletradeItem = this.handletradeItem.bind(this);
  this.handleshowSearchBox = this.handleshowSearchBox.bind(this);
  }

handleChange(e) {
  e.preventDefault()
  let name = e.target.name;
  let value = e.target.value;
  this.setState({[name]: value})
};

handleSelect(e) {
  this.setState({tradeCol: e.target.value})
}

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

handletradeItem(e) {
  if (this.state.tradeItem[e.target.name]) {
    let tempObj = this.state.tradeItem
    delete tempObj[e.target.name]
    this.setState({tradeItem: tempObj})
  } else {
     let obj = this.state.tradeItem
     obj[e.target.name] = e.target.name;
     this.setState({tradeItem: obj})
  }
}

toggleCheckbox(e) {
  let name = e.target.name;
  this.setState({
    [name]: !this.state[name]
  })
}

handleRequest() {
  console.log('aaaaaaa',this.state)
  if (Object.keys(this.state.tradeItem).length > 1) {
    alert('you can only exchange one item')
  } else {
    let mduserObj = null;
    let tradeItemObj = null;
    let rquserObj = null;
    new Promise((resolve, request) => {
      let userKey = this.state.selectedItem[1]['uid']
      users.child(userKey).on('value', (snap) => {
        // console.log('>>>>',snap.val())
        mduserObj = snap.val()
        resolve(snap.val())
      })
    })
    .then(() => {
      if (this.state.trade) {
        item.child(Object.keys(this.state.tradeItem)[0]).on('value', (snap) => {
          tradeItemObj = snap.val()
        })
      } else {
        tradeItemObj = null;
      }
      
    })
    .then(() =>{
      let dataMade = {
        item: this.state.selectedItem,
        exchangee: [this.state.selectedItem[1]['uid'], mduserObj],
        trade: this.state.trade,
        buy: this.state.buy,
        price: this.state.price,
        loan: this.state.loan,
        dueDate: this.state.dueDate,
        initialPrice: this.state.initPrice,
        lateFee: this.state.lateFee,
        message: this.state.message,
        accept: "pro",
        date: new Date(),
        paied: false,
        sentItem: false,
        receivedItem: false,
        sentTradeItem: false,
        receivedTradeItem: false,
        exaddress: '',
        tracking:'',
      }

      if (Object.keys(this.state.tradeItem)[0]) {
        dataMade['tradeItem'] = [Object.keys(this.state.tradeItem)[0], tradeItemObj]
      } else {
        dataMade['tradeItem'] = {}
      }
      
      let updateMade = {};
      updateMade['/request/' + this.props.userId + '/made/' + this.state.selectedItem[0]] = dataMade;
      return firebase.database().ref().update(updateMade)
    })
    .then(() => {
      users.child(this.props.userId).on('value', (snap) => {
        console.log(snap.val())
        rquserObj = snap.val()
        return snap.val()
      })
    })
    .then(() => {
      let dateRec = {
        item: this.state.selectedItem,
        exchangee: [this.props.userId, rquserObj],
        trade: this.state.trade,
        buy: this.state.buy,
        price: this.state.price,
        loan: this.state.loan,
        dueDate: this.state.dueDate,
        initialPrice: this.state.initPrice,
        lateFee: this.state.lateFee,
        message: this.state.message,
        accept: "pro",
        date: new Date(),
        paied: false,
        sentItem: false,
        receivedItem: false,
        sentTradeItem: false,
        receivedTradeItem: false,
        exaddress: '',
        tracking: '',
      }

      if (Object.keys(this.state.tradeItem)[0]) {
        dateRec['tradeItem'] = [Object.keys(this.state.tradeItem)[0], tradeItemObj]
      } else {
        dateRec['tradeItem'] = {}
      }

      let updateRec = {};
      console.log('///',dateRec)
      updateRec['/request/' + this.state.selectedItem[1]['uid'] + '/received/' + this.state.selectedItem[0]] = dateRec;
      console.log(updateRec)
      return firebase.database().ref().update(updateRec)
    })
  }
}

handleshowSearchBox() {
  this.setState({showSearchBox:true})
}

  render() {
    console.log(this.state.showSearchBox)
    return(<div>
        <h4>search</h4>
        {/* <input name="searchUser"
               type="text"
               placeholder="search for user"
               value={this.state.searchUser}
               onChange={this.handleChange}/>

        <button onClick={() => {
          this.setState({searchUser: ''})
          return this.getUser(this.state.searchUser)}}>search</button> */}
/////////////////////////////////////////////////////////////////////////////////////////////
          <TradeSearchToggler 
            handleshowSearchBox={this.handleshowSearchBox}
            getIndexName={this.props.getIndexName}
          />

          {this.state.showSearchBox ?
          (<TradeSearch />) : (<div/>)
          }
          {window.indexName ?
          (<Search />) : (<div/>)
          }

          <button onClick={()=>this.setState({selectedItem : window.selectedItem})}> 
            set the state
          </button>
          <button onClick={()=>console.log(this.state.selectedItem)}> show me the state</button>
<br/>
/////////////////////////////////////////////////////////////////////////////////////////////
        <h4>offer</h4>

        <label>buy</label>
        <input name="buy"
               type="checkbox"
               checked={this.state.buy}
               onChange={this.toggleCheckbox}/>

        {this.state.buy 
          ? <input name="price"
                   type="text"
                   onChange={this.handleChange}
                   placeholder="type your offer price"/>
          : null}

        <label>trade</label>
        <input name="trade"
               type="checkbox"
               checked={this.state.trade}
               onChange={this.toggleCheckbox}/>
        
        {this.props.collections && this.state.trade ?
        <div>
          <select onChange={this.handleSelect}> 
            <option value='' defaultValue>select your collection</option>
            {Object.keys(this.props.collections).map((col) => {
              return <option value={col} key={col}>
                      {this.props.collections[col]['name']}
                    </option> 
            })}
          </select>

          {this.state.tradeCol.length > 0 ? 
            Object.keys(this.props.collections[this.state.tradeCol]['itemId']).map((itemid) => {
              return <div key={itemid}>
                      <img src={this.props.items[itemid]['imageUrl']}/>
                      <p>{this.props.items[itemid]['name']}</p>
                      <input name={itemid} type="checkbox" onChange={this.handletradeItem}/>
                    </div>
            })
          : null}
        </div>
        : null}
        <label>loan</label>
        <input name="loan" type="checkbox" onChange={this.toggleCheckbox}/>
        {this.state.loan 
          ? <div>
              <input name="initPrice" 
                     type="text" 
                     placeholder="initial price" 
                     onChange={this.handleChange}
                     value={this.state.initPrice}/>
              <input name="lateFee" 
                     type="text" 
                     placeholder="late fee" 
                     onChange={this.handleChange}
                     value={this.state.lateFee}/> 
              <input name="dueDate" 
                     type="date"
                     onChange={this.handleChange}
                     value={this.state.dueDate}/>
              </div>
          : null}
        <h4>message</h4>
        <input name="message" 
                     type="text" 
                     placeholder="write message" 
                     onChange={this.handleChange}
                     value={this.state.message}/>
        <button onClick={this.handleRequest}>Make Request</button>
      </div>
    )
  }
}

export default MakeRequest;
// data structure
// request: 
//   userId: {
//     made: {
//       itemid: {item: itemId,
//              exchangee: 'uid',
//              rent: {dueDate: 123, initialPrice: 0},
//              offer: {itemId: itemId, itemId: itemId  }|| price,
//              accept: true || false,
//              message: '',
//              received: true || false,
//              sent: true || false,
//              address: '',
//              paied: false,
//              date: ''
//              requestId:''},
//           }
//     received: {
//       itemid : {item: itemId,
//               exchangee: 'uid',
//               rent: {dueDate: 123, initialPrice: 0},
//               offer: {itemId: itemId, itemId: itemId  }|| price,
//               accept: true || false,
//               message: '',
//               sent: true || false,
//               received: false,
//               address: ''
//               date: ''
//               requestId:''},
//             }
//   }