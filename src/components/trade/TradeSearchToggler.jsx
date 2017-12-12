import React from 'react';

export default class SearchToggler extends React.Component {
    constructor(props){
    super(props);
    this.state = {
		}
		this.tradeWithHandler = this.tradeWithHandler.bind(this);
	}

	tradeWithHandler(e) {
		this.props.tradeWith(e.target.value);
		window.indexName = e.target.value;
	}

	render() {
		return(
			<div>
				<select onChange={this.searchByHandler}>
					<option value="item">by items </option>
					<option value="users">by users </option>
					<option value="category">by category </option>
				</select>
			</div>
		)
	}
}
