import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserModelSchema);

export default UserModel;
