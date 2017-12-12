import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class RequestMade extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div>exchangee</div>
        <div>item</div>
        <div>your offer</div>
        <div>status</div>// if you got rejected show rejected, if deal is done trade closed deal
        <div>(if your offer accepted, drop down to payment and send address || if exchange, send address shows)</div>
        <div>(after pay receved button shows || if exchange, sent button shows)</div>
        <div>after received button clicked, ask add trade item into your collection</div>
      </div>
    )
  }
}

export default RequestMade;