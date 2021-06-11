const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
// **************************************************

// ***********Express Config**********************
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// **************************************************

// ************** DB Connection*************************
mongoose
  .connect(
    "mongodb+srv://user1:12@cluster0.5cfu9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// **************************************************

// ***************** Session **********************
app.use(
  session({
    secret: "alamut",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passport/strategy")(passport);
// **************************************************

// **************** Routes ***********************
const routes = require("./routes");
app.use("/api", routes);
// **************************************************

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up on port ${port}.`);
});
