const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    username: String,
    password: String,
    token: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserModelSchema);

export default UserModel;
