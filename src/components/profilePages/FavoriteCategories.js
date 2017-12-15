import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users, category, collection } from '../../../config/firebaseCredentials';
import Slider from 'react-slick';

export default class FavoriteCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUID: '',
      favoriteCategories: [],
      allCategories:[], 
      collection : {},
    };
  };


  componentDidMount() {
    this.setState({currentUID: firebaseAuth().currentUser.uid})

    new Promise((resolve, reject) => {
      collection.on("value", (snap) => {
        this.setState({collection : snap.val()})
      })
      //set all categories to state
      category.on("value", (snap) => {
        this.setState({allCategories : snap.val()})
      })
      // get all user's favorite categories
      users.on("value", (snap) => {
        // set user's favorited categories to state and pass in promise
        resolve(snap.val()[this.state.currentUID].profileInfo.favoriteCategories)
      })
    })
    .then((userFavCatObj) => {
      for(var key in userFavCatObj) {
        // get user's favorite categories' name at index 0
        if(!!userFavCatObj[key][0]) {
          let currentCat = userFavCatObj[key][0]
          if(!!this.state.allCategories[currentCat]) {
            // console.log('fav cat ',this.state.allCategories[currentCat].collectionId)
            //grab random collection
            let ranCollectionIndex = Math.floor(Math.random() * (Object.keys(this.state.allCategories[currentCat].collectionId).length));
            let ranCollectionHashes = Object.keys(this.state.allCategories[currentCat].collectionId)[ranCollectionIndex]
            // console.log('this is the hash',ranCollectionHash)
            let randomCollection = this.state.allCategories[currentCat].collectionId[ranCollectionHashes]
            // console.log(ranCollectionHashes)
            // console.log('random collection >>>>',randomCollection)
            // console.log('collection photoUrl',this.state.collection[ranCollectionHashes].photoUrl)
            this.state.favoriteCategories.push([currentCat, this.state.collection[ranCollectionHashes].photoUrl])
          }
        }
      }
      this.setState({favoriteCategories : this.state.favoriteCategories})
    })
  }

  render() {
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true
    };
    console.log(this.state.favoriteCategories)
    return (
      <div className="carousel-container">
        <h3> Your Favorite Categories </h3>
        <Slider {...settings}>
          {
            this.state.favoriteCategories.map((category) =>
              <div>
                {()=> {'>>>>>' + console.log(category)}}
                <img src={category[1]!== ''? category[1] : "http://www.wrbh.org/wp-content/uploads/2017/02/ReadyPlayerONe.jpg"}/>
                {/* <img src={"http://www.wrbh.org/wp-content/uploads/2017/02/ReadyPlayerONe.jpg"}/> */}
              </div>
            )
          }
        </Slider>
      </div>
    );
  }
};
