import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class RequestMade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      tracking:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendAddress = this.sendAddress.bind(this);
    this.sendTracking = this.sendTracking.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  sendAddress() {
    firebase.database().ref('/request').child(this.props.reqMade.exchangee[0]).child('received').child(this.props.reqMade.item[0]).child('exaddress').set(this.state.address)
  }
  sendTracking() {
    console.log('///')
    firebase.database().ref('/request').child(this.props.reqMade.exchangee[0]).child('received').child(this.props.reqMade.item[0]).child('tracking').set(this.state.tracking)
  }

  handlePayment() {
    firebase.database().ref('/request').child(this.props.userId).child('made').child(this.props.reqMade.item[0]).child('paied').set(true)
    firebase.database().ref('/request').child(this.props.reqMade.exchangee[0]).child('received').child(this.props.reqMade.item[0]).child('paied').set(true)
  }

  handleChange(e) {
    e.preventDefault()
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value})
  };

  render() {
    return(this.props.reqMade ? 
      <div>
        <div>{this.props.reqMade.date}</div>
        <div>{this.props.reqMade.exchangee[1]['profileInfo']['username']}</div>
        <img src={this.props.reqMade.item[1]['imageUrl']}/>
        <div>{this.props.reqMade.item[1]['name']}</div>
        <div>{this.props.reqMade.buy ? 'purchase ' : null}{this.props.reqMade.trade ? 'trade ' : null}{this.props.reqMade.loan ? 'rent ' : null}</div>
        <div>{this.props.reqMade.accept === 'pro' ? 'sent request' : (this.props.reqMade.accept ? 'accepted' : 'rejected')}</div>
        {this.props.reqMade.accept === true 
          ? <div>
              <h4>address</h4>
              <input name="address" 
                          type="text" 
                          placeholder="write address" 
                          onChange={this.handleChange}
                          value={this.state.address}/>
              <button onClick={this.sendAddress}>send your address</button>
            </div>
          : null}
        {this.props.reqMade.trade && this.props.reqMade.exaddress.length > 0 
          ? <div>
              <h5>address to send</h5>
              <div>{this.props.reqMade.exaddress}</div>
              <h5>after sent trading item submit tracking number</h5>
              <input name="tracking" 
                          type="text" 
                          placeholder="write tracking number" 
                          onChange={this.handleChange}
                          value={this.state.tracking}/>
              <button onClick={this.sendTracking}>submit</button>
            </div>
          : null}
        {this.props.reqMade.loan
          ? <div>
              <div>return date</div>
              <div>{this.props.reqMade.dueDate}</div>
              <div>initial price</div>
              <div>{this.props.reqMade.initialPrice}</div>
              <div>late fee</div>
              <div>{this.props.reqMade.lateFee}</div>
            </div>
          : null}
        {(this.props.reqMade.buy && (this.props.reqMade.accept === true)) || (this.props.reqMade.initialPrice.length > 0 && (this.props.reqMade.accept === true)) 
          ? <button onClick={this.handlePayment}>pay</button>
          : null}
        {this.props.reqMade.tracking.length > 0 
          ? <div>
              <h5>your item is on the way</h5>
              <div>{this.props.reqMade.tracking}</div>
            </div>
          : null}
      </div>
      : null
    )
  }
}

export default RequestMade;