import React, { Component } from 'react';
import firebase from 'firebase';
import ImageUploader from 'react-firebase-image-uploader';

//component called in addItems

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      isUploading: false,
      progress: 0,
      imageUrls: ''
    };

    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  }

  handleUploadStart() {
    this.setState( { 
      isUploading: true, 
      progress: 0 
    });
  };

  handleProgress(progress) { this.setState( { progress } ) };

  handleUploadError(error) {
    this.setState( { isUploading: false } );
    console.error(error);
  };

  handleUploadSuccess(filename) {
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false
    });
    // console.log('FILENAME:', filename);
    firebase.storage().ref('images').child(filename)
      .getDownloadURL().then(imageUrls => {
        this.setState({imageUrls}, () => {
          this.props.setImageState(imageUrls)
        })
      }).catch(err => console.log(err));
    console.log('imageUrls:', this.state.imageUrls);

  };

  render() {
    console.log('IMAGEUPLOADER.THIS.STATE:', this.state)
    return (
      <div>
        <form>

          {this.state.imageUrls && 
            <img src={this.state.imageUrls} />}
        
          <div>
            <label>Image</label>
              {this.state.isUploading && 
                <p>Progress: {this.state.progress}</p>}
          </div>
          <ImageUploader
            name="image"
            storageRef={firebase.storage().ref('images')}
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

export default ImageUpload;