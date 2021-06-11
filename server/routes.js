const express = require("express");
const router = express.Router();
const User = require("./models/User");
const bcrypt = require("bcrypt");
// **************************************************

// ************ Register **********************
router.post("/register", (req, res) => {
  //Checks if the email is already in use, if passwords match and are long enough and then register if conditions check out
  function checkUser(userName, userEmail, userPassword, userPassword2) {
    let errorMsg = [];
    console.log(req.body);

    if (!userName || !userEmail || !userPassword || !userPassword2) {
      errorMsg.push("Enter all fields ");
    }
    if (userPassword != userPassword2) {
      errorMsg.push("Passwords must match ");
    }
    if (userPassword.length <= 6) {
      errorMsg.push("Password must be longer ");
    }
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(userEmail) == false) {
      errorMsg.push("Invalid email address");
    }
    if (errorMsg.length > 0) {
      console.log(errorMsg);
      return res.status(400).send(errorMsg);
    } else {
      User.findOne({ email: userEmail })
        .then((user) => {
          if (user) {
            errorMsg.push("This e-mail already exists ");
            console.log(errorMsg);
            return res.status(400).send(errorMsg);
          } else {
            const newUser = new User({
              name: userName,
              email: userEmail,
              password: userPassword,
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  throw err;
                }
                newUser.password = hash;
                newUser
                  .save()
                  .then(() => console.log("Register successful"))
                  .catch((errors) => {
                    console.error(errors);
                  });
              });
            });
          }
        })
        .catch((errors) => {
          console.log(errors);
          return res.status(400).send();
        });
    }
  }

  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  checkUser(name, email, password, password2);
});
// **************************************************

// *************** Login ***********************
router.post("/login", (req, res, next) => {
  console.log(req.body);
  return res.status(202).send("Login successful");
});
// **************************************************
module.exports = router;
