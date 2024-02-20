const express = require("express");
const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
var cors = require("cors");
const corsOptions = {
  origin: "",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log("Hello from the middle ware");
  next();
});

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/todos", userRouter);

module.exports = app;
