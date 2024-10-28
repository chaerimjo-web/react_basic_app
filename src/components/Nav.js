import React, { Component } from 'react'

export default class Nav extends Component {
  shouldComponentUpdate(newProps, newState){ //적지 않으면 기본값 true 반환-> 렌더 실행 (변경사항이 없어도 무조건 업데이트)
    //이전 값 -> this.props.data 변경된 값 -> newProps.data
    console.log(newProps.data, this.props.data);
    if(newProps.data === this.props.data){
      return false;
    }else{
      return true;
    }
  }
  render() {
    console.log('Nav render');
    let list = [];
    let data = this.props.data;
    data.forEach((item)=>{
      list.push(<li key={item.id}><a 
        href="/"
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(item.id);
        }}
        >{item.title}</a></li>); 
    })

    /*
    let i = 0;
    while(i<data.length){
      list.push(<li key={data[i].id}><a 
        data-id = {data[i].id-1}
        href=""
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(e.target.dataset.id);
        }}
        >{data[i].title}</a></li>); //키값이 있어야함. 숫자가 들어있는 id
      i++;
    }
      */
    return ( //반복문->코드생성하기
      <nav>
        <ul>
          {list}
        </ul>
      </nav>
    )
  }
}


