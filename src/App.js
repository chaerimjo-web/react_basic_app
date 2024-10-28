import logo from './logo.svg';
import './App.css';
import Myheader from './components/Myheader';
import Nav from './components/Nav';
import Article from './components/Article';
import CreateArticle from './createArticle';
import UpdateArticle from './UpdateArticle';
import React, { Component} from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component { 
  constructor(props) { //app -> state -> title,desc가 있음 App이 this가 된다.
    super(props);
    this.max_menu_id = 3; //메뉴리스트를 추가할 때 menus에 
    this.state = {
      mode:'welcome', //열자마자 웰컴모드로
      selected_id : 0, //1.초깃값 설정

      subject:{ title : 'React', desc : 'Single page Application'},
      welcome:{title : 'Welcome', desc:'Welcom to React'},
      menus:[ //배열 3개 생성하기 LIST / 배열을 nav에 전달
        {id:1, title:'HTML', desc:'Hypertext Markup Language'},
        {id:2, title:'CSS', desc:'CSS for design'},
        {id:3, title:'Javascript', desc:'Javascript for interaction'}
      ]
    };
  }

  getReadArticle(){
    const idx = this.state.menus.findIndex(item=> item.id == this.state.selected_id); //인덱스구하기
    let data = this.state.menus[idx]; //id 
    return data;
  }

  // 렌더되기 전에 함수 만들기
  getArticles(){
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){ //.
      let _data = this.state.welcome;
      _article = <Article data={_data} desc={_desc} mode={this.state.mode}></Article>;
    }else if(this.state.mode === 'read'){ //0번째안에 타이틀이 출력되도록
      
      let _data = this.getReadArticle();

      _article = <Article data={_data} onChangePage={(_mode)=>{ //함수를 넘김
        this.setState({
          mode:_mode
        })
      }}></Article>; 
    }else if(this.state.mode === 'create'){
      _article = <CreateArticle onsubmit={(_title, _desc)=>{
        //this.max_menu_id = this.max_menu_id + 1; 
        this.max_menu_id += 1; //메뉴리스트를 추가할 때 menus에 1을 더한다. 
        //this.state.menus.push(
          //{id:this.max_menu_id, title:_title, desc:_desc}
        //) //형식대로 추가한다.

        //let _menus = this.state.menus.concat({id:this.max_menu_id, title:_title, desc:_desc});
        let _menus =[...this.state.menus, {id:this.max_menu_id, title:_title, desc:_desc}];

        this.setState({ //추가된값을 setstate를 넣어 업데이트를 해줘야함 
          menus:_menus //기존 메뉴 업데이트
        })
        //console.log(_title, _desc);
      }}></CreateArticle>;
    }else if(this.state.mode === 'modify'){

      let _data = this.getReadArticle(); //제목과 설명을 _data라는 객체로 생성

      _article = <UpdateArticle data={_data} onsubmit={(_title, _desc)=>{
        let _menus = [...this.state.menus];
        const idx = this.state.menus.findIndex(item=> item.id == this.state.selected_id);
        _menus[idx] = {id:this.state.selected_id, title:_title, desc:_desc} //값 새로수정
        this.setState({
          menus:_menus, //새로운 메뉴로 변경
          mode: 'read'
        })
      }}>
      </UpdateArticle>;
      //기존의 값 나오게 하기 
    }else if(this.state.mode === 'delete'){
      if(window.confirm('정말 삭제할까요?')){
        let _menus = [...this.state.menus];
      let id = this.state.menus.findIndex(item=> item.id == this.state.selected_id);
      //지우고자하는 인덱스 번호
      _menus.splice(id, 1)

      this.setState({
        menus:_menus,
        mode:'welcome',
        selected_id:0
      })
      alert('삭제했습니다.')
      }else{
        alert('취소했습니다.');
        this.setState({
          mode:'welcome',
          selected_id:0
        })
      }
      
      /* 
      기본 메뉴를 복사 해서 복사본 _menus를 생성하고
      삭제하고자하는 번호째 값을 제거
      제거된 메뉴를 menus에 다시 할당, 
      selected_id는 0으로 변경
      mode는 welcome으로 변경
      */
    }
    return _article;
  }





  render() {
    console.log('APP render');
    
    return (
    <div className="App">
      <Myheader 
        title={this.state.subject.title} 
        desc={this.state.subject.desc}
        onChangePage={()=>{ //속성에 함수 담기
          this.setState({ //함수전달하기 //Myheader에 속성의 텍스트 함수를 담아서 전달/onChangePage->Myheader전달
            mode:'welcome'
          })
        }} 
        ></Myheader>
      <Nav
        data={this.state.menus} //데이터를 넘기고
        onChangePage={(id)=>{ //함수를 넘김
          this.setState({
            mode:'read',
            selected_id:id
          })
        }}
        ></Nav>
      {this.getArticles()}
      <div className='d-flex justify-content-end'>
        <Button variant="primary"
        onClick={()=>{ //속성에 함수 담기
          this.setState({ //함수전달하기 //Myheader에 속성의 텍스트 함수를 담아서 전달/onChangePage->Myheader전달
            mode:'create'
          })
        }} 
        >Create</Button>
      </div>
    </div>
    )
  }
}
/*
function App() {
  return ( //app에 들어감
    <div className="App">
      <header className="App-header">
        <h1>안녕</h1>
      </header>
    </div>
  );
}
*/
export default App;
