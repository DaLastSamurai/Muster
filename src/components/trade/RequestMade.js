import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class RequestMade extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(this.props.reqMade ? 
      <div>
        <div>{this.props.reqMade.date}</div>
        {/* <div>{this.props.reqMade.exchangee[1]['profileInfo']['username']}</div> */}
        <img src={this.props.reqMade.item[1['imageUrl']]}/>
        <div>{this.props.reqMade.item[1]['name']}</div>
        <div>{this.props.reqMade.buy ? 'purchase ' : null}{this.props.reqMade.trade ? 'trade ' : null}{this.props.reqMade.loan ? 'rent ' : null}</div>
        <div>{this.props.reqMade.accept === 'pro' ? 'sent request' : (this.props.reqMade.accept ? 'accepted' : 'rejected')}</div>
        {this.props.reqMade.accept === 'accepted' ? }
      </div>
      : null
    )
  }
}

export default RequestMade;
{/* <div>exchangee</div>
        <div>item</div>
        <div>your offer</div>
        <div>status</div>// if you got rejected show rejected, if deal is done trade closed deal
        <div>(if your offer accepted, drop down to payment and send address || if exchange, send address shows)</div>
        <div>(after pay receved button shows || if exchange, sent button shows)</div>
        <div>after received button clicked, ask add trade item into your collection</div> */}