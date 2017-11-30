import React from 'react';
import PopularCategoryEntry from './PopularCategoryEntry';
import CollectionList from '../collections/CollectionList';

class PopularCategoryList extends React.Component {
  constructor() {
      super()
      this.state = {
        popularList: [
          {image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/200px-Magic_the_gathering-card_back.jpg', 
          title: 'Magic Card', 
          tag: '#magic card',
          id: 'this is id 1'},
          {image: 'https://images-na.ssl-images-amazon.com/images/I/717vogDbL4L._SY450_.jpg', 
          title: 'Pokémon Card', 
          tag: '#pokemon',
          id: 'this is id 2'},
          {image: 'https://pm1.narvii.com/6319/86cc60b5136d8c16bb078d5afdc7d8fbd5bcaa8b_hq.jpg', 
          title: 'Yusaku Card', 
          tag: '#yusaku card game',
          id: 'this is id 3'}
        ]
      };
    this.getCollection = this.getCollection.bind(this);
  }

  getCollection(categoryId) {
   console.log('getCollection in popular category', categoryId)
  }

  render() {
    return(
      <div>
          <div>popular list</div>
          <div>
            {this.state.popularList.map((popularItem) => 
            <PopularCategoryEntry popularItem={popularItem} getCollection={this.getCollection}/>)}
          </div>
      </div>
    )
  }
}

export default PopularCategoryList;