const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    body: String,
  },{ collation: { locale: "fr", strength: 1 } ,versionKey: false}
);

const PostModel = mongoose.model("post", postSchema);
module.exports = PostModel;
