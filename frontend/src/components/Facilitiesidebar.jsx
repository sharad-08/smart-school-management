 



// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const Facilitiesidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { name: "Annual Function", path: "/facilities/annual" },
//     { name: "Sports", path: "/facilities/sports" },
//     { name: "Art Class", path: "/facilities/art" },
//     { name: "Science Labs", path: "/facilities/labs" },
//     { name: "Transport", path: "/facilities/transport" },
//     { name: "Library", path: "/facilities/libraryPhotos" }
//   ];

//   return (
//     <>
//       {/* ===== MOBILE TOP BAR ===== */}
//       <div className="md:hidden z-10 w-full fixed flex items-center justify-between p-4 bg-white shadow">
//         <h2 className="font-semibold">Facilities</h2>
//         <button onClick={() => setIsOpen(true)}>☰</button>
//       </div>

//       {/* ===== OVERLAY (Mobile only) ===== */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40  md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* ===== SIDEBAR ===== */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full   bg-white shadow-lg z-50
//           transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:w-64 md:static
//         `}
//       >
//         {/* Close button mobile */}
//         <div className="flex justify-between items-center p-4 md:hidden">
//           <h2 className="font-semibold">Facilities</h2>
//           <button onClick={() => setIsOpen(false)}>✕</button>
//         </div>

//         <div className="p-6 flex flex-col gap-4">
//           {menuItems.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.path}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `px-4 py-3 rounded-lg transition ${
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 hover:bg-blue-100"
//                 }`
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Facilitiesidebar;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Facilitiesidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Annual Function", path: "/facilities/annual" },
    { name: "Sports", path: "/facilities/sports" },
    { name: "Art Class", path: "/facilities/art" },
    { name: "Science Labs", path: "/facilities/labs" },
    { name: "Transport", path: "/facilities/transport" },
    { name: "Library", path: "/facilities/libraryPhotos" }
  ];

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden z-10 w-full fixed flex items-center justify-between p-4 bg-white shadow">
        <h2 className="font-semibold">Facilities</h2>
        <button onClick={() => setIsOpen(true)}>☰</button>
      </div>

      {/* ===== OVERLAY ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`
          fixed   left-0 h-screen w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
       ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close mobile */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-semibold">Facilities</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="p-6 flex flex-col gap-4 mt-10 md:mt-0">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-blue-100"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Facilitiesidebar;
