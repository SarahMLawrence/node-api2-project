const express = require("express");
const posts = require("../data/db");
const cors = require("cors");
const e = require("express");
const { text } = require("express");

const router = express.Router();

//-------------------------------------------------------------------------//
//    GET /api/posts                                                       //
//    Returns an array of all the post objects contained in the database.  //
//-------------------------------------------------------------------------//
router.get("/api/posts", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

//------------------------------------------------------//
//    GET /api/posts/:id                                //
//    Returns the post object with the specified id.    //
//------------------------------------------------------//
router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

//-------------------------------------------------------------//
//    GET /api/posts/:id/comments                              //
//    Returns an array of all the comment objects associated   //
//    with the post with the specified id.                     //
//-------------------------------------------------------------//
router.get("/api/posts/:postID/comments", (req, res) => {
  posts
    .findCommentById(req.params.postID)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

//-------------------------------------------------------------------------//
//    POST /api/posts                                                      //
//    Creates a post using the information sent inside the request body.   //
//-------------------------------------------------------------------------//
router.post("/api/posts", (req, res) => {
  posts
    .insert(req.body)
    .then((post) => {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          error: "Please provide title and contents for the post",
        });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((error) => {
      // just log this error and send back a generic error response,
      // since we're not exactly sure what went wrong
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

module.exports = router;
