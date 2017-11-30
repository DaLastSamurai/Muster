import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  // read through helper functions to understand the following render.

  render() {
    console.log(this.state)
    return (
      <div className='SearchBar'>
        <input type="text" value={this.state.searchValue} onChange={(e) => {
          // do something with the search value.
          this.setState({searchValue:e.target.value})
        }} />

        <button type="button" onClick={() => {
          this.props.search(this.state.searchValue);
        }}>
          Search
        </button>
      </div>
    )
  }
}
