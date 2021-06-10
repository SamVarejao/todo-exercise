const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors= require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server up on port ${port}.`);
});
