import React, { Component } from 'react';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {text: '', list: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.props.onNameChange(event);
  }

  handleSubmit(event) {
    this.props.onNameSubmit(event);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.props.text} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

//export default NameForm;
