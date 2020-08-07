const express = require("express");
const postRouter = require("./posts/post-router");
const server = express();
const port = 5050;

server.use(express.json());
server.use(postRouter);

server.listen(port, (req,res) => {
  console.log(`Server running at http://localhost:${port}`);
});
