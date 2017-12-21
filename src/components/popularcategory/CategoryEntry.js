import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase';
import { users } from '../../../config/firebaseCredentials'
// PopularCategoryEntry recieves props from popularCategoryList. 

class CategoryEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likedCategories : []
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  componentWillMount() {
    // only fetch data if there is data to fetch. If not, just render the props
    // without the like and unlike feature. 
    if (firebase.auth().currentUser !== null) {
      this.fetchAuthedUsersFavoriteCategories()
    }
  }

  handleLike(e) {
    let curUid = firebase.auth().currentUser.uid;
    let catObj = this.props.category
    let favCategoryPath = `users/${curUid}/profileInfo/favoriteCategories`
    firebase.database().ref(favCategoryPath).push(catObj)
  }

  handleUnlike(e) {
    let curUid = firebase.auth().currentUser.uid;
    let catObj = this.props.category
    firebase.database().ref(`users/${curUid}/profileInfo/favoriteCategories`)
      .once('value', categories => {
        // to accout for having no favorite categories, ternary to check for null
        let categoriesVal = !categories.val() ? {} : categories.val(); 
        let categoryValues = Object.values(categoriesVal)
        let keyHashes = Object.keys(categoriesVal)
        let match = categoryValues.reduce(
          (acc, el, idx) => 
            el[0] === this.props.category[0] ? keyHashes[idx] : acc, null)
        users.child(curUid).child('profileInfo').child('favoriteCategories')
             .child(match).remove()
      })
  }

  fetchAuthedUsersFavoriteCategories() {
    let curUid = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${curUid}/profileInfo/favoriteCategories`)
      .on('value', catObj => {
        // to accout for having no favorite categories, ternary to check for null
        let dataObj = !catObj.val() ? [] : Object.values(catObj.val())
        let categoryNames = dataObj.map(cat => cat[0])
        this.setState( {likedCategories : categoryNames} )
      })
  }

  render() {
    // add a carousel to these with images from the collections. 
    return(
      <div className='popular-category'>
        <img className="card-size-images" src="https://dailyartfair.com/upload/large/66/6601_6.jpg" />
        <div className="category-overlay-text">
          <Link className="clickable-text" to={`/collections/:${this.props.category[0]}`}>
            <h4>{this.props.category[0]}</h4>
          </Link>
        </div>
        <div className="like-button">
          {!!firebase.auth().currentUser ?
            ( 
              this.state.likedCategories.includes(this.props.category[0])
                ? (<button value={this.props.category} onClick={this.handleUnlike}>Unlike</button>)
                : (<button value={this.props.category} onClick={this.handleLike}>Like!</button>)
            ) : <div /> 
          }
        </div>
      </div>
    )
  }
}

export default CategoryEntry;