import React from 'react';

class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return( 
      <div className='popular-category' key={this.props.id}>
        <img src={this.props.category.pictureurl}/>
        <h4>{this.props.category.name}</h4>
      </div>
    )
  }
}

export default PopularCategoryEntry;