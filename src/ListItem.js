//Copied the Listitem class from ToDo.js into this file. Still needs some imports
import React, { Component } from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class ListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {text: this.props.text, id: this.props.id};
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(){
    console.log("Deleted: " + this.state.id);
    this.props.handleDelete(this.state.id);
  }


  render(){
    return(<ListGroupItem>{this.props.text} <button onClick={this.handleClick}> Delete </button> Id: {this.state.id}</ListGroupItem>);
  }
}

//export default ListItem;
