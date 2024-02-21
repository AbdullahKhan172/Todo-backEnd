const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorControllers");
const helmet = require("helmet");
const app = express();

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
var cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  console.log("Hello from the middle ware");
  next();
});

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler);
module.exports = app;
