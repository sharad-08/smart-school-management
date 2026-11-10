

import { uploadImage } from "../config/cloud.js";
import EventPhoto from "../models/uploadphotos.js";

export const uploadEventPhotos = async (req, res) => {
  try {
    const { eventType } = req.body;

    if (!eventType)
      return res.status(400).json({ message: "Event type is required" });

    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files received" });

    const imageUrls = [];

    for (const file of req.files) {
      const result = await uploadImage(file.buffer, {
        folder: "school_events",
      });

      imageUrls.push(result.secure_url);
    }

    const updatedEvent = await EventPhoto.findOneAndUpdate(
      { eventType },
      { $push: { photos: { $each: imageUrls } } },
      { returnDocument: "after", upsert: true }
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