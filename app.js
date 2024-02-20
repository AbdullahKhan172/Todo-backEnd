const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRouter");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middle ware");
  next();
});

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/todos", userRouter);

module.exports = app;
