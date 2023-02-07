import mongoose from "mongoose";
export const connectToDb = () => {
  mongoose.set("strictQuery", true);
  try {
    mongoose.connect(process.env.MONGO_URL);
  } catch (e) {
    console.log(e);
  }
};
