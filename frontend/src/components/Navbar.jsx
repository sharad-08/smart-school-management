

import React, { useContext } from 'react'
import assets from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext'

const Navbar = () => {

  const navigate = useNavigate();
  const {token,settoken}=useContext(Appcontext);


  const logout=()=>{
    settoken(false);
    localStorage.removeItem("token");
    
  }

  return (
    <div className='sticky top-0 left-0 w-full bg-white  z-50 px-8  flex items-center justify-between shadow-sm border-b-2'>
      
      {/* Logo */}
      

      <div className='flex items-center text-center'>
        <img 
        onClick={() => navigate("/")}
        className='cursor-pointer w-32'
        src={assets.logo} 
        alt="logo"
      />
        {
          token ? (<button className='text-blue-500 text-xs border rounded-lg w-16 h-4 items-center flex justify-center'>Student</button>) :" "
        }
      </div>
       
      {/* Menu */}
      <ul className='flex items-center gap-6 text-base'>

        <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : ""}>
          <li>Home</li>
        </NavLink>

        <NavLink to="/about" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : ""}>
          <li>About</li>
        </NavLink>

        <NavLink to="/facilities" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : ""}>
          <li>Facilities</li>
        </NavLink>

        {/* <NavLink to="/notification" className={`relative ({isActive}) => isActive ? "text-blue-600 font-semibold" : "" `}>
          <li> <i className="bx bxs-bell text-blue-600 text-2xl"></i><p className='absolute -right-1 -top-8 text-5xl text-red-600'>.</p></li>
        </NavLink> */}






       {/* create account + usrprofile */}
       <div>
        {

          token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.upload_area} alt="" />
            <img className="w-2.5" src={assets.logo} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>):( <button 
          onClick={() => navigate("/login")}
          className='px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition'
        >
          Login
        </button>)
        }
          
       </div>

      

      </ul>
    </div>
  )
}

export default Navbar
