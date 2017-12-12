import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

import RequestMade from './RequestMade';
import RequestReceived from './RequestReceived';
import MakeRequest from './MakeRequest';

class Trade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMR: false,
    }
    this.toggleMakeRequest = this.toggleMakeRequest.bind(this);
  }

  toggleMakeRequest() {
   this.setState({showMR: !this.state.showMR})
  }

  render() {
    return(
      <div>
        <button onClick={this.toggleMakeRequest}>Make Request</button>
        {this.state.showMR ? <MakeRequest searchBy={this.props.searchBy}/> : null}
        <h2>Trade Request You Made</h2>
        <RequestMade />
        <h2>Trade Request You Received</h2>
        <RequestReceived />
      </div>
    )
  }
}

export default Trade;

// data structure
// request: 
//   userId: {
//     made: {
//       item: {itemId: itemId, itemId:itemId},
//       exchangee: 'uid',
//       lend: date,
//       offer: {itemId: itemId, itemId: itemId  }|| price,
//       accepted: true || false,
//       message: '',
//       received: true || false,
//       sent: true || false,
//       address: '',
//       paied: false,
//     },
//     received: {
//       item: {itemId: itemId, itemId:itemId},
//       exchangee: 'uid',
//       rent: date,
//       offer: {itemId: itemId, itemId: itemId  }|| price,
//       accept: true || false,
//       message: '',
//       sent: true || false,
//       received: false,
//       address: '',
//     }
//   }