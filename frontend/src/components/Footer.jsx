


import React from 'react'
import assets from '../assets/assets'
import { NavLink ,useLocation} from 'react-router-dom'

const Footer = () => {
   const location = useLocation()
  const isHome = location.pathname === "/"
 
  return (
 
//       <div
//   id="main-footer"
//   className={`
//     bg-gray-900 text-white
//     px-6 md:px-16 py-12
//     ${!isHome ? "md:ml-64" : ""}
  
//   `}
// >
<div
  id="main-footer"
  className={`
    bg-gray-900 text-white
    px-6 md:px-16 py-12
    ${location.pathname !== "/" && location.pathname !== "/login" ? "md:ml-64" : ""}
  `}
>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1 - Logo & About */}
        <div>
          <img src={assets.logo} alt="logo" className="w-40 mb-4" />
          <p className="text-gray-400 text-sm leading-6">
            Empowering students to achieve their dreams through quality education 
            and holistic development.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <p className="text-lg font-semibold mb-4">Quick Links</p>
          <ul className="flex flex-col gap-3 text-gray-400">
            <NavLink to="/" className="hover:text-blue-400 duration-300">
              <li>Home</li>
            </NavLink>
            <NavLink to="/About" className="hover:text-blue-400 duration-300">
              <li>About</li>
            </NavLink>
            <NavLink to="/Facilities" className="hover:text-blue-400 duration-300">
              <li>Facilities</li>
            </NavLink>
            <NavLink to="/Events" className="hover:text-blue-400 duration-300">
              <li>Events</li>
            </NavLink>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <p className="text-lg font-semibold mb-4">Contact Info</p>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            
            <li>
              <a 
                href="https://maps.app.goo.gl/GqYkxaXUBqVrPAPm9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 duration-300"
              >
                Nimar Academy Rahadkot PIN-451113
              </a>
            </li>

            <li>
              <a 
                href="tel:9691428500"
                className="hover:text-blue-400 duration-300"
              >
                96914-28500
              </a>
            </li>

            <li>
              <a 
                href="mailto:nimaracademy@gmail.com"
                className="hover:text-blue-400 duration-300"
              >
                nimaracademy@gmail.com
              </a>
            </li>

          </ul>
        </div>

        {/* Column 4 - Follow Us */}
        <div>
          <p className="text-lg font-semibold mb-4">Follow Us</p>

          <p className="text-gray-400 text-sm mb-4">
            Stay connected for latest updates and announcements.
          </p>

          <div className="flex gap-4 text-2xl">
            
            <a href="#" className="hover:text-blue-500 duration-300">
              <i className='bx bxl-facebook'></i>
            </a>

            <a href="#" className="hover:text-sky-400 duration-300">
              <i className='bx bxl-twitter'></i>
            </a>

            <a href="#" className="hover:text-pink-500 duration-300">
              <i className='bx bxl-instagram'></i>
            </a>

            <a href="#" className="hover:text-red-500 duration-300">
              <i className='bx bxl-youtube'></i>
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Nimar Academy Rahadkot. All Rights Reserved.
      </div>

    </div>
  )
}

export default Footer
