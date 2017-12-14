import React from 'react';
import * as firebase from 'firebase';
import UserInfo from '../userBar/UserInfo.jsx';
import ImageUpload from '../helperElements/imageUploader';
import InProgressCarousel from './inProgressCarousel';
import ImageRecog from '../helperElements/imageRecog';

class AddItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //new book fields
      uid: null,
      title: '',
      images: [],
      notes: '',
      upc: '',
      onlinePrice: '',
      storeLinks: {},
      subject: '',
      
      //component fields
      id: null,
      keywords: [],
      customKeyword: '',
      savedKeywords: [],
      showDetailed: false,
      collectionList: [{id: null, name: 'loading collections...'}],
      
      //depricated fields
      sell: '',
      boughtFrom: '',
      collectionId: '',
      location: '',
      name: '',
      imageUrl: '',
      thumbnailUrl: '',
      price: '',
      productIds: '',
      purchaseTime: '',
      uid: null
    };

    this.setImageState = this.setImageState.bind(this);
    this.setKeywordsState = this.setKeywordsState.bind(this);
    this.setItemState = this.setItemState.bind(this);
    this.addRemoveKeyword = this.addRemoveKeyword.bind(this);
    this.addCustomeKeyword = this.addCustomeKeyword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  setImageState(imageUrl) {
    // this.setState({ imageUrl });
    this.state.imageUrl = imageUrl;
  };

  setKeywordsState(keywords) {
    this.setState({ keywords });
  };

  setItemState(item) {
    this.setState({
      title: item.title,
      images: item.images,
      notes: item.notes,
      upc: item.upc,
      onlinePrice: item.onlinePrice,
      storeLinks: item.storeLinks,
      subject: item.subject,

      id: item.id,
      name: item.name,
      imageUrl: item.images[0],
      collectionId: item.collectionId,
      location: item.location,
      keywords: [],
      savedKeywords: []
    });
  };

  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // };

  addRemoveKeyword(keyword) {
    let savedKeywords = this.state.savedKeywords;
    if (savedKeywords.includes(keyword)) {
      let index = savedKeywords.indexOf(keyword);
      if (index >= 0) { savedKeywords.splice(index, 1)};
    } else {
      savedKeywords = savedKeywords.concat(keyword);
    }
    this.setState({ savedKeywords });
    this.setState({ customKeyword:'' })
  };

  addCustomeKeyword(keyword){
    this.addRemoveKeyword(keyword);
  };

  handleChange(event) {
    event.preventDefault()
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleSubmit(event) {

    let currentUID = firebase.auth().currentUser.uid

    let postData = {
      boughtFrom: this.state.boughtFrom,
      collectionId: this.state.collectionId,
      location: this.state.location,
      name: this.state.name,
      notes: this.state.notes,
      imageUrl: this.state.imageUrl,
      price: this.state.price,
      productIds: this.state.productIds,
      purchaseTime: this.state.purchaseTime,
      savedKeywords: this.state.savedKeywords,
      sell: this.state.sell,
      uid: currentUID
    };
    
    let newPostKey = this.state.id || 
      firebase.database().ref('/item').push().key;

    let updates = {};
    updates['/item/' + newPostKey] = postData;
    updates['/collection/' + this.state.collectionId + 
            '/itemId/' + newPostKey] = newPostKey;

    return firebase.database().ref().update(updates);

    event.target.reset();
  };

  componentDidMount() {

    let collectionRef = firebase.database().ref('/collection');

    collectionRef.on("value", (snapshot) => {
      let currentUID = firebase.auth().currentUser.uid;

      let grabIdName = Object.keys(snapshot.val()).map((k, i) => {
        return {
          id: Object.keys(snapshot.val())[i],
          name: snapshot.val()[k].name,
          uid: snapshot.val()[k].uid
        }
      })
        .filter(collection => collection.uid.includes(currentUID));

      this.setState({
        collectionList: grabIdName
      });

    }, (error) => { console.error(error) }
    );
  

    if (this.props.editItem) {
      let clickedItem = this.props.editItem;
      let itemRef = firebase.database().ref('/item/' + clickedItem);

      itemRef.on("value", (snapshot) => {
        this.setState({
          id: this.props.editItem,
          boughtFrom: snapshot.val().boughtFrom,
          collectionId: snapshot.val().collectionId,
          location: snapshot.val().location,
          name: snapshot.val().name,
          notes: snapshot.val().notes,
          imageUrl: snapshot.val().imageUrl,
          price: snapshot.val().price,
          productIds: snapshot.val().productIds,
          purchaseTime: snapshot.val().purchaseTime,
          savedKeywords: snapshot.val().savedKeywords || [],
          sell: snapshot.val().sell
        });
      }, (error) => { console.error(error) });
    }
  }

  componentDidUpdate(){
    if (this.state.keywords.length > 0) {
      console.log('Keywords loaded!')
    } else {
      if (this.state.imageUrl) {
        ImageRecog(this.state.imageUrl, (keywords) => {
          this.setState({ keywords })
        }); 
      }
    };
  }
 
  render() {
    return (
      <div className="container">

        <div className="col-sm-5 col-sm-offset-0">

          <div>
            <ImageUpload 
              setImageState={this.setImageState} 
              setKeywordsState={this.setKeywordsState}
              imageUrl={this.state.imageUrl}
            />
            
            {
            (this.state.keywords.length > 0) ?
            <div>
              <label>Suggested</label>
              <div>
                <ul id="menu">
                  {this.state.keywords.map(keyword =>
                    <button className="btn .btn-link btn-xs" onClick={() => { this.addRemoveKeyword(keyword) }}>{'+ ' + keyword}</button>)}
                </ul>
              </div>
            </div>
            :
            <div></div>
            }

            <div>
              <label>Keywords</label>
              <div>
                <ul id="menu">
                  {this.state.savedKeywords.map(keyword =>
                    <button className="btn .btn-link btn-xs" onClick={() => { this.addRemoveKeyword(keyword) }}>{keyword + '  ̽'}</button>)}
                </ul>

                <input
                  className="form-control"
                  name="customKeyword"
                  component="input"
                  type="text"
                  placeholder="add a keyword"
                  value={this.state.customKeyword}
                  onChange={this.handleChange}
                  required
                />

                <button onClick={() => { this.addRemoveKeyword(this.state.customKeyword) }}>+</button>

              </div>
            </div>

          </div>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">

              <div>
                <label>Title</label>
                <div>
                  <input
                    className="form-control"
                    name="title"
                    component="input"
                    type="text"
                    placeholder="title of book..."
                    value={this.state.title}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>UPC</label>
                <div>
                  <input
                    className="form-control"
                    name="UPC"
                    component="input"
                    type="text"
                    placeholder="UPC of book..."
                    value={this.state.upc}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Online Price</label>
                <div>
                  <input
                    className="form-control"
                    name="subject"
                    component="input"
                    type="text"
                    placeholder="Price of book..."
                    value={this.state.subject}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Subject</label>
                <div>
                  <input
                    className="form-control"
                    name="subject"
                    component="input"
                    type="text"
                    placeholder="subject"
                    value={this.state.subject}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Collection</label>
                <div>
                  <select
                    className="form-control"
                    name="collectionId"
                    component="select"
                    value={this.state.collectionId}
                    onChange={this.handleChange}
                    required
                  >
                  <option></option>
                    {this.state.collectionList.map(collection =>
                      <option value={collection.id}>{collection.name}</option>)}
                  </select>
                </div>
              </div>
              
              {this.state.showDetailed ? 
              (
              <div>
              <div>
                <div>
                  <label>Name</label>
                  <div>
                    <input
                      className="form-control"
                      name="name"
                      component="input"
                      type="text"
                      placeholder="name..."
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label>Location</label>
                  <div>
                    <input
                      className="form-control"
                      name="location"
                      component="input"
                      type="text"
                      placeholder="current location?"
                      value={this.state.location}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <label>Notes</label>
                <div>
                  <input
                    className="form-control"
                    name="notes"
                    component="text"
                    placeholder="notes..."
                    value={this.state.notes}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Price</label>
                <div>
                  <input
                    className="form-control"
                    name="price"
                    component="input"
                    type="text"
                    placeholder="$1.00"
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Bought From</label>
                <div>
                  <input
                    className="form-control"
                    name="boughtFrom"
                    component="input"
                    type="text"
                    placeholder="where did you buy this from?"
                    value={this.state.boughtFrom}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Amazon Link</label>
                <div>
                  <input
                    className="form-control"
                    name="productIds"
                    component="input"
                    type="text"
                    placeholder="https://www.amazon.com/..."
                    value={this.state.productIds}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div>
                <label>Purchase Date</label>
                <div>
                  <input
                    className="form-control"
                    name="purchaseTime"
                    component="input"
                    type="text"
                    placeholder="where did you buy this?"
                    value={this.state.purchaseTime}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div>
                <div>
                  <label>For Sale?</label>
                  <input
                    name="sell"
                    id="sell"
                    component="input"
                    type="checkbox"
                    value={this.state.sell}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              </div>
              ) : (<div></div>)}

              <div>
                <input type="submit" value="Submit" />

                {this.state.showDetailed ? 
                  (<a onClick={() => { 
                    this.setState({ 
                      showDetailed:  !this.state.showDetailed 
                  }) }}>Hide Detailed</a>) :

                  (<a onClick={() => { 
                    this.setState({
                      showDetailed: !this.state.showDetailed 
                  }) }}>Show Detailed</a>)
                }

              </div>
            </div>
          </form>
        </div>

        <div className="col-sm-3 col-sm-offset-0">
          <InProgressCarousel
            setItemState={this.setItemState} 
            currentUserId={this.props.userId}/>
        </div>

      </div>
    )
  }
};

export default AddItems;
