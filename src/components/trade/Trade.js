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
        {this.state.showMR 
          ? <MakeRequest collections={this.props.collections} 
                         items={this.props.items} 
                         userId={this.props.userId} /> 
          : null}
          <div>
            <h2>Trade Request You Made</h2>
              {this.props.request.made 
                ? <div>
                    <h4>date</h4>  <h4>item owner</h4>  <h4>item</h4>  <h4>trade type</h4>  <h4>status</h4>
                    {Object.keys(this.props.request.made).map((reqItem) => {
                      return <RequestMade key={reqItem} id={reqItem} reqMade={this.props.request['made'][reqItem]} />
                    })}
                  </div>
                : 'no request'}
            <h2>Trade Request You Received</h2>
              {this.props.request.received 
                ? <RequestReceived reqRec={this.props.request.received} /> 
                : 'no request'}
          </div>
      </div>
    )
  }
}

export default Trade;
