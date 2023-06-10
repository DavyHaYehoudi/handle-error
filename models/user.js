const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    // Pour les contraintes (enum,match,max,min,maxLength,minLength) , personnaliser message d'erreur. 
    age: { type: Number, max: [20, "age maximum 20 ans"] },

    // Typage, required et unique sont gérés par la validation mongoose
    sexe: { type: String, required: true },
    email: { type: String, unique: true },
    name: { type: String, },
    
    // Pour les jonction de collections avec populate()
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  },
  { collation: { locale: "fr", strength: 1 }, versionKey: false }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
