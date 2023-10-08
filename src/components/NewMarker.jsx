import React, { useState, useRef, useMemo } from 'react';
import { Marker } from 'react-leaflet';
function NewMarker({ newDevice, setNewDevice }) {
  const [position, setPosition] = useState({ lat: newDevice.lat, lng: newDevice.lon });

  const markerRef = useRef(null);

  // function to update marker position after drag and drop during adding new device
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setNewDevice({ ...newDevice, lat: marker.getLatLng().lat, lon: marker.getLatLng().lng });
        }
      },
    }),
    [newDevice, setNewDevice]
  );

  // display temporary marker on the map during adding new device
  return <Marker key={'newDevice'} draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef}></Marker>;
}

export default NewMarker;
