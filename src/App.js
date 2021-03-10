import React, { Component } from "react";
import TOC from "./components/TOC";
// import Content from "./components/Content";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "read",
      selected_content_id : 2,
      welcome: { title: "Welcome", desc: "Hello, React!" },
      subject: { title: "WEB", sub: "world wide web!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  render() {
    var _title, _desc, _article = null;

    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
          break;
        }
        i = i + 1;
      }
    } else if (this.state.mode === "create") {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents
        });
        console.log(_title, _desc);
        
      }.bind(this)}></CreateContent>;
    }else if(this.state.mode === 'update'){

      _article = <UpdateContent onSubmit={function(_title, _desc){
        var i = 0;
        while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          this.setState({
            title : _title,
            desc : _desc
          });
          
          // _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
          break;
        }
        i = i + 1;
      }}.bind(this)}></UpdateContent>;}

  
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({
              mode: 'welcome'
            });
          }.bind(this)}
        ></Subject>
        
        <TOC onChangePage={function (id){
          this.setState({
            mode: 'read',
            selected_content_id : Number(id)
          });
        }.bind(this)} data={this.state.contents}></TOC>
        {/* <Content title={_title} desc={_desc}></Content> */}
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}>
        </Control>
        {_article}
      </div>
    );
  }
}

export default App;
