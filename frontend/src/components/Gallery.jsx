


import React, { useState } from 'react'
import assets from '../assets/assets'

const Gallery = ({ category }) => {

  const images = assets.gallery[category]
  const [selectedIndex, setSelectedIndex] = useState(null)

  if (!images) {
    return <h2 className="text-xl mt-10">No Photos Found</h2>
  }

  const closeModal = () => setSelectedIndex(null)

  const nextImage = () => {
    setSelectedIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <div className=" p-16 bg-white">

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-48 sm:h-60 object-cover transition duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            ✕
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-10 text-white text-3xl sm:text-4xl"
          >
            ❮
          </button>

          <img
            src={images[selectedIndex]}
            alt="large"
            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-10 text-white text-3xl sm:text-4xl"
          >
            ❯
          </button>

          <div className="absolute bottom-6 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>

        </div>
      )}

    </div>
  )
}

export default Gallery
