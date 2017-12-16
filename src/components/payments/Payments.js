import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';


class Payments extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
        <StripeCheckout 
            name={this.props.userName}
            description={this.props.description}
            amount={this.props.amount}
            // token={token =>{this.props.handleToken(token)}}
            stripeKey = "pk_test_I2yd8RwncnL08WEDu6iRP77v" >
        <button className="btn" onClick={this.props.handlePayment}>
        Pay
        </button>
        </StripeCheckout>
    );
  }
};


export default Payments;
