
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Facilitysidebar from "../components/Facilitiesidebar";
import Gallery from "../components/Gallery";
import FacilitiesC from "../components/FacilitiesC";
import Events_activite from "../components/Events_Activites";

const Facilities = () => {
  const { type } = useParams();
  const galleryRef = useRef(null);

  useEffect(() => {
    if (type && galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [type]);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Facilitysidebar />

      {/* Right Content */}
      <div className="flex-1 md:ml-64">

        <Events_activite />
        <FacilitiesC />

        {type && (
          <div ref={galleryRef}>
            <Gallery category={type} />
          </div>
        )}

      </div>

    </div>
  );
};

export default Facilities;
