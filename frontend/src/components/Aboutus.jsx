
import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Aboutus = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-slate-50 py-10 px-4 sm:px-8 lg:px-16">

      {/* Title */}
      <div className="flex justify-center mb-8">
        <p className="px-6 py-2 rounded-lg bg-blue-100 font-medium text-blue-600">
          About Us
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center shadow-black shadow-lg rounded-2xl">
          <img
            src={assets.building}
            alt="building"
            className="rounded-2xl w-full max-w-md lg:max-w-full"
          />
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2">

          <p className="text-2xl md:text-3xl font-bold">
            Building Tomorrow's Leaders Today
          </p>

          <p className="text-sm md:text-base text-gray-600 mt-4">
            Bright Future School has been a beacon of educational excellence for over 25 years. 
            We are committed to nurturing young minds and preparing them for the challenges 
            of tomorrow through innovative teaching methodologies and state-of-the-art facilities.
          </p>

          <p className="text-sm md:text-base text-gray-600 mt-4">
            Our dedicated faculty, comprehensive curriculum, and emphasis on holistic development 
            ensure that every student receives personalized attention and opportunities to excel 
            in academics, sports, and extracurricular activities.
          </p>

          {/* Feature 1 */}
          <div className="flex mt-6 items-start">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <i className="bx bx-check text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium">CBSE Affiliated</p>
              <p className="text-gray-600 text-sm">
                Recognized by Central Board of Secondary Education
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex mt-4 items-start">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <i className="bx bx-check text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium">Smart Classroom</p>
              <p className="text-gray-600 text-sm">
                Technology-enabled learning environment
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate('/about')}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg"
          >
            Learn More About Us
          </button>

        </div>
      </div>
    </div>
  )
}

export default Aboutus
