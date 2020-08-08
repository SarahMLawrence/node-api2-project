import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
import Posts from "./Posts";

function PostList() {
  const [posts, setPost] = useState([]);

  //--------------------------//
  //      GET  /posts         //
  //--------------------------//
  useEffect(() => {
    Axios()
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPost(res.data);
      });
  }, []);

  return (
    <div className="container">
        
      <h1> List Of Posts </h1>
      {posts.map((post) => (
        <Posts post={post} key={post.id} />
      ))}
  
    </div>
  );
}

export default PostList;
