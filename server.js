const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//Connect To MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(success => {
    console.log("DB Connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.use("/api/users", users);
app.use("/api/users", profile);
app.use("/api/users", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});
