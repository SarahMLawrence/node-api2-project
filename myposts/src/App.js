import React, { useEffect, useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { Axios } from "./utils/Axios";
import { Route, Link } from "react-router-dom";


const App = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    Axios()
      .get("/posts")
      .then((res) => setPostList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <nav>
        <h1 className="app-header">Sarah's Posts</h1>
        <div className="nav-link">
          <Link exact to="/">
            Home
          </Link>
          <Link to="/post-list">Post List</Link>
          <Link to="/add-post">Add Post</Link>
        </div>
      </nav>

      <Route exact path="/" />
      <Route
        exact
        path="/post-list"
        render={(props) => <PostList {...props} postList={postList} />}
      />
      <Route exact path="/add-post" component={AddPostForm} />
      {/* <Route exact path="/update-user/:id" component={UserUpdate}/> */}
    </div>
  );
};

export default App;
