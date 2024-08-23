import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Background from "../components/Background";
import Navbar from "../components/NavBar";
import { CUNY_RESOURCES } from "../data/CunyResources";
import MarkerClusterGroup from "react-leaflet-cluster";
import Select from "react-select";

const NYC_COORDINATES = [40.7128, -74.006];

const BOUNDS = [
  [40.477399, -74.25909],
  [40.917577, -73.700272],
];

const MapPage = () => {
  const [activeResource, setActiveResource] = useState(null);
  const [filteredResources, setFilteredResources] = useState(CUNY_RESOURCES);
  const markerRefs = useRef([]);
  const mapRef = useRef(null);

  const handleListItemClick = async (index) => {
    setActiveResource(index === activeResource ? null : index);

    const marker = markerRefs.current[index];
    const map = mapRef.current;

    if (marker) {
      const isInCluster = marker.getLatLng().equals(map.getCenter());
      if (!marker._icon && !isInCluster) {
        map.setView(marker.getLatLng(), map.getZoom() + 10, {
          animate: true,
        });

        setTimeout(() => {
          marker.openPopup();
        }, 500);
      } else {
        marker.openPopup();
      }
    }
  };

  const handleSearchChange = (selectedOption) => {
    if (selectedOption) {
      const filtered = CUNY_RESOURCES.filter((resource) =>
        resource.name
          .toLowerCase()
          .includes(selectedOption.value.toLowerCase()),
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources(CUNY_RESOURCES);
    }
  };

  const options = CUNY_RESOURCES.map((resource) => ({
    value: resource.name,
    label: resource.name,
  }));

  return (
    <Background>
      <Navbar />
      <div className="m-8 flex">
        <div className="hidden h-[85vh] w-full overflow-hidden rounded-bl-md rounded-tl-md sm:block md:w-[65%]">
          <MapContainer
            center={NYC_COORDINATES}
            zoom={11}
            maxBounds={BOUNDS}
            maxZoom={18}
            minZoom={11}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {filteredResources.map((resource, index) => (
                <Marker
                  key={index}
                  position={resource.coordinates}
                  ref={(el) => (markerRefs.current[index] = el)}
                >
                  <Popup>
                    <span className="font-semibold">{resource.name}</span>
                    <br />
                    {resource.description}
                    <br />
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Page
                    </a>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
        <div className="h-[85vh] w-full overflow-auto rounded-md bg-white p-8 md:w-[35%] md:rounded-bl-none md:rounded-br-md md:rounded-tl-none md:rounded-tr-md">
          <h2 className="mb-4 text-2xl font-bold">CUNY Resources</h2>
          <Select
            options={options}
            isClearable
            onChange={handleSearchChange}
            placeholder="Search for a resource..."
            className="mb-4"
          />
          <ul>
            {filteredResources.map((resource, index) => (
              <li
                key={index}
                className={`cursor-pointer rounded-md p-2 ${
                  activeResource === index
                    ? "bg-blue-200"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleListItemClick(index)}
              >
                <div>
                  <span className="font-semibold">{resource.name}</span>
                  {activeResource === index && (
                    <div className="mt-2 text-sm text-gray-700">
                      {resource.description}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Background>
  );
};

export default MapPage;
