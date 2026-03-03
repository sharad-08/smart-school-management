import mongoose from "mongoose";

const uploadphotosSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String, // Cloudinary image URL
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("EventPhoto", uploadphotosSchema);