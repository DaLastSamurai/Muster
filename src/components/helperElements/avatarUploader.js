import React, { Component } from 'react';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';
import ImageRecog from './imageRecog';

//component called in addItems

class AvatarUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      isUploading: false,
      progress: 0,
      imageURL: '',
      keywords: []
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  };

  handleUploadStart() {
    this.setState({
      isUploading: true,
      progress: 0
    });
  };

  handleProgress(progress) {
    this.setState({ progress })
  };

  handleUploadError(error) {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess(filename) {
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false
    });
    firebase.storage().ref('avatars').child(filename)
      .getDownloadURL()
      .then(imageURL => {
        this.setState({ imageURL }, () => {
          this.props.setImageState(imageURL)
        })
        // ImageRecog(imageURL, (keywords) => {
        //   this.setState({ keywords }, () => {
        //     this.props.setKeywordsState(keywords)
        //   })
        // })
      })
  };

  render() {
    return (
      <div >
        <form>
          <label>Change Avatar</label>
          {this.props.images ?
            this.props.images.map(image => {
              return <img src={image} style={{ width: 300 }} />
            })
            : null
          }
          {/* {this.props.images.map(image => {
          return <img src={image} style={{width: 300}} />})} */}

          {/* {this.props.imageUrl &&
            <img src={this.props.imageUrl}
              style={{ width: 300 }} />} */}

          <div>
            {/* <label>Change Profile Photo</label> */}
            {this.state.isUploading &&
              <p>Progress: {this.state.progress}</p>}
          </div>
          <ImageUploader
            name="image"
            storageRef={firebase.storage().ref('avatars')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />

        </form>
      </div>
    );
  };
};

export default AvatarUpload;