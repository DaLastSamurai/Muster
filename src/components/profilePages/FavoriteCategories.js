import React from 'react';
import firebase from 'firebase';
import { firebaseAuth, users, category, collection } from '../../../config/firebaseCredentials';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
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
    
    var userId = firebaseAuth().currentUser.uid
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
        resolve(snap.val()[userId].profileInfo.favoriteCategories)
      })
    })
    .then((userFavCatObj) => {
      for(var key in userFavCatObj) {
        // get user's favorite categories' name at index 0
        if(!!userFavCatObj[key][0]) {
          let currentCat = userFavCatObj[key][0]
          if(!!this.state.allCategories[currentCat]) {
            //grab random collection
            let ranCollectionIndex = Math.floor(Math.random() * (Object.keys(this.state.allCategories[currentCat].collectionId).length));
            let ranCollectionHashes = Object.keys(this.state.allCategories[currentCat].collectionId)[ranCollectionIndex]
            let randomCollection = this.state.allCategories[currentCat].collectionId[ranCollectionHashes]
            let currentCollectionId = this.state.allCategories[currentCat].collectionId;
            this.state.favoriteCategories.push([currentCat, this.state.collection[ranCollectionHashes].photoUrl, randomCollection])
          }
        }
      }
      this.setState({favoriteCategories : this.state.favoriteCategories})
    })
  }

  render() {
    return (
      <div >
        <h3> My Favorite Categories </h3>
        <div className="carousel-images" >
            {
              this.state.favoriteCategories.map((category) =>
              <div class="card">
                  <Link className="clickable-text" to={`/collections/:${category[0]}`}>
                      <img className="card-size-images" src={category[1]!== ''? category[1] : "http://www.wrbh.org/wp-content/uploads/2017/02/ReadyPlayerONe.jpg"}/>
                      <h5>{category[0]}</h5>
                  </Link>
                </div>
              )
            }
        </div>
        </div>
    );
  }
};
