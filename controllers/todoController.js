const Todos = require("../models/todoModel");
const catchAsync = require("../util/catchAsync");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todos.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.newTodo = catchAsync(async (req, res, next) => {
  const newTodo = await Todos.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      todo: newTodo,
    },
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  res.status(200).json({
    status: "succes",
    data: {
      todo: updatedTodo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  await Todos.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "succes",
    data: null,
  });
});
