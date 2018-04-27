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
      appId="E1SL0XPK2X"
      apiKey="626c569da94a754853920b18017d8760"
      indexName={this.state.indexName || 'item'}
      >
        <div className="main-container" >
          <div className="float-reqbox">
          <h2>Make Request</h2>
              <div className="container-requset-form">
              
                <div className="request-form">
                  <MakeRequest collections={this.props.collections}
                              getIndexName={this.getIndexName} 
                              items={this.props.items} 
                              userId={this.props.userId}
                              indexName={this.state.indexName}
                              toggleMakeRequest={this.toggleMakeRequest}
                              /> 
                </div>
              </div>
            </div>
          <div className="request-trans">
            <div className="reqmade">
              <div className="req-title">
                <h2>Trade Request You Made</h2>
              </div>
                {this.props.request && this.props.request.made 
                  ? <div>
                      <div className="req-container-title">
                        <h4 className="reqdate">date</h4>  <h4 className="requser">item owner</h4>  
                        <h4 className="reqitem">item</h4>  <h4 className="reqtype">trade type</h4>  <h4 className="reqstatus">status</h4>
                      </div>
                      {Object.keys(this.props.request.made).map((reqItem) => {
                        return <RequestMade 
                                userId={this.props.userId} 
                                key={reqItem} 
                                id={reqItem} 
                                reqMade={this.props.request['made'][reqItem]} 
                                userObj={this.props.userObj} />
                      })}
                    </div>
                  : 'no request'}
            </div>
            <div className="reqreceiv">
              <div className="req-title">
                <h2>Trade Request You Received</h2>
              </div>
                {this.props.request && this.props.request.received 
                  ? <div>
                      <div className="req-container-title">
                        <h4 className="reqdate">date</h4>  <h4 className="requser">person who offer</h4>  
                        <h4 className="reqitem">item</h4>  <h4 className="reqtype">trade type</h4>  <h4 className="reqstatus">status</h4>
                      </div>
                    {Object.keys(this.props.request.received).map((reqItem) => {
                      return <RequestReceived 
                               userId={this.props.userId} 
                               key={reqItem} 
                               id={reqItem} 
                               reqRec={this.props.request['received'][reqItem]} />
                    })}
                    </div> 
                : 'no request'}
            </div>
          </div>
        </div>
      </InstantSearch>
    )
  }
}

export default Trade;
