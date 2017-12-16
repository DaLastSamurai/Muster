import React from 'react'
import Select from 'react-styled-select'

export default class FormDropDown extends React.Component {
  render() {
    const options = this.props.arrayOfObjects;
    return (
      <Select
        options={options}
        classes={{
          selectValue: 'my-custom-value',
          selectArrow: 'my-custom-arrow'
        }}
      />
    )
  }
}