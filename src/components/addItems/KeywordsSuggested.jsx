import React from 'react';
import * as firebase from 'firebase';

class KeywordsSuggested extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.addRemoveKeyword = this.addRemoveKeyword.bind(this);
    this.addCustomeKeyword = this.addCustomeKeyword.bind(this);
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

          <input
            className="form-control"
            name="customKeyword"
            component="input"
            type="text"
            placeholder=""
            value={this.state.customKeyword}
            onChange={this.handleChange}
            required
          />

          <button
            onClick={() => {
              this.addRemoveKeyword(this.state.customKeyword);
            }}
          >
            Add Keyword
          </button>
        </div>
      </div>
    );
  }
}

export default KeywordsSuggested;
