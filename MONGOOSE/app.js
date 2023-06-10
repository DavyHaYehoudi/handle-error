const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const { addPost, getOnePost } = require("./controllers/post");
const { getOneUser, getUsers, updateUser, createSimpleUser } = require("./controllers/user");

app.use(cors());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// application/json
app.use(express.json());
// app.get("*", (req, res) => res.status(501).send("Tu fais quoi ici ?!"));

mongoose
  .connect(
    `mongodb+srv://docMongo:pfWhIppGKZNo2cnx@clustermongodoc.omqse8b.mongodb.net/docMongoDB`,
    { autoIndex: true }
  )
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log("erreur à MongoDB :", err));

// USERS
app.post("/user", createSimpleUser);
app.get("/user/:id", getOneUser);
app.get("/users", getUsers);
app.put("/user", updateUser);

// POSTS
app.post("/post", addPost);
app.get("/post", getOnePost);

// ERRORS
app.use(errorHandler);
app.listen(5958, () => console.log("serveur ok"));
// Pwd : pfWhIppGKZNo2cnx username :docMongo
