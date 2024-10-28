import React, { Component } from 'react'

export default class Myheader extends Component {
  shouldComponentUpdate(){
    return false;
    //바뀌지 않고 비교할것이 없기 때문에 false만 넣어도 가능
  }
  render() {
    console.log('Myheader render');
    return (
      <header>
        <h1 className="logo" onClick={()=>{
          this.props.onChangePage();
        }}>{this.props.title}</h1> 
        <p>{this.props.desc}</p>
      </header>
    )
  }
}


