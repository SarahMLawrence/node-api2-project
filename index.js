const express = require("express");
const helmet = require("helmet")
const postRouter = require("./posts/post-router");
const server = express();
const cors = require("cors");
const port = process.env.port || 5050;

server.use(express.json());
server.use(cors());
server.use(helmet);
server.use(postRouter);


server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, (req, res) => {
  console.log(`Server running at http://localhost:${port}`);
});
