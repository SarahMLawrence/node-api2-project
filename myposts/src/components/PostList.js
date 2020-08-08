import React, { useState, useEffect } from "react";
import { Axios } from "../utils/Axios";
// import { useHistory, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

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
    <div className="main">
      {posts ? (
        posts.map((post) => {
          return (
            <div className="row">
              <div className="column">
                <div className="content" key={post.id}>
                  <h3 className="card-title">Title: {post.title}</h3>
                  <p className="card-text">
                    Contents: {post.contents}
                    <br></br>
                  </p>
                  {/* <button onClick={(e) => deleteUser(e, user.id)}>
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    history.push(`/update-user/?${user.id}`);
                  }}
                >
                  update
                </button> */}
                  {/* <button> <Link to={`/update-user/${user.id}`} >Edit</Link></button> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>HELLO USERS</h1>
      )}
    </div>
  );
}

export default PostList;
