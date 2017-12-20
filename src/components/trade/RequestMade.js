import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';
import Payments from '../payments/Payments.js';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

class RequestMade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      tracking:'',
      showDetail: false,
      submitAdd: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendAddress = this.sendAddress.bind(this);
    this.sendTracking = this.sendTracking.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  sendAddress() {
    firebase.database().ref('/request')
    .child(this.props.reqMade.exchangee[0])
    .child('received')
    .child(this.props.reqMade.item[0])
    .child('exaddress')
    .set(this.state.address)

    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('made')
    .child(this.props.reqMade.item[0])
    .child('address')
    .set(this.state.address)

  }
  sendTracking() {
    firebase.database().ref('/request')
    .child(this.props.reqMade.exchangee[0])
    .child('received')
    .child(this.props.reqMade.item[0])
    .child('tracking')
    .set(this.state.tracking)

    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('made')
    .child(this.props.reqMade.item[0])
    .child('sentTracking')
    .set(this.state.tracking)
  }

  handlePayment() {
    firebase.database().ref('/request')
    .child(this.props.userId)
    .child('made')
    .child(this.props.reqMade.item[0])
    .child('paied')
    .set(true)
    firebase.database().ref('/request')
    .child(this.props.reqMade.exchangee[0])
    .child('received')
    .child(this.props.reqMade.item[0])
    .child('paied')
    .set(true)
  }

  handleChange(e) {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value})
  };

  toggleDetail() {
    this.setState({showDetail: !this.state.showDetail})
  }

  render() {
    return(this.props.reqMade ? 
      <div>
        <div className={`req-container ${this.state.showDetail ? 'req-container-clicked' : null}`} onClick={this.toggleDetail}>
          <div className="reqdate">
            <p>
             {this.props.reqMade.date}
            </p>
          </div>
          <div className="requser">
          <Link to={`/profile/:${this.props.reqMade.exchangee[0]}`}>
            <p>{this.props.reqMade.exchangee[1]['profileInfo']['username']}</p>
          </Link>
          </div>
          <div className="reqitem">
            <div className="reqitem-div">
              <img src={this.props.reqMade.item[1]['images'][0]}/>
              <div className="req-item-div-title">
                <p>{this.props.reqMade.item[1]['title']}</p>
              </div>
            </div>
          </div>
          <div className="reqtype">
            <p>
              {this.props.reqMade.buy ? 'purchase ' : null}
              {this.props.reqMade.trade ? 'trade ' : null}
              {this.props.reqMade.loan ? 'rent ' : null}
            </p>
          </div>
          <div className="reqstatus">
            {this.props.reqMade.accept === 'pro' 
              ? <p>sent request</p> 
              : (this.props.reqMade.accept 
                ? <p className="green">accepted</p> 
                : <p className="red">rejected</p>)}
          </div>
        </div>
        {this.state.showDetail
          ? <div className="req-detail-container">
              {this.props.reqMade.loan
                              ? <div className="req-detail-loan">
                                  <h4>return date</h4>
                                  <p>{this.props.reqMade.dueDate}</p>
                                  <h4>initial price</h4>
                                  <p>{`$ ${this.props.reqMade.initialPrice}`}</p>
                                  <h4>late fee</h4>
                                  <p>{`$ ${this.props.reqMade.lateFee}`}</p>
                                </div>
                              : null}

              {this.props.reqMade.buy
                ? <div className="req-detail-ontheway">
                    <h4>offer price</h4> 
                    <p>{`$ ${this.props.reqMade.price}`}</p>
                  </div>
                : null}
              
              {this.props.reqMade.trade && this.props.reqMade.exaddress.length > 0 
                ? <div className="req-detail-send">
                    <h4>address to send</h4>
                    <p>{this.props.reqMade.exaddress}</p>
                    {this.props.reqMade.sentTracking.length < 1
                    ? <div className="req-detail-sendadd">
                        <h4>after sent trading item submit tracking number</h4>
                        <input name="tracking" 
                              type="text" 
                              placeholder="write tracking number" 
                              onChange={this.handleChange}
                              value={this.state.tracking}/>
                        <button onClick={this.sendTracking}>submit</button>
                      </div>
                    : <p>you've sent item (tracking number: {this.props.reqMade.sentTracking})</p>}
                  </div>
                : null}
          
              {this.props.reqMade.accept === true 
                ? <div className="req-detail-getadd">
                    <h4>address</h4>
                    {this.props.reqMade.address.length < 1
                      ? <div className="req-detail-sendadd">
                          <input name="address" 
                                type="text" 
                                placeholder="write address" 
                                onChange={this.handleChange}
                                value={this.state.address}/>
                          <button onClick={this.sendAddress}>send your address</button>
                        </div>
                      : <p>{this.props.reqMade.address}</p>}
                  </div>
                : null}

              <div className="req-detail-pay">
              {(this.props.reqMade.buy && this.props.reqMade.accept === true && this.props.reqMade.paied === false) 
                || (this.props.reqMade.initialPrice.length > 0 && this.props.reqMade.accept === true && this.props.reqMade.paied === false)
                ? <Payments 
                    handlePayment={this.handlePayment}
                    userName={this.props.userObj.profileInfo.username}
                    description={`$${this.props.reqMade.price.length > 0 ? this.props.reqMade.price : this.props.reqMade.initialPrice} for ${this.props.reqMade.item[1]['name']}`}
                    amount={this.props.reqMade.price.length > 0 ? parseInt(this.props.reqMade.price) * 100 : parseInt(this.props.reqMade.initialPrice) * 100} />
                : (this.props.reqMade.paied ? <h4>your payment has been processed</h4> : null)}
                </div>
                
              {this.props.reqMade.tracking.length > 0 
                ? <div className="req-detail-ontheway">
                    <h4>your item is on the way</h4>
                    <p>{this.props.reqMade.tracking}</p>
                  </div>
                : null}
                
            </div>
          : null}
      </div>
      : null
    )
  }
}
export default RequestMade;