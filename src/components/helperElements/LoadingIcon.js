import React from 'react';
import Loading from 'react-loading-animation'
// this is an icon that displays when a component is loading. It is currently
// used in: 


export default class LoadingIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
    <div>
      <Loading /> 
    </div>
    )
  }
}
