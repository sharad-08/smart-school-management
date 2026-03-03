

import { v2 as cloudinary } from "cloudinary";
import EventPhoto from "../models/uploadphotos.js";
import fs from "fs";

export const uploadEventPhotos = async (req, res) => {
  try {
    const { eventType } = req.body;

    if (!eventType)
      return res.status(400).json({ message: "Event type is required" });

    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files received" });

    let imageUrls = [];

    for (let file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "school_events",
      });

      imageUrls.push(result.secure_url);

      // delete local file after upload
      fs.unlinkSync(file.path);
    }

    const updatedEvent = await EventPhoto.findOneAndUpdate(
      { eventType },
      { $push: { photos: { $each: imageUrls } } },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Photos uploaded successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};