import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {author, title, notes} = this.props.bookInfo;
    return (
      <div class="main">
        <ul id="bk-list" class="bk-list clearfix">
          <li>
            <div class="bk-book book-1 bk-bookdefault">
              <div class="bk-front">
                <div class="bk-cover-back"/>
                <div class="bk-cover">
                  <h2>
                    <span>{author}</span>
                    <span>{title}</span>
                  </h2>
                </div>
              </div>
              <div class="bk-page">
                <div class="bk-content bk-content-current">
                  <p>page one</p>
                </div>
                <div class="bk-content">
                  <p>page two</p>
                </div>
                <div class="bk-content">
                  <p>page three</p>
                </div>
              </div>
              <div class="bk-back">
                <p>{notes}</p>
              </div>
              <div class="bk-right"/>
              <div class="bk-left">
                <h2>
                  <span>{author}</span>
                  <span>{title}</span>
                </h2>
              </div>
              <div class="bk-top"/>
              <div class="bk-bottom"/>
            </div>
            <div class="bk-info">
              {/* <button class="bk-bookback">Flip</button>
              <button class="bk-bookview">View inside</button> */}
              <h3>
                <span>{author}</span>
                <span>{title}</span>
              </h3>
              <p>{notes}</p>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Book;
