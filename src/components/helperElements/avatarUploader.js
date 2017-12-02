import React, { Component } from 'react';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';

//component called in addItems

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
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
      avatar: filename,
      progress: 100,
      isUploading: false
    });

    firebase.storage().ref('images').child(filename)
      .getDownloadURL.then(url =>
        this.setState({ avatarURL: url }));
  };

  render() {
    return (
      <div>
        <form>

          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />

          <label>Avatar</label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.avatarURL &&
            <img src={this.state.avatarURL} />
          }
          <ImageUploader
            name="avatar"
            storageRef={firebase.storage().ref('avatars/')}
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