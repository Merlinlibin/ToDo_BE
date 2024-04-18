const editPassRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");

// to create a new user or register a new user
editPassRouter.patch("/", async (req, res) => {
  // get the user details from the request body
  const { email, newPassword,OTP } = req.body;

  //check weather user already registered or not
  const user = await User.findOne({ email });

  // if the user does not exist, return an error
  if (!user) {
    return res.status(401).json({
      message: "user does not exist",
    });
  }


  if (user.randomStr == OTP) {
    // hash the password and store it in the passwordHash variable
    const salt = 10;
    const newpasswordHash = await bcrypt
      .hash(newPassword, salt)
      .then((hash) => hash)
      .catch((err) => console.error(err.message));

    // save the user to the database and store the result in savedUser
    const savedUser = await User.findOneAndUpdate(
      { email: email },
      { passwordHash: newpasswordHash },
      {
        new: true,
      }
    );
    // send the savedUser as response
    res.json(savedUser);
  } else {
    return res.status(403).send("Wrong OTP");
  }
});

// export the user router
module.exports = editPassRouter;
