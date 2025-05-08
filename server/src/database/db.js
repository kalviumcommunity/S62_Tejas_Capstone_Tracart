import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDB;
