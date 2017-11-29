import React from 'react';

class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return( 
      <div className='popular-category' onClick={() => this.props.getCollection(this.props.popularItem.id)}>
        <img src={this.props.popularItem.image}/>
        <h4 key={this.props.id}>{this.props.popularItem.title}</h4>
        <p key={this.props.id}>{this.props.popularItem.tag}</p>
      </div>
    )
  }
}

export default PopularCategoryEntry;