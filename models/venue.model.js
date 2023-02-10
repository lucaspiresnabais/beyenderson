import mongoose from "mongoose";

const VenueModelSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    datetime: Date,
    address: String,
    postalCode: String,
    country: String,
    isPublic: Boolean,
    showWhoIsComing: Boolean,
    hosts: { type: [mongoose.Schema.Types.ObjectId], ref: "Host" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Venue", VenueModelSchema);

export default UserModel;
