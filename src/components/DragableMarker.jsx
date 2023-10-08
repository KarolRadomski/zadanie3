import { useState, useMemo, useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from 'axios';

function DraggableMarker({ device, devices, setDevices, icon, addMarkerMode, newDevice, setSelectedDevice, editMode, updateMarker }) {
  const [position, setPosition] = useState({ lat: device.lat, lng: device.lon });
  const markerRef = useRef(null);

  // function to update marker position after drag and drop
  // and handle click event on marker
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        // update marker position
        const marker = markerRef.current;

        if (marker != null) {
          setPosition(marker.getLatLng());
          //axios post request to update device position
          axios
            .put(`http://localhost:5000/devices/${device.id}`, {
              ...device,
              lat: marker.getLatLng().lat,
              lon: marker.getLatLng().lng,
            })
            .then(function (response) {
              updateMarker(device.id, marker.getLatLng().lat, marker.getLatLng().lng);

              // update devices position locally

              const newDevices = devices.map((tempDevice) => {
                if (tempDevice.id === device.id) {
                  tempDevice.lat = device.lat;
                  tempDevice.lon = device.lon;
                  return tempDevice;
                }
                return tempDevice;
              });
              setDevices([...newDevices]);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      // handle click event on marker
      click: () => {
        if (!addMarkerMode && !newDevice.lat) {
          setSelectedDevice(device);
        }
      },
    }),
    [device, devices, setDevices, setSelectedDevice, updateMarker]
  );

  useEffect(() => {}, [device]);
  return (
    // Marker component from react-leaflet library
    <Marker draggable={editMode} eventHandlers={eventHandlers} position={position} ref={markerRef} icon={icon}>
      {/* Popup component from react-leaflet library */}
      <Popup>
        <p>Signal: {device.signal}</p>
        <p>Status: {device.status}</p>
        <p>Description: {device.description}</p>
        <p>Serial Number: {device.serialNumber}</p>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;
