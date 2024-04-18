const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const editPassRouter = require("./controllers/editPass");
const resetmailRouter = require("./controllers/resetmail");
const todoRouter = require("./controllers/todo");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/passwordReset", editPassRouter);
app.use("/api/mailReset", resetmailRouter);
app.use("/api/todo", todoRouter);

module.exports = app;
