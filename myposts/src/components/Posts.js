import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import "./posts.css";

const Posts = ({ post }) => {
  const [posts, setPost] = useState([]);

  //---------------------------//
  //    DELETE  /posts/:id     //
  //---------------------------//
  const deletePost = (e, id) => {
    e.preventDefault();
    console.log("deleting", id);
    Axios()
      .delete(`/posts/${id}`)
      .then((res) => {
        console.log({ res });
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <div className="column">
        <div className="card">
          <h3>
            <b>Title: {post.title}</b>
          </h3>
          <p>Contents: {post.contents}</p>
          <button onClick={(e) => deletePost(e, post.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
