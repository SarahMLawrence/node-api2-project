import React from "react";
import { Axios } from "../utils/Axios";



class AddPostForm extends React.Component {
  state = {
    post: {
      id: "",
      title: "",
      contents: "",
    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    Axios()
      .post("/posts/", this.state)
      .then((res) => {
        console.log(res);
        this.props.history.push("/post-list");
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h1> Add New Post</h1>
        <form action="/post-list" onSubmit={this.handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            autoComplete="off"
          />

          <label>Contents: </label>
          <input
            type="text"
            name="contents"
            onChange={this.handleChange}
            value={this.state.contents}
            autoComplete="off"
          />

          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default AddPostForm;
