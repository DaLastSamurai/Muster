import React, { Component } from 'react';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';

//component called in none

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image: '',
      isUploading: false,
      progress: 0,
      imageURL: ''
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleUploadStart = this.handleUploadStart.bind(this)
    this.handleProgress = this.handleProgress.bind(this)
    this.handleUploadError = this.handleUploadError.bind(this)
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  };

  handleUploadStart() {
    this.setState({ isUploading: true, progress: 0 });
  }

  handleProgress(progress) { this.setState({ progress }) };

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

    firebase.storage().ref('images').child(filename)
      .getDownloadURL.then(url =>
        this.setState({ imageURL: url }));
  };

  render() {
    return (
      <div>
        <form>

          <label>Preview</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.imageURL && <img src={this.state.imageURL} />}
          <ImageUploader
            name="image"
            storageRef={firebase.storage().ref('images/')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />

        </form>
      </div>
    );
  }
}

export default ImageUpload;