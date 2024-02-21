const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "You can't add an empty todo"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "A Todo must belong to a user"],
  },
});

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
