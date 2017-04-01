import React, { Component } from 'react';
import '../css/TodoItem.css';

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
    };
    const styles2 = {
      display: 'flex',
      alignItems: 'center',
      width: '90%',
      height: '100%',
    };
    let styles;
    if (this.props.itemContent.checked == true){ styles = styles1;}
    else {
      styles = styles2;
    }
    return (
      <div className="TodoItem">
        <div className="CheckBtn" onClick={this.handleCheckOnClick}/>
        <h5 style={styles}>{this.props.itemContent.itemname}</h5>
        <div className="DeleteItemBtn" onClick={this.handleDeleteItemOnClick}/>
      </div>
    );
  }
}

export default TodoItem;
