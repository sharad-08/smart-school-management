
import React from 'react'
import assets from '../assets/assets'

const Ourgoal = () => {
  return (
    <div className='bg-white rounded-lg px-4 md:px-10 lg:px-16 py-10'>

      {/* ===== Title ===== */}
      <div className="text-center mb-10">
        <p className="text-2xl md:text-3xl font-bold">
          Our School Goals
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Building a foundation for lifelong success
        </p>
      </div>

      {/* ===== Grid Section ===== */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

        {/* Card 1 */}
        <div className='bg-blue-100 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-blue-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bxs-bulb text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Academic Excellence</p>
          <p className='text-sm text-gray-700'>
            Foster critical thinking and provide a comprehensive curriculum that prepares students for higher education and real world challenges.
          </p>
        </div>

        {/* Card 2 */}
        <div className='bg-green-100 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-green-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bxs-group text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Character Development</p>
          <p className='text-sm text-gray-700'>
            Cultivate strong moral values, leadership skills and social responsibility in every student.
          </p>
        </div>

        {/* Card 3 */}
        <div className='bg-purple-100 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-purple-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bxs-rocket text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Innovation & Creativity</p>
          <p className='text-sm text-gray-700'>
            Encourage creative thinking and technological proficiency to thrive in the modern world.
          </p>
        </div>

        {/* Card 4 */}
        <div className='bg-orange-100 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-orange-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bxs-heart text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Holistic Growth</p>
          <p className='text-sm text-gray-700'>
            Support physical, emotional and mental well-being through sports, arts and counseling programs.
          </p>
        </div>

        {/* Card 5 */}
        <div className='bg-red-100 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-red-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bx-globe text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Global Perspective</p>
          <p className='text-sm text-gray-700'>
            Develop cultural awareness and global citizenship through diverse learning experiences.
          </p>
        </div>

        {/* Card 6 */}
        <div className='bg-blue-200 p-6 rounded-2xl hover:shadow-xl transition duration-300'>
          <div className='bg-blue-600 h-12 w-12 rounded-lg flex justify-center items-center'>
            <i className="bx bxs-donate-heart text-white text-2xl"></i>
          </div>
          <p className='text-xl font-semibold py-3'>Community Partnership</p>
          <p className='text-sm text-gray-700'>
            Build strong relationships with parents and community to create a supportive ecosystem.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Ourgoal
