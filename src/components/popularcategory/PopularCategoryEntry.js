import React from 'react';

class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return( 
      <div className='popular-category' onClick={() => 
        this.props.handleClickFromPopularCat(this.props.popularCategory.collectionId)
      }>
        <img src={this.props.popularCategory.pictureurl}/>
        <h4 key={this.props.id}>{this.props.popularCategory.name}</h4>
      </div>
    )
  }
}

export default PopularCategoryEntry;