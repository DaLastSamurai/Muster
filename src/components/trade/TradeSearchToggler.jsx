import React from 'react';

export default class SearchToggler extends React.Component {
    constructor(props){
    super(props);
    this.state = {
		}
		this.getIndexNameHandler = this.getIndexNameHandler.bind(this);
	}

	getIndexNameHandler(e) {
		window.indexName = e.target.value
		this.props.getIndexName(e.target.value)
		console.log('>>>>>>>>>>>',e.target.value)
	}

	render() {
		return(
			<div onClick={this.props.handleshowSearchBox}>
				<select onChange={this.getIndexNameHandler}>
					<option value="item">by items </option>
					<option value="users">by users </option>
					<option value="category">by category </option>
				</select>
			</div>
		)
	}
}
