
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
    <div className="facilities-layout">

      {/* Sidebar */}
      <Facilitysidebar />

      {/* Right Content */}
      <div className="facilities-content">

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
