import React, { Component } from 'react';
import TodoList from './TodoList';
import '../css/TodoApp.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todolist: [

      ],
      listnum: 0,
      mode: 0,  // 0:all 1:active 2:completed
      numoftodo: 0,
      numofcheck: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleCheckItem = this.handleCheckItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleAllBtnOnClick = this.handleAllBtnOnClick.bind(this);
    this.handleActiveBtnOnClick = this.handleActiveBtnOnClick.bind(this);
    this.handleCompletedBtnOnClick = this.handleCompletedBtnOnClick.bind(this);
    this.handleCleanBtnOnClick = this.handleCleanBtnOnClick.bind(this);
    this.handleEditListName = this.handleEditListName.bind(this);
  }
  handleEditListName(listid,name){
    const todolist = this.state.todolist;
    todolist[listid].listname = name;
    this.setState({
      todolist,
    });
  }
  handleCleanBtnOnClick(){
    const todolist = this.state.todolist;
    let numofcheck = this.state.numofcheck;
    for (let i = 0; i < todolist.length; i += 1) {
      if (typeof todolist[i] == 'undefined') continue;
      else {
        for (let j = 0; j < todolist[i].listitem.length; j += 1) {
          if(typeof todolist[i].listitem[j] == 'undefined') {continue;}
          else{
            if(todolist[i].listitem[j].checked === true){
              numofcheck -= 1;
              delete todolist[i].listitem[j];
            }
          }
        }
      }
    }
    this.setState({
      numofcheck,
    });
    this.setState({
      todolist,
    });

  }
  handleAllBtnOnClick() {
    this.setState({ mode: 0 });
  }
  handleActiveBtnOnClick() {
    this.setState({ mode: 1 });
  }
  handleCompletedBtnOnClick() {
    this.setState({ mode: 2 });
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
    let numoftodo = this.state.numoftodo;
    numoftodo += 1;
    this.setState({
      numoftodo,
    });
  }

  handleCheckItem(listid, itemid, check) {
    const todolist = this.state.todolist;
    let numoftodo = this.state.numoftodo;
    let numofcheck = this.state.numofcheck;
    if(check===true){
      numoftodo -= 1;
      numofcheck += 1;
    }
    else{
      numoftodo += 1;
      numofcheck -= 1;
    }
    todolist[listid].listitem[itemid].checked = check;
    this.setState({
      todolist,
    });

    this.setState({
      numoftodo,
      numofcheck,
    });
  }
  handleDeleteItem(listid, itemid) {
    let numoftodo = this.state.numoftodo;
    let numofcheck = this.state.numofcheck;
    const todolist = this.state.todolist;
    if(todolist[listid].listitem[itemid].checked === true)
      numofcheck -= 1;
    else
      numoftodo -= 1;


    delete todolist[listid].listitem[itemid];
    this.setState({
      todolist,
      numoftodo,
      numofcheck,
    });
  }
  handleDeleteList(listid) {
    let numoftodo = this.state.numoftodo;
    let numofcheck = this.state.numofcheck;
    const todolist = this.state.todolist;
    for (let j = 0; j < todolist[listid].listitem.length; j += 1) {
      if(typeof todolist[listid].listitem[j] == 'undefined') {continue;}
      else{
        if(todolist[listid].listitem[j].checked === true){
          numofcheck -= 1;
        }
        else
          numoftodo -= 1;
      }
    }
    delete todolist[listid];
    this.setState({
      todolist,
      numoftodo,
      numofcheck,
    });
  }
  render() {
    let all;
    let active;
    let completed;
    let appstatus;
    if(this.state.mode === 0){
      all = {
        backgroundColor: '#EE6E73',
        color: '#212121',
        ':hover': {
          backgroundColor: '#EE6E73',
          color: '#212121',
        }
      }
      appstatus = (
        <div className="AppStatus">
          {this.state.numoftodo} item(s) left <br />
          {this.state.numofcheck} item(s) done
        </div>
      );
    }
    if(this.state.mode === 1){
      active = {
        backgroundColor: '#F1888C',
        color: '#212121',
        ':hover': {
          backgroundColor: '#F1888C',
          color: '#212121',
        }
      }
      appstatus = (
        <div className="AppStatus">
          <br/>
          {this.state.numoftodo} item(s) left
        </div>
      );
    }
    if(this.state.mode === 2){
      completed = {
        backgroundColor: '#F4A2A5',
        color: '#212121',
        ':hover': {
          backgroundColor: '#F4A2A5',
          color: '#212121',
        }
      }
      appstatus = (
        <div className="AppStatus">
          <br/>
          {this.state.numofcheck} item(s) done
        </div>
      );
    }
    return (
      <div className="TodoApp">
      <div className="BtnBar"> 
        <a className="waves-effect waves-all btn btns" style={all} onClick={this.handleAllBtnOnClick}>All</a>
        <a className="waves-effect waves-active btn btns" style={active} onClick={this.handleActiveBtnOnClick}>Active</a>
        <a className="waves-effect waves-completed btn btns" style={completed} onClick={this.handleCompletedBtnOnClick}>Completed</a>
        <a className="waves-effect waves-clean btn btns" onClick={this.handleCleanBtnOnClick}>Clean</a>
      </div>
        <div className="InputBar">
          <input
            type="text" placeholder="Add new list"
            className="AddListInput" value={this.state.inputvalue}
            onChange={this.handleChange} onKeyDown={this.handleKeyDown}
          />
          {appstatus}
        </div>
        {this.state.todolist.map(todolist =>
          <TodoList
            addItem={this.handleAddItem} listContent={todolist} checkItem={this.handleCheckItem}
            deleteItem={this.handleDeleteItem} deleteList={this.handleDeleteList} 
            mode={this.state.mode} editListName={this.handleEditListName}
          />)}
      </div>
    );
  }
}


export default TodoApp;
