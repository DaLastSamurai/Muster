import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

class RequestReceived extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <div>exchangee</div>
        <div>item</div>
        <div>offer you got</div>
        <div>reject button</div>
        <div>accept button</div>
        <div>(if you accept, show processing || if exchange, drop down send address )</div>
        <div>(after get paied sent button shows)</div>
        <div>after sent button clicked, ask delete trade item if you exchenged, ask you want to add into yout collection</div>
      </div>
    )
  }
}

export default RequestReceived;