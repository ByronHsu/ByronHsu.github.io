import React, { Component } from 'react';
import TodoList from './TodoList';
import '../css/TodoApp.css';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todolist: [

      ],
      listnum: 0,
      inputvalue: ' ',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
  }
  handleChange(e) {
    this.setState({ inputvalue: e.target.value });
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        const todolist = this.state.todolist;
        const newlist = {
          listname: this.state.inputvalue,
          listitem: [],
          listid: this.state.listnum,
        };
        todolist.push(newlist);
        this.state.listnum += 1;
        this.setState({
          todolist,
        });
        this.setState({ inputvalue: '' });
        break;
    }
  }
  handleAddItem(id, name, iid) {
    const newitem = {
      itemname: name,
      checked: false,
      itemid: iid,
    };
    const todolist = this.state.todolist;
    todolist[id].listitem.push(newitem);
    this.setState({
      todolist,
    });
  }

  handleCheckItem(listid, itemid, check) {
    const todolist = this.state.todolist;
    todolist[listid].listitem[itemid].checked = check;
    this.setState({
      todolist,
    });
  }
  handleDeleteItem(listid, itemid) {
    const todolist = this.state.todolist;
    delete todolist[listid].listitem[itemid];
    this.setState({
      todolist,
    });
  }
  handleDeleteList(listid) {
    const todolist = this.state.todolist;
    delete todolist[listid];
    this.setState({
      todolist,
    });
  }
  render() {
    return (
      <div className="TodoApp">
        <input
          className="AddListInput" value={this.state.inputvalue}
          onChange={this.handleChange} onKeyDown={this.handleKeyDown}
        />
        {this.state.todolist.map(todolist =>
          <TodoList
            addItem={this.handleAddItem} listContent={todolist} checkItem={this.handleCheckItem}
            deleteItem={this.handleDeleteItem} deleteList={this.handleDeleteList}
          />)}
      </div>
    );
  }
}


export default TodoApp;
