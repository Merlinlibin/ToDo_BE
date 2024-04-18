const todoRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const ToDo = require("../model/todos");

// to create a new todo
todoRouter.post("/create", async (req, res) => {
  try {
    const { todoName, email, todoDescription, todoStatus } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not found.");

    // create a new todo
    const todo = new ToDo({
      todoName,
      user: email,
      todoDescription,
      todoStatus,
    });

    // save the todo to the database
    const savedTodo = await todo.save();

    // send the todo as response
    res.status(201).json(savedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating new Todo.");
  }
});

// to get all the todo
todoRouter.get("/get", async (req, res) => {
  try {
    const todo = await ToDo.find({});
    // send the todo as response
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting Todo.");
  }
});

// to delete todo
todoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await ToDo.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting Todo.");
  }
});

// to edit todo
todoRouter.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { todoStatus } = req.body;
    console.log(todoStatus);
    const response = await ToDo.findByIdAndUpdate(id, {
      todoStatus: todoStatus,
    });
     res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting Todo.");
  }
});

// export the user router
module.exports = todoRouter;
