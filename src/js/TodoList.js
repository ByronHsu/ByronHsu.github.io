import React, { Component } from 'react';
import '../css/TodoList.css';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      itemnum: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteListOnClick = this.handleDeleteListOnClick.bind(this);
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
    return (
      <div className="TodoList">
        <div className="ListHeader">
          <div className="ListName"> 
            <p>{this.props.listContent.listname}</p>
          </div>
          <i className="material-icons DeleteListBtn" onClick={this.handleDeleteListOnClick}>delete</i>
          <input
            type="text"
            placeholder="Add something"
            className="AddItemInput" value={this.state.inputvalue}
            onChange={this.handleChange} onKeyDown={this.handleKeyDown}
          />    
        </div> 
        {this.props.listContent.listitem.map(listitem =>
          <TodoItem
            itemContent={listitem} checkItem={this.handleCheckItem} 
            deleteItem={this.handleDeleteItem}
          />)}
      </div>
    );
  }
}

export default TodoList;
