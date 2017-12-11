import React from 'react';
import Slider from 'react-slick';

class InProgressEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inProgress: [{ id: '210932fwjf0ds9', name: 'sample' }, 
                  { id: '210932fwjf0da9', name: 'sample2' }]
    };
  };

  componentDidMount(){};
    
  render() {
    return (
      <div>
      {/* {
        this.state.inProgress.map(item =>
          <div value={item.id}>{item.name}</div>)
      } */}
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
        <div><img src='https://firebasestorage.googleapis.com/v0/b/muster-94d83.appspot.com/o/images%2F48620956-5174-40e8-8ca5-1f8559b775e2.jpeg?alt=media&token=c1b7dff5-918d-43a2-b894-cfec3cb305a3' /></div>
      </div>
    )
  };
};

export default InProgressEntry;
