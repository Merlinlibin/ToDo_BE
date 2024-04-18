const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");




// to create a new user or register a new user
usersRouter.post("/", async (req, res) => {
  // get the user details from the request body
  const { username, email,phone, password } = req.body;

  //check weather user already registered or not
  const Uemail = await User.findOne({ email });
  if (!Uemail) {
    // hash the password and store it in the passwordHash variable
    const salt = 10;
    const passwordHash = await bcrypt
      .hash(password, salt)
      .then((hash) => hash)
      .catch((err) => console.error(err.message));

    // create a new user object from the User model
    const user = new User({
      username,
      email,
      phone,
      passwordHash,
    });

    // save the user to the database and store the result in savedUser
    const savedUser = await user.save();

    // send the savedUser as response
    res.json(savedUser);
  } else {
     return res.status(409).json({
      message: "user already exist",
    });
  }
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find(); 
    res.send(users);
  } catch (error) {
    console.log(error);
  }                      
    })


// export the user router
module.exports = usersRouter;
