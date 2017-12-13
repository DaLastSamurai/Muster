import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class RequestMade extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {console.log('>>>>>>Reqm',this.props.reqMade)
    return(this.props.reqMade ? 
      <div>
        {/* <h4>date</h4>  <h4>item owner</h4>  <h4>item</h4>  <h4>trade type</h4>  <h4>status</h4> */}
        <div>{this.props.reqMade.date}</div>
        <div>{'should be user name(need to be clickable)'}</div>
        <div>{'item pic and name should be clickable'}</div>
        <div>{this.props.reqMade.buy ? 'purchase ' : null}{this.props.reqMade.trade ? 'trade ' : null}{this.props.reqMade.loan ? 'rent ' : null}</div>
        <div>{this.props.reqMade.accept === 'pro' ? 'sent request' : (this.props.reqMade.accept ? 'accepted' : 'rejected')}</div>
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