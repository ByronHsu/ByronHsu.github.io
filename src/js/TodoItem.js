import React, { Component } from 'react';
import '../css/TodoItem.css';
import '../css/materialize.min.css';

class TodoItem extends Component {
  constructor() {
    super();
    this.handleCheckOnClick = this.handleCheckOnClick.bind(this);
    this.handleDeleteItemOnClick = this.handleDeleteItemOnClick.bind(this);
  }
  handleCheckOnClick(){
    this.props.checkItem(this.props.itemContent.itemid, !this.props.itemContent.checked);
  }
  handleDeleteItemOnClick(){
    this.props.deleteItem(this.props.itemContent.itemid);
  }
  render() {
    const styles1 = {
      display: 'flex',
      textDecoration: 'line-through',
      alignItems: 'center',
      width: '90%',
      height: '100%',
      fontSize: '100%',
    };
    const styles2 = {
      display: 'flex',
      alignItems: 'center',
      color: 'black',
      width: '90%',
      height: '100%',
      fontSize: '100%',
    };
    let styles;
    if (this.props.itemContent.checked == true){ styles = styles1;}
    else {
      styles = styles2;
    }
    return (
      <div className="TodoItem">
        <input type="checkbox" checked={this.props.itemContent.checked}  />
        <label style={styles} className="CheckBtn" onClick={this.handleCheckOnClick} >{this.props.itemContent.itemname}</label>
        <i className="material-icons DeleteItemBtn" onClick={this.handleDeleteItemOnClick}>delete</i>
      </div>
    );
  }
}

export default TodoItem;
