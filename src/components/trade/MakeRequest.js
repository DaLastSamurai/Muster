import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import TradeSearchToggler from './TradeSearchToggler.jsx';
import { TradeSearch } from './TradeSearch.jsx';
import Search from './TradeSearch.jsx'

class MakeRequest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchUser: '',
      exUserObj:[],
      trade: false,
      tradeItem: {}, //items id that user selected to trade with
      buy: true,
      price: '',
      tradeCol: '',
      loan: false,
      dueDate:'',
      initPrice:'',
      lateFee: '',
      message: '',
      showSearchBox : true,
      selectedItem : window.selectedItem,
      tempSelectedItem: false,
    }
  
  window.setSelectedItemState = (objectId, itemObj, name) => {
    this.setState({selectedItem: objectId}, () => console.log('THIS IS THE SSTATE', this.state.selectedItem, '>>>', objectId, 'this is hit obj', itemObj))
  }
  
  window.setSelectedItemState.bind(this);
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

handletradeItem(itemid) {
  let tempObj = {}
  tempObj[itemid] = itemid;
  this.setState({tradeItem: tempObj})
}

toggleCheckbox(e) {
  let name = e.target.name;
  this.setState({
    [name]: !this.state[name]
  })
}

handleRequest() {
  this.props.toggleMakeRequest()
  if (Object.keys(this.state.tradeItem).length > 1) {
    alert('you can only exchange one item')
  } else {
    let mduserObj = null;
    let tradeItemObj = null;
    let rquserObj = null;
    new Promise((resolve, request) => {
      let userKey = this.state.selectedItem[1]['uid']
      users.child(userKey).on('value', (snap) => {
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
        date: new Date().toDateString(),
        paied: false,
        sentItem: false,
        receivedItem: false,
        sentTradeItem: false,
        receivedTradeItem: false,
        exaddress: '',
        tracking:'',
        address:'',
        sentTracking: '',
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
        // console.log(snap.val())
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
        date: new Date().toDateString(),
        paied: false,
        sentItem: false,
        receivedItem: false,
        sentTradeItem: false,
        receivedTradeItem: false,
        exaddress: '',
        tracking: '',
        address:'',
        sentTracking: '',
      }

      if (Object.keys(this.state.tradeItem)[0]) {
        dateRec['tradeItem'] = [Object.keys(this.state.tradeItem)[0], tradeItemObj]
      } else {
        dateRec['tradeItem'] = {}
      }

      let updateRec = {};
      // console.log('///',dateRec)
      updateRec['/request/' + this.state.selectedItem[1]['uid'] + '/received/' + this.state.selectedItem[0]] = dateRec;
      // console.log(updateRec)
      return firebase.database().ref().update(updateRec)
    })
    .then(() => {
      whindow.indexName = "";
      this.setState({
        searchUser: '',
        exUserObj:[],
        trade: false,
        tradeItem: {},
        buy: true,
        price: '',
        tradeCol: '',
        loan: false,
        dueDate:'',
        initPrice:'',
        lateFee: '',
        message: '',
        showSearchBox : true,
        selectedItem : false,
        tempSelectedItem: false,
      })
    })
  }
}

handleshowSearchBox() {
  // this.setState({showSearchBox:true})
}

  render() {
    // console.log(this.state.showSearchBox)
    return(
      <div className="request-form-box">
        <div className="req-search-box">
          <h4>search</h4>
            <div className="req-search">
              <div className="search-form">
                <TradeSearchToggler 
                  handleshowSearchBox={this.handleshowSearchBox}
                  getIndexName={this.props.getIndexName}
                />

                {this.state.showSearchBox ?
                (<TradeSearch />) : (<div/>)
                }
                <div className="search-result-container">
                {window.indexName ?
                (<Search />) : (<div/>)
                }
                {this.state.selectedItem ? <div className="image-thumb"><img src={this.state.selectedItem[1]['images'][0]} /><div className="image-thumbnail-title"><p>{this.state.selectedItem[2]}</p></div></div> : null} 
                </div>
              </div>
            </div>
        </div>
        <div className="req-offer-box">
          <h4>offer</h4>
          <div className="req-offer-frame">
            <div className="req-offer">
              <h5 onClick={() => this.setState({buy: true, trade: false, loan: false})}
                  className={`offer-buy ${this.state.buy ? 'offer-selected' : null}`}>buy</h5>
              <h5 onClick={()=> this.setState({buy: false, trade: true, loan: false})}
                  className={`offer-trade ${this.state.trade ? 'offer-selected' : null}`}>trade</h5>
              <h5 onClick={() => this.setState({buy: false, trade: false, loan: true})}
                  className={`offer-loan  ${this.state.loan ? 'offer-selected' : null}`}>loan</h5>
            </div>
            <div className="req-offer-form">  
              {this.state.buy 
                ? <div className="offer-buy-form">
                    <p>$</p>
                    <input name="price"
                          type="text"
                          onChange={this.handleChange}
                          placeholder="type your offer price"/>
                  </div>
                : null}
              {this.props.collections && this.state.trade
                ? <div className="offer-trade-form">
                    <select onChange={this.handleSelect}> 
                      <option value='' defaultValue>select your collection</option>
                      {Object.keys(this.props.collections).map((col) => {
                        return <option value={col} key={col}>
                                {this.props.collections[col]['name']}
                              </option> 
                      })}
                    </select>
                    <div className="offer-trade-items-box">
                      {this.state.tradeCol.length > 0 
                        ? Object.keys(this.props.collections[this.state.tradeCol]['itemId']).map((itemid) => {
                            return <div key={itemid} onClick={() => this.handletradeItem(itemid)} 
                                        className={`offer-trade-item ${this.state.tradeItem[itemid] ? "trade-item-click" : null }`}>
                                    <img src={this.props.items[itemid]['images'][0]}/>
                                    <p>{this.props.items[itemid]['title']}</p>
                                    {/* <input name={itemid} type="checkbox" onChange={this.handletradeItem}/> */}
                                  </div>
                          })
                        : null}
                      </div>
                  </div>
                : null}
              {this.state.loan 
                ? <div className="offer-loan-form">
                    <div className="offer-loan-form-initial">
                      <p>$</p>
                      <input name="initPrice" 
                            type="text" 
                            placeholder="initial price" 
                            onChange={this.handleChange}
                            value={this.state.initPrice}/>
                    </div>
                    <div className="offer-loan-form-late">
                      <p>$</p>
                      <input name="lateFee" 
                            type="text" 
                            placeholder="late fee" 
                            onChange={this.handleChange}
                            value={this.state.lateFee}/> 
                    </div>
                    <div className="offer-loan-form-due">
                      <input name="dueDate" 
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.dueDate}/>
                    </div>
                  </div>
                : null}
            </div>
          </div>
        </div>
        <div className="message-form-box">
          <h4>message</h4>
          <div className="message-form">
            <input name="message" 
                        type="text" 
                        placeholder="write message" 
                        onChange={this.handleChange}
                        value={this.state.message}
                        className="message-input"/>
          </div>
        </div>
          <button onClick={this.handleRequest}
                  className="button-sendoffer">Send Offer</button>
        
      </div>
    )
  }
}

export default MakeRequest;