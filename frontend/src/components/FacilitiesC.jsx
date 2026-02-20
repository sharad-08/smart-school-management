
import React from 'react'

const FacilitiesC = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-2 lg:px-16">

      {/* Title */}
      <div className="text-center mb-12">
        <p className="text-2xl md:text-3xl font-bold">
          World-Class Facilities
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Everything your child needs to thrive and excel
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {/* Card 1 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bxs-flask text-blue-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Science Labs</p>
          <p className="text-sm text-gray-500 mt-2">
            Fully equipped Physics, Chemistry, and Biology laboratories
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bx-laptop text-green-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Computer Labs</p>
          <p className="text-sm text-gray-500 mt-2">
            Modern computers with high-speed internet connection
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-fuchsia-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bxs-book text-fuchsia-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Library</p>
          <p className="text-sm text-gray-500 mt-2">
            Vast collection of books and digital resources
          </p>
        </div>

        {/* Card 4 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bx-basketball text-orange-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Sports Complex</p>
          <p className="text-sm text-gray-500 mt-2">
            Indoor and outdoor sports facilities
          </p>
        </div>

        {/* Card 5 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bx-palette text-red-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Art Studio</p>
          <p className="text-sm text-gray-500 mt-2">
            Creative space for painting and craft
          </p>
        </div>

        {/* Card 6 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-lime-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bxs-music text-lime-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Music Room</p>
          <p className="text-sm text-gray-500 mt-2">
            Learn various musical instruments
          </p>
        </div>

        {/* Card 7 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bx-bus text-yellow-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Transport</p>
          <p className="text-sm text-gray-500 mt-2">
            Safe and reliable bus service
          </p>
        </div>

        {/* Card 8 */}
        <div className="border rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
          <div className="flex justify-center mb-4">
            <div className="bg-pink-100 h-12 w-12 rounded-lg flex items-center justify-center">
              <i className="bx bx-bowl-hot text-pink-600 text-xl"></i>
            </div>
          </div>
          <p className="font-semibold text-lg">Cafeteria</p>
          <p className="text-sm text-gray-500 mt-2">
            Nutritious and hygienic meals
          </p>
        </div>

      </div>
    </div>
  )
}

export default FacilitiesC
