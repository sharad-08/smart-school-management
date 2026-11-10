import mongoose from "mongoose";

let connection;

export default function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!uri) throw new Error("MONGODB_URI is required");

  connection ??= mongoose.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  }).catch((error) => {
    connection = undefined;
    throw error;
  });

  return connection;
}
