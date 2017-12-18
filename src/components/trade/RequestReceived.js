import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

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
        <div className="req-container" onClick={this.toggleDetail}>
          <div className="reqdate">{this.props.reqRec.date}</div>
          <div className="requser">{this.props.reqRec.exchangee[1]['profileInfo']['username']}</div>
          <div className="reqitem">
            <img src={this.props.reqRec.item[1]['images'][0]}/>
            <div>{this.props.reqRec.item[1]['name']}</div>
          </div>
          <div className="reqtype">
            {this.props.reqRec.buy ? 'purchase ' : null}{this.props.reqRec.trade ? 'trade ' : null}{this.props.reqRec.loan ? 'rent ' : null}
          </div>
        
          <div className="reqstatus">
            {this.props.reqRec.accept === 'pro' 
              ? <div>
                  <button name="true" onClick={this.handleAccept}>accept</button>
                  <button name="false" onClick={this.handleAccept}>reject</button> 
                </div>
              : (this.props.reqRec.accept ? 'accepted' : 'rejected')}
          </div>
        </div>
      
        {this.state.showDetail
          ? <div>
              {this.props.reqRec.message.length > 0
              ?<div>
                <div>message from {this.props.reqRec.exchangee[1]['profileInfo']['username']}</div>
                <p>{this.props.reqRec.message}</p>
              </div>
              :null}
              
              {this.props.reqRec.price.length > 0 
                ? <div>
                    <div>offer price</div> 
                    <div>{this.props.reqRec.price}</div>
                  </div>
                : null}

              {this.props.reqRec.loan
                ? <div>
                    <div>return date</div>
                    <div>{this.props.reqRec.dueDate}</div>
                    <div>initial price</div>
                    <div>{this.props.reqRec.initialPrice}</div>
                    <div>late fee</div>
                    <div>{this.props.reqRec.lateFee}</div>
                  </div>
                : null}
              {this.props.reqRec.trade
                ? <div>
                    <div>trading item</div>
                    <img src={this.props.reqRec.tradeItem[1]['images'][0]}/>
                    <div>{this.props.reqRec.tradeItem[1]['name']}</div>
                  </div>
                : null}

              {this.props.reqRec.accept === true && this.props.reqRec.trade 
                ? <div>
                    <h4>address</h4>
                    {this.props.reqRec.address.length < 1
                      ? <div>
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

              {(this.props.reqRec.trade && this.props.reqRec.exaddress.length > 0) || (this.props.reqRec.paied && this.props.reqRec.exaddress.length > 0)
                ? <div>
                    <h5>address to send</h5>
                    <div>{this.props.reqRec.exaddress}</div>
                    {this.props.reqRec.sentTracking.length < 1
                      ? <div>
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
                ? <div>
                    <h5>your item is on the way</h5>
                    <div>{this.props.reqRec.tracking}</div>
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