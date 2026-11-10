 import React, { useState } from "react";
import axios from "../../api";
// import { toast } from "react-toastify";
/* ================= EVENT TYPES ================= */
const eventTypes = [
  "Annual Function",
  "Library",
  "Transport",
  "Art Lab",
  "Science Lab",
  "Sports",
];

const EventPhotoUpload = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [photos, setPhotos] = useState([]);

  /* ================= HANDLE FILE UPLOAD ================= */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  /* ================= DELETE PHOTO ================= */
  const handleDeletePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= HANDLE SUBMIT ================= */
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!selectedEvent) return alert("Please select an event type!");
  //   if (photos.length === 0) return alert("Please upload at least one photo!");
  if (photos.length > 10 || photos.reduce((size, photo) => size + photo.file.size, 0) > 4 * 1024 * 1024) {
    return alert("Select up to 10 photos with a combined size of 4 MB or less.");
  }

  //   // Normally here you would send photos to backend
  //   console.log("Event Type:", selectedEvent);
  //   console.log("Photos:", photos.map((p) => p.file));

  //   alert("Photos uploaded successfully ✅");
  //   // Clear form
  //   setSelectedEvent("");
  //   setPhotos([]);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedEvent) return alert("Please select an event type!");
  if (photos.length === 0) return alert("Please upload at least one photo!");
  if (photos.length > 10 || photos.reduce((size, photo) => size + photo.file.size, 0) > 4 * 1024 * 1024) {
    return alert("Select up to 10 photos with a combined size of 4 MB or less.");
  }

  try {
    const formData = new FormData();
    formData.append("eventType", selectedEvent);

    photos.forEach((photo) => {
      formData.append("photos", photo.file);
    });

    await axios.post("/api/events/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Photos uploaded successfully ✅");
    setSelectedEvent("");
    setPhotos([]);
  } catch (error) {
    console.log(error);
    alert("Upload failed ❌");
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          📸 Upload Event Photos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= EVENT TYPE ================= */}
          <div>
            <label className="block font-semibold mb-2">Select Event Type</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select Event</option>
              {eventTypes.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          {/* ================= UPLOAD PHOTOS ================= */}
          <div>
            <label className="block font-semibold mb-2">Upload Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          {/* ================= PHOTO PREVIEW ================= */}
          {photos.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Preview:</h3>
              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo.url}
                      alt={`Event ${index}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex justify-center items-center hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Upload Photos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventPhotoUpload;
