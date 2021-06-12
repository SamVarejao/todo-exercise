const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("./models/User");
const Item = require("./models/Item");
const bcrypt = require("bcrypt");
const { eventNames } = require("./models/User");
// **************************************************

// ************ Register **********************
router.post("/register", (req, res) => {
  //Checks if the email is already in use, if passwords match and are long enough and then register if conditions check out
  //after encrypting the password
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
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send(["Cannot log in", info]);
    }
    req.login(user, (err) => {
      console.log(req.user.name);
      return res.send("Login successful");
    });
  })(req, res, next);
});
// **************************************************

// ************ Logout **************************
router.get("/logout", (req, res) => {
  req.logout();
  console.log("Logout successful");
  return res.status(200).send();
});
// **************************************************

// **************** Create *************************
router.post("/create", (req, res) => {
  console.log(req.body);

  // Checks for Item conditions before posting it to the database
  function createItem(
    taskName,
    completionNum,
    startDate,
    dueDate,
    prioLevel,
    currStatus
  ) {
    if (
      !taskName ||
      !completionNum ||
      !startDate ||
      !dueDate ||
      !prioLevel ||
      !prioLevel ||
      !req.user._id
    ) {
      return res.status(400).send();
    } else {
      const newItem = new Item({
        task: taskName,
        completion: completionNum,
        start: startDate,
        due: dueDate,
        priority: prioLevel,
        status: currStatus,
        authorID: req.user._id,
      });
      newItem
        .save()
        .then(() => {
          console.log("task created");
          return res.status(201).send("Item Created");
        })
        .catch((errors) => {
          console.error(errors);
          return res.status(400).send();
        });
    }
  }

  let task = req.body.task;
  let completion = req.body.completion;
  let start = req.body.start;
  let due = req.body.due;
  let priority = req.body.priority;
  let status = req.body.status;

  createItem(task, completion, start, due, priority, status);
});
// **************************************************

// *************** Safeguard *************************
router.get("/safeguard", (req, res) => {
  if (req.user != undefined) {
    return res.send({ login: true });
  } else {
    return res.send({ login: false });
  }
});
// **************************************************

// *****************Get Items**************************
router.get("/retrieve", (req, res) => {
  Item.find({ authorID: req.user._id })
    .then((items) => {
      return res.status(200).send(items);
    })
    .catch((error) => {
      console.log(error);
    });
});
// **************************************************

// ***************** Delete Items ***************************
router.delete("/delete/:id", (req, res) => {
  Item.findOneAndDelete({ _id: req.params.id, authorID: req.user._id }).exec();
  console.log("Item deleted");
  return res.status(200).send();
});
// **************************************************

// **************************************************
router.post("/edit", (req, res) => {
  function updateItem(
    completionNum,
    startDate,
    dueDate,
    prioLevel,
    currStatus,
    id
  ) {
    Item.findOne({ _id: id })
      .then((item) => {
        let query = item;
        if (completionNum != null) {
          query.completion = completionNum;
        }
        if (currStatus != null) {
          query.status = currStatus;
        }
        if (startDate != "") {
          query.start = startDate;
        }
        if (dueDate != "") {
          query.due = dueDate;
        }
        if (prioLevel != null) {
          query.priority = prioLevel;
        }
        return query;
      })
      .then((query) => {
        //console.log(query);
        Item.findOneAndUpdate(
          { _id: query._id },
          {
            $set: {
              completion: query.completion,
              status: query.status,
              start: query.start,
              due: query.due,
              priority: query.priority,
            },
          },
          { new: true }
        ).exec();
      })
      .then(() => {
        return res.status(200).send();
      });
  }

  let completion = req.body.completion;
  let start = req.body.start;
  let due = req.body.due;
  let priority = req.body.priority;
  let status = req.body.status;
  let id = req.body.id;
console.log(req.body.due);

  updateItem(completion, start, due, priority, status, id);
});
// **************************************************
module.exports = router;
