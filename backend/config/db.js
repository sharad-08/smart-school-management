 import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected");
    });

    await mongoose.connect(process.env.MONGODB_URL);

  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

export default connectDB;