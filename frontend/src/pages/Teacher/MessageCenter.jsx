// import React, { useState } from "react";

// const MessageCenter = () => {
//   const [message, setMessage] = useState("");

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">

//       <h2 className="text-xl font-bold mb-4">Send Message to Students</h2>

//       <textarea
//         rows="4"
//         className="w-full border p-3 rounded-lg"
//         placeholder="Write your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       ></textarea>

//       <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
//         Send Message
//       </button>

//     </div>
//   );
// };

// export default MessageCenter;

// import React, { useState, useContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Appcontext } from "../../context/Appcontext";

// const MessageCenter = () => {
//   const [message, setMessage] = useState("");
//   const { backendUrl, token } = useContext(Appcontext);
 
//   const handleSend = async () => {
//     if (!message.trim()) {
//       toast.warning("Please write a message first");
//       return;
//     }
// console.log("Token:", token);
//     try {
//       await axios.post(
//         "http://localhost:4000/api/messages/send",
//         { message },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Token:", token);
        
//       toast.success("Message Sent Successfully ✅");
//       setMessage("");

//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to send message ❌");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <h2 className="text-xl font-bold mb-4">
//         Send Message to Students
//       </h2>

//       <textarea
//         rows="4"
//         className="w-full border p-3 rounded-lg"
//         placeholder="Write your message here..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       ></textarea>

//       <button
//         onClick={handleSend}
//         className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
//       >
//         Send Message
//       </button>
//     </div>
//   );
// };

// export default MessageCenter;


import React, { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appcontext } from "../../context/Appcontext";

const MessageCenter = () => {
  const [message, setMessage] = useState("");
  const { backendUrl, token } = useContext(Appcontext);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.warning("Please write a message first ⚠️");
      return;
    }

    try {
      const res = await axios.post(
           "http://localhost:4000/api/messages/send",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Message sent successfully ✅");
      setMessage("");

    } catch (error) {
      console.error("Send message error:", error);
      // Check for server response
      if (error.response?.data?.message) {
        toast.error(`Failed: ${error.response.data.message} ❌`);
      } else {
        toast.error("Failed to send message ❌");
      }
    }
  };

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

      <button
        onClick={handleSend}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Send Message
      </button>

      {/* ToastContainer must be included to show toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default MessageCenter;