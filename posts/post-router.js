const express = require("express");
const posts = require("../data/db");
const e = require("express");
const db = require("../data/db");

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

//----------------------------------------------------------------------------//
//    POST /api/posts/:id/comments                                            //
//    Creates a comment for the post with the specified id using information  //
//    sent inside of the request body.                                        //
//----------------------------------------------------------------------------//
router.post("/api/posts/:id/comments", (req, res) => {
  const { id: post_id } = req.params;
  const { body: comment } = req;
  posts
    .findById(post_id)
    .then((data) => {
      if (data.length !== 0) {
        if (!comment.text) {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
        } else {
          db.insertComment({ ...comment, post_id })
            .then(({ id: comment_id }) => {
              db.findCommentById(comment_id).then((newComment) => {
                res.status(201).json(newComment);
              });
            })
            .catch((data) => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database",
              });
            });
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((data) => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

//----------------------------------------------------------------------------------//
//    DELETE /api/posts/:id                                                         //
//    Removes the post with the specified id and returns the deleted post object.   //
//    You may need to make additional calls to the database in order to satisfy     //
//    this requirement.                                                             //
//----------------------------------------------------------------------------------//
router.delete("/api/posts/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been deleted",
        });
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the user",
      });
    });
});

//--------------------------------------------------------------------//
//    PUT /api/posts/:id                                              //
//    Updates the post with the specified id using data from the      //
//    request body. Returns the modified document, NOT the original.  //
//--------------------------------------------------------------------//
router.put("/api/posts/:id", (req, res) => {
  if (req.body.title === "" || req.body.contents === "") {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    posts
      .update(req.params.id, req.body)
      .then((post) => {
        if (post === 0) {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(post);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "The post information could not be modified.",
        });
      });
  }
});

module.exports = router;
