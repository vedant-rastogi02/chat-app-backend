const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");

const UserRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");

const socketIo = require("./socket.js");
const messageRouter = require("./routes/messageRoutes.js");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//middlewares
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Mongodb connected failed", err));

socketIo(io);
//our routes
app.use("/api/users", UserRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log("server is up and running "));
