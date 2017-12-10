import React from 'react';

export default class SearchToggler extends React.Component {
    constructor(props){
    super(props);
    this.state = {
		}
		this.searchByHandler = this.searchByHandler.bind(this);
	}

	searchByHandler(e) {
		this.props.searchBy(e.target.value);
		window.indexName = e.target.value;
		// console.log('window',window.indexName);
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
