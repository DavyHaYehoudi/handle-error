const PostModel = require("../models/post");

exports.addPost = async (req, res, next) => {
  console.log("data post :", req.body);
  try {
    await PostModel.create({ ...req.body });
    res.status(201).json({ message: "creation post ok" });
  } catch (err) {
    next(err);
  }
};
exports.getOnePost = async (req, res, next) => {
  const { author } = req.query;
  try {
    const onePost = await PostModel.findOne({ author }).populate("author", {
      name: 1,
      genre: 1,
    });
    res.status(200).json({ message: "Voici le post", onePost });
  } catch (err) {
    next(err);
  }
};

