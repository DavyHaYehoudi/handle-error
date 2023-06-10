const ObjectID = require("mongoose").Types.ObjectId;
const UserModel = require("../models/user");
const {RequestError}=require("../middlewares/customError")

exports.createSimpleUser = async (req, res, next) => {
    // Pour les tests simplement, autrement le fichier auth.js est complet
  try {
    await UserModel.create({ ...req.body });
    res.status(201).json({ message: "creation user ok" });
  } catch (err) {
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  const { name } = req.query;
  try {
      if (!ObjectID.isValid(req.params.id)) {
        throw new RequestError("Missing parameter")
      }
    // Pour populate  
    // const oneUser = await UserModel.findOne({ name }).populate("posts");
    const oneUser = await UserModel.findOne({_id:req.params.id})
    res.status(200).json({ message: "Voici l'user", oneUser });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json({ message: "Voici tous les users", allUsers });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  console.log("modif user :", req.body);
  const { name, age, genre, email } = req.body;
  try {
    await UserModel.findOneAndUpdate(
      { name },
      { email },
      { runValidators: true }
    );

    res.status(201).json({ message: "update user ok" });
  } catch (err) {
    next(err);
  }
};
