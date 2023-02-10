import mongoose from "mongoose";

const HostModelSchema = new mongoose.Schema({
  user: mongoose.Types.ObjectId,
  venues: { type: [mongoose.Schema.Types.ObjectId], ref: "Venue" },
});

const UserModel = mongoose.model("Host", HostModelSchema);

export default UserModel;
