import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import firebase from 'firebase';

class PopularCategoryEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.checkIfFavCatContains = this.checkIfFavCatContains.bind(this);
  }

  handleLike(e) {
    this.props.addToFavCat(e.target.value);
    this.state[e.target.value] = !this.state[e.target.value];
    console.log('like2',this.state[e.target.value])
  }

  handleDislike(e) {
    this.props.removeFromFavCat(e.target.value);
    // console.log('HANDLE DISLIKE 1111111111',this.state[e.target.value])
    this.state[e.target.value] = !this.state[e.target.value];
    console.log('HANDLE DISLIKE 22222222222',this.state[e.target.value])
  }

  checkIfFavCatContains(key) {
    // console.log('111111',key) //key is popular category
    let currentUID = firebase.auth().currentUser.uid;
    return firebase.database().ref("users/" + currentUID + "/profileInfo/favoriteCategories")
      .on('value', (snap) => {
      // console.log('this is the snap.val', Object.keys(snap.val()), 'this is the key: ', key)
      var isFavorite = (Object.values(snap.val()).includes(key)); //my fav categories includes(key)?
      // console.log(isFavorite, 'popcatkey', key, 'myfavcat', snap.val())
      })
  }

  render() {
    // console.log(this.state)
    this.checkIfFavCatContains(this.props.id) //this should set state
    return(
      <div className='popular-category' key={this.props.id}>
      <Link to={`/collections/:${this.props.category[0]}`}>
        <img src={this.props.category[1].pictureurl}/>
        <h4>{this.props.category[0]}</h4>
        </Link>
        <div>
          {(this.state[this.props.id])
          ?(<button value={this.props.id} onClick={this.handleDislike}>Unlike</button>)
          :(<button value={this.props.id} onClick={this.handleLike}>Like!</button>)
          }
        </div>
      </div>
    )
  }
}

export default PopularCategoryEntry;
