const bodyParser = require("body-parser");
const express = require("express");
const jwtLib = require("jsonwebtoken");
const { authenticateJWT } = require("../middlerware/auth");
const cors = require("cors");
// const mongodb = require("mongodb");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.listen(3001, () => {
  console.log("local server on port 3001");
});

const database = [
  {
    name: "om",
    email: "om@g.com",
    password: "123",
  },
  {
    name: "user",
    email: "u@g.com",
    password: "123",
  },
];

app.post("/login", (req, res) => {
  // console.log(req.query);

  const { email } = req.body;
  const user = database.find((user) => user.email === email);

  if (!user) {
    res.status(404).json({ msg: "User not found" });
  }

  if (user.email !== req.body.email || user.password !== req.body.password) {
    res.status(401).send({ msg: "Invalid credentials..." });
  }

  const jwt = jwtLib.sign({ name: user.name }, "secret");

  res.status(200).send({ auth: jwt, user: user });
});

app.get("/dashboard", authenticateJWT, (req, res) => {
  try {
    const name = req.user;
    res.status(200).send({user:name});
  } catch (error) {
    res.status(500).send({ msg: "server errr" });
  }
});
