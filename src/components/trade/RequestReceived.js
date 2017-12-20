import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

class RequestReceived extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      tracking: '',
      showDetail: false,
    }
    this.handleAccept = this.handleAccept.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendAddress = this.sendAddress.bind(this);
    this.sendTracking = this.sendTracking.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  handleChange(e) {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value})
  };

  sendAddress() {
    firebase.database().ref('/request')
    .child(this.props.reqRec.exchangee[0])
    .child('made')
    .child(this.props.reqRec.item[0])
    .child('exaddress')
    .set(this.state.address)

    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('received')
    .child(this.props.reqRec.item[0])
    .child('address')
    .set(this.state.address)
  }
  sendTracking() {
    console.log('asdf')
    firebase.database().ref('/request')
    .child(this.props.reqRec.exchangee[0])
    .child('made')
    .child(this.props.reqRec.item[0])
    .child('tracking')
    .set(this.state.tracking)

    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('received')
    .child(this.props.reqRec.item[0])
    .child('sentTracking')
    .set(this.state.tracking)
  }

  handleAccept(e) {
    console.log(e.target.name)
    let accVal = null;
    e.target.name === 'true' ? (accVal = true) : (accVal = false)
    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('received')
    .child(this.props.reqRec.item[0])
    .child('accept')
    .set(accVal)

    firebase.database().ref('/request')
    .child(this.props.reqRec.exchangee[0])
    .child('made')
    .child(this.props.reqRec.item[0])
    .child('accept')
    .set(accVal)
  }

  toggleDetail() {
    this.setState({showDetail: !this.state.showDetail})
  }

  render() {
    return(this.props.reqRec ? 
      <div>
        <div className={`req-container ${this.state.showDetail ? 'req-container-clicked' : null}`} onClick={this.toggleDetail}>
          <div className="reqdate">
            <p>{this.props.reqRec.date}</p>
          </div>
          <Link to={`/profile/:${this.props.reqRec.exchangee[0]}`}>
            <div className="requser">
              <p>{this.props.reqRec.exchangee[1]['profileInfo']['username']}</p>
            </div>
          </Link>
          <div className="reqitem">
            <div className="reqitem-div">
              <img src={this.props.reqRec.item[1]['images'][0]}/>
              <p>{this.props.reqRec.item[1]['title']}</p>
            </div>
          </div>
          <div className="reqtype">
            <p>
              {this.props.reqRec.buy ? 'purchase ' : null}
              {this.props.reqRec.trade ? 'trade ' : null}
              {this.props.reqRec.loan ? 'rent ' : null}
            </p>
          </div>
        
          <div className="reqstatus">
            {this.props.reqRec.accept === 'pro' 
              ? <div className="reqstatus-button-box">
                  <button name="true" onClick={this.handleAccept}>accept</button>
                  <button name="false" onClick={this.handleAccept}>reject</button> 
                </div>
              : <p className={this.props.reqRec.accept ? 'green' : 'red'}>{this.props.reqRec.accept ? 'accepted' : 'rejected'}</p>}
          </div>
        </div>
      
        {this.state.showDetail
          ? <div className="req-detail-container">
              {this.props.reqRec.message.length > 0
              ?<div className="req-detail-message">
                <h4>message from {this.props.reqRec.exchangee[1]['profileInfo']['username']}</h4>
                <p>{this.props.reqRec.message}</p>
              </div>
              :null}
              
              {this.props.reqRec.price.length > 0 
                ? <div className="req-detail-ontheway">
                    <h4>offer price</h4> 
                    <p>{this.props.reqRec.price}</p>
                  </div>
                : null}

              {this.props.reqRec.loan
                ? <div className="req-detail-loan">
                    <h4>return date</h4>
                    <p>{this.props.reqRec.dueDate}</p>
                    <h4>initial price</h4>
                    <p>{this.props.reqRec.initialPrice}</p>
                    <h4>late fee</h4>
                    <p>{this.props.reqRec.lateFee}</p>
                  </div>
                : null}
              {this.props.reqRec.trade
                ? <div className="req-detail-trade">
                    <h4>trading item</h4>
                    <img src={this.props.reqRec.tradeItem[1]['images'][0]}/>
                    <p>{this.props.reqRec.tradeItem[1]['name']}</p>
                  </div>
                : null}

              {this.props.reqRec.accept === true && this.props.reqRec.trade 
                ? <div className="req-detail-getadd">
                    <h4>address</h4>
                    {this.props.reqRec.address.length < 1
                      ? <div className="req-detail-sendadd">
                          <input name="address" 
                                 type="text" 
                                 placeholder="write address" 
                                 onChange={this.handleChange}
                                 value={this.state.address}/>
                          <button onClick={this.sendAddress}>send your address</button>
                        </div>
                      : <p>{this.props.reqRec.address}</p>}
                  </div>
                : null}

              {this.props.reqRec.paied
                ?<p>payment received</p>
                : null}

              {(this.props.reqRec.trade && this.props.reqRec.exaddress.length > 0) 
                || (this.props.reqRec.paied && this.props.reqRec.exaddress.length > 0)
                ? <div className="req-detail-getadd">
                    <h5>address to send</h5>
                    <p>{this.props.reqRec.exaddress}</p>
                    {this.props.reqRec.sentTracking.length < 1
                      ? <div className="req-detail-sendadd">
                          <h5>after sent trading item submit tracking number</h5>
                          <input name="tracking" 
                                      type="text" 
                                      placeholder="write tracking number" 
                                      onChange={this.handleChange}
                                      value={this.state.tracking}/>
                          <button onClick={this.sendTracking}>submit</button>
                        </div>
                      : <p>you've sent item (tracking number: {this.props.reqRec.sentTracking})</p>}
                  </div>
                : null}

                {this.props.reqRec.tracking.length > 0 
                ? <div className="req-detail-ontheway">
                    <h5>your item is on the way</h5>
                    <p>{this.props.reqRec.tracking}</p>
                  </div>
                : null}
            </div>
            : null}
      </div>
      : null
    )
  }
}

export default RequestReceived;