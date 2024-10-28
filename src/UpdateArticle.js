import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class UpdateArticle extends Component {
  constructor(props) { //수정할 제목을 변수에 담음
    super(props);
    this.state = { //초깃값
      title : this.props.data.title, //부모로부터 받은 타이틀
      desc : this.props.data.desc
    }
  }

  modifyValue = (e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }
//name의 값이 들어오도록

  render() {
    return (
    <section>
      <article>
        <h2>Update Article</h2>
        <Form onSubmit={(e)=>{
          e.preventDefault();
          //사용자가 입력한 내용 
          this.props.onsubmit(
            this.state.title,
            this.state.desc
          );
        }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="title" value={this.state.title} 
            onChange={this.modifyValue}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="desc" rows={3} value={this.state.desc} 
            onChange={this.modifyValue}/>
            {/*
             onChange={()=>{}} 값이 변경되면 할 일
            변경된 값 -> 부모에게 전달
            */}
          </Form.Group>
          <Button type="submit" variant="primary" >submit</Button>
        </Form>
      </article>
    </section> 
    )
  }
}
