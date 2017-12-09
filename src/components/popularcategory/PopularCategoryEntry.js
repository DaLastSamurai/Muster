import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase';

// PopularCategoryEntry recieves props from popularCategoryList. 

export default class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likedCategories : []
    }
    this.handleLike = this.handleLike.bind(this);
    // this.handleDislike = this.handleDislike.bind(this);
  }
  
  componentWillMount() {
    this.fetchFavoriteCategories()
  }

  handleLike(e) {
    let curUid = firebase.auth().currentUser.uid;
    let catObj = this.props.category
    let favCategoryPath = `users/${curUid}/profileInfo/favoriteCategories`
    firebase.database().ref(favCategoryPath).push(catObj)
  }

//   handleDislike(e) {
//     let categoryId = e.target.value

//     removeFromFavCat = function(category) {
//   let currentUID = firebase.auth().currentUser.uid;
//   console.log('this should DELETE from your favorites')
//   users.child(curUid) + currentUID+ "/profileInfo/favoriteCategories/" + category).remove()
// }

//     this.state[e.target.value] = !this.state[e.target.value];
//   }

  fetchFavoriteCategories() {
    let curUid = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${curUid}/profileInfo/favoriteCategories`)
      .on('value', catObj => {
        let dataObj = Object.values(catObj.val())
        let categoryNames = dataObj.map(cat => cat[0])
        console.log('this is the categoryNames', categoryNames)
        this.setState( {likedCategories : categoryNames} )
      })
  }
  
  render() {
    console.log('these are props in the PopularCategoryEntry', this.props)
    return(
      <div className='popular-category' key={this.props.id}>
      <Link to={`/collections/:${this.props.category[0]}`}>
        <img src={this.props.category[1].pictureurl}/>
        <h4>{this.props.category[0]}</h4>
        </Link>
        <div>
          {!!firebase.auth().currentUser ?
            ( 
              this.state.likedCategories.includes(this.props.category[0])
                ? (<button value={this.props.category} onClick={this.handleDislike}>Unlike</button>)
                : (<button value={this.props.category} onClick={this.handleLike}>Like!</button>)
            ) : <div /> 
          }
        </div>
      </div>
    )
  }
}

