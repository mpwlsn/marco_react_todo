import React, { Component } from 'react';
import logo from './logo.svg';
import './ToDo.css';
import {Jumbotron} from 'react-bootstrap';
import {Grid} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';

class NameForm extends React.Component {
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

class List extends React.Component{
  constructor(props){
    super(props);
    //this.state = {list: [{text:"test", id:0}, {text:"test1", id:1}, {text:"test2", id:2}], count: 0};
    this.state = {text: '', list: [], count: 0};
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  onInputSubmit(event){
    event.preventDefault();
    var item = {text: this.state.text, id: this.state.count};
    this.setState({text: '', list: this.state.list.concat([item]), count: this.state.count+1}); //1. resets the text to blank on submitting. 2. adds the new item to the list array via "concat"
  }
  
  onInputChange(event){
    this.setState({text: event.target.value});
    //React makes you use "onChange" to save form input to the state. You can't access the event data after onSubmit for some reason. Therefore, we use onChange to save the input to the state and later push that state data to our list array when onSubmit happens.
  }

  deleteItem(id){
    // var index = this.props.items.map(item => item.id).indexOf(id);
    // this.props.items.splice(index, 1); //this doesn't seem to work because props is a copy of items?? Not referencing original array.
    console.log("This ID: " + id);
    var index = this.state.list.map(item => item.id).indexOf(id);
    console.log("This index: " + index);
    this.state.list.splice(index, 1); //Works! splice returns a new array with the just the deleted items, so instead of displaying the returned array from splice, I tried splicing the original array itself and used setState to trigger the updated list to appear in the UI
    this.setState({list: this.state.list});
  }
  
  // incrementCount(){
  //   this.setState({count: this.state.count + 1});
  //   console.log(this.state.count);
  // }
  
  render(){
    return(
      //<ul> {this.props.items.map(item => (<li>{item}</li>))}</ul>
      //<ul> {this.props.items.map(item => (<ListItem text={item.text} id={item.id} key={item.id} handleDelete={this.deleteItem}/>))} </ul> //handleDelete is called in <ListItem> by onClick. handleDelete = deleteItem, so onClick is calling deleteItem
      <div>
        <NameForm text={this.state.text} onNameChange={this.onInputChange} onNameSubmit={this.onInputSubmit}/>
        <ListGroup> {this.state.list.map(item => (<ListItem text={item.text} id={item.id} key={item.id} handleDelete={this.deleteItem} /> ))} </ListGroup>
      </div>
    );
  }
}

class ListItem extends React.Component{
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

class ToDo extends React.Component{
  constructor(props){
    super(props);
    this.state = {todos: [<Col xs={6} md={4}> <List /> </Col>, <Col xs={6} md={4}> <List /> </Col>]};

    this.addList = this.addList.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
    // this.onInputSubmit = this.onInputSubmit.bind(this);
  }
  
  // onInputSubmit(event){
  //   event.preventDefault();
  //   var item = {text: this.state.text, id: this.state.count};
  //   this.setState({text: '', list: this.state.list.concat([item]), count: this.state.count+1}); //1. resets the text to blank on submitting. 2. adds the new item to the list array via "concat"
  // }
  
  // onInputChange(event){
  //   this.setState({text: event.target.value});
  //   //React makes you use "onChange" to save form input to the state. You can't access the event data after onSubmit for some reason. Therefore, we use onChange to save the input to the state and later push that state data to our list array when onSubmit happens.
  // }
  addList(){
    console.log("Works");
    //this.setState({todos: []});
    this.setState({todos: this.state.todos.concat([<Col xs={6} md={4}> <List /> </Col>])});
  }
  
  render(){
    return(
      <div>
        <Jumbotron> <h1>ToDo App </h1></Jumbotron>
        <button onClick = {this.addList}> Add New List </button>
        <Grid>
          <Row>
            {this.state.todos.map(list => (list) ) }
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ToDo;
