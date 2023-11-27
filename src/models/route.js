import mongoose from "mongoose";

// creating model schema of Todo data
const todoSchema = new mongoose.Schema({
  todo: String,
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
