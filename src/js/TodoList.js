import React, { Component } from 'react';
import '../css/TodoList.css';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemnum: 0,
      editmode: 0,
      editinputvalue: this.props.listContent.listname,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteListOnClick = this.handleDeleteListOnClick.bind(this);
    this.handleEditListOnClick = this.handleEditListOnClick.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditKeyDown = this.handleEditKeyDown.bind(this);
  }
  handleEditChange(e) {
    this.setState({ editinputvalue: e.target.value });
  }
  handleEditKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        this.props.editListName(this.props.listContent.listid,this.state.editinputvalue);
        this.setState({ editmode: 0 });
        break;
    }
  }
  handleChange(e) {
    this.setState({ inputvalue: e.target.value });
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        this.props.addItem(this.props.listContent.listid,this.state.inputvalue,this.state.itemnum);
        this.state.itemnum += 1;
        this.setState({ inputvalue: '' });
        break;
    }
  }
  handleEditListOnClick(){
    this.setState({ editmode: 1 });
  }
  handleCheckItem(itemid, check) {
    this.props.checkItem(this.props.listContent.listid, itemid, check);
  }
  handleDeleteItem(itemid) {
    this.props.deleteItem(this.props.listContent.listid, itemid);
  }
  handleDeleteListOnClick(){
    this.props.deleteList(this.props.listContent.listid);
  }
  render() {
    //console.log({this.props.listContent.listname});
    let d;
    let editfield;
    if(this.state.editmode === 0 ){
      editfield = (
        <p>{this.props.listContent.listname}</p>
      );
    }
    else{
      editfield = (
        <input
          type="text"
          className="EditListInput" value={this.state.editinputvalue}
          onChange={this.handleEditChange} onKeyDown={this.handleEditKeyDown}
          autoFocus
        />  
      );
    }
    if (this.props.mode === 0) { d = { backgroundColor: 'rgba(244, 67, 54, 0.7)' }; }
    if (this.props.mode === 1) { d = { backgroundColor: 'rgba(255, 235, 59, 0.7)' }; }
    if (this.props.mode === 2) { d = { backgroundColor: '#7FEFBD' }; }
    return (
      <div className="TodoList">
        <div className="ListHeader">
          <div className="ListName"> 
            {editfield}
            <a className="btn-floating waves-effect waves-light grey EditListBtn" onClick={this.handleEditListOnClick}><i className="material-icons EditIcon">edit</i></a>
          </div>
          <i className="material-icons DeleteListBtn" onClick={this.handleDeleteListOnClick}>delete</i>
          <input
            type="text"
            placeholder="Add something"
            className="AddItemInput" value={this.state.inputvalue}
            onChange={this.handleChange} onKeyDown={this.handleKeyDown}
          />    
        </div> 
        <div className="ListContent">
        {this.props.listContent.listitem.map(listitem =>
          <TodoItem
            itemContent={listitem} checkItem={this.handleCheckItem} 
            deleteItem={this.handleDeleteItem} mode={this.props.mode}
          />)}
        </div>
      </div>
    );
  }
}

export default TodoList;
