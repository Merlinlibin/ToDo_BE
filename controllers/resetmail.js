const resetmailRouter = require("express").Router();
const nodemailer = require("nodemailer");
const User = require("../model/user");

resetmailRouter.put("/", async (req, res) => {
  // get the user details from the request body
  const { email } = req.body;
  resetURL = "https://glittery-smakager-a5dd53.netlify.app/forgetpassword/";

  //check weather user already registered or not
  const user = await User.findOne({ email });
  const randomStr = Math.floor(Math.random() * 1000000).toString();

  if (!user) {
    return res.status(401).json({
      message: "user does not exist",
    });
  }

  if (user) {
    //const updatedString = await user.update({ randomSrt: randomStr });
    
    const userId = user._id;
    console.log(userId);
     
     const updaeteuUser = await User.findByIdAndUpdate(
       userId,
       { randomStr },
       { new: true }
     );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "merlinlibinmerlin@gmail.com",
        pass: "gtpvydtmshtlkjdi",
      },
    });

    var mailOptions = {
      from: "merlinlibinmerlin@gmail.com",
      to: email,
      subject: "Email to reset the password",
      text: `
            Hi ${email.split("@")[0]},

            There was a request to change your password!

            If you did not make this request then please ignore this email.

            Otherwise, please click this link to change your password: ${resetURL} .
            
            Please use this One Time Password ${randomStr} to change your password.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "Mail sent successfully",
    });
  }
});

module.exports = resetmailRouter;
