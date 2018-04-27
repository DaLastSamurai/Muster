import React from 'react';
import * as firebase from 'firebase';

import ImageUpload from '../helperElements/imageUploader';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //Handles dynamically adding and removing keywords from suggested to saved
  addRemoveKeyword(keyword) {
    let savedKeywords = this.state.savedKeywords;
    if (savedKeywords.includes(keyword)) {
      let index = savedKeywords.indexOf(keyword);
      if (index >= 0) {
        savedKeywords.splice(index, 1);
      }
    } else {
      savedKeywords = savedKeywords.concat(keyword);
    }
    this.setState({ savedKeywords });
    this.setState({ customKeyword: '' });
  }

  addCustomeKeyword(keyword) {
    this.addRemoveKeyword(keyword);
  }

  render() {
    return (
      <div>
        <label>Keywords</label>
        <div>
          <div className="additems-keywords">
            <ul id="menu">
              {this.state.savedKeywords.map(keyword => (
                <button
                  className="additems-keyword-add"
                  onClick={() => {
                    this.addRemoveKeyword(keyword);
                  }}
                >
                  {keyword + '  ̽'}
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default KeywordsSaved;
