import React, { useState } from "react";

const MessageCenter = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">Send Message to Students</h2>

      <textarea
        rows="4"
        className="w-full border p-3 rounded-lg"
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
        Send Message
      </button>

    </div>
  );
};

export default MessageCenter;
