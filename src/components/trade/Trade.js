import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, rootRef, collection, category, item, users} from '../../../config/firebaseCredentials';

import RequestMade from './RequestMade';
import RequestReceived from './RequestReceived';
import MakeRequest from './MakeRequest';

import { InstantSearch, SearchBox, Hits, Highlight, Pagination } from 'react-instantsearch/dom';

class Trade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMR: false,
      indexName: 'item',
    }
    this.toggleMakeRequest = this.toggleMakeRequest.bind(this);
    this.getIndexName = this.getIndexName.bind(this);
  }

  toggleMakeRequest() {
   this.setState({showMR: !this.state.showMR})
  }  

  getIndexName(indexName) {
    this.setState({indexName : indexName})
  }

  render() {
    return(
      <InstantSearch
      appId="9VH3I9OJWS"
      apiKey="289636a507e4853ef95cc5b7e4cac8d9"
      indexName={this.state.indexName || 'item'}
      >
        <div>
          <button onClick={this.toggleMakeRequest}>Make Request</button>
          {this.state.showMR 
            ? <MakeRequest collections={this.props.collections}
                          getIndexName={this.getIndexName} 
                          items={this.props.items} 
                          userId={this.props.userId}
                          indexName={this.state.indexName}
                          /> 
            : null}
            <div>
              <h2>Trade Request You Made</h2>
                {this.props.request && this.props.request.made 
                  ? <div>
                      <h4>date</h4>  <h4>item owner</h4>  <h4>item</h4>  <h4>trade type</h4>  <h4>status</h4>
                      {Object.keys(this.props.request.made).map((reqItem) => {
                        return <RequestMade key={reqItem} id={reqItem} reqMade={this.props.request['made'][reqItem]} />
                      })}
                    </div>
                  : 'no request'}
              <h2>Trade Request You Received</h2>
                {this.props.request && this.props.request.received 
                  ? <RequestReceived reqRec={this.props.request.received} /> 
                  : 'no request'}
            </div>
        </div>
      </InstantSearch>
    )
  }
}

export default Trade;
