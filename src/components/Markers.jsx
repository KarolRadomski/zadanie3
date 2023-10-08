import styles from '../styles/Markers.module.css';
import L from 'leaflet';

import DraggableMarker from './DragableMarker';
import { useEffect } from 'react';

function Markers({ devices, setDevices, selectedDevice, addMarkerMode, newDevice, setSelectedDevice, icons, editMode }) {
  // function to calculate css class for marker based on device status and signal and overwrite default marker icon
  // base on selected by marker creator icon, called during every marker render
  const generateCustomMarkerIcon = (device) => {
    let selectedColor = '';
    if (device.id === selectedDevice.id) {
      selectedColor = styles.selectedMarker;
    } else if (device.status === 'active' && device.signal > -26 && device.signal < -12) {
      selectedColor = styles.greenMarker;
    } else if (device.status === 'active' && (device.signal > -12 || device.signal < -26)) {
      selectedColor = styles.orangeMarker;
    } else if (device.status === 'inactive') {
      selectedColor = styles.redMarker;
    } else if (device.status === 'power off') {
      selectedColor = styles.grayMarker;
    } else {
      selectedColor = styles.blackMarker;
    }
    let iconHTML = icons.filter((icon) => {
      if (device.iconID === icon.id) {
        return icon.html;
      }
    })[0]?.html;

    // return custom marker icon
    return L.divIcon({
      className: selectedColor,
      html: iconHTML,
      iconSize: [32, 32],
    });
  };

  // function to update marker position after drag and drop
  let markers = [...devices];
  const updateMarker = (deviceID, lat, lon) => {
    markers.map((marker) => {
      if (marker.id === deviceID) {
        marker.lat = lat;
        marker.lon = lon;
      }
    });
  };

  // update markers after devices state change
  useEffect(() => {}, [devices]);

  return (
    <>
      {devices.map((device) => (
        <>
          {/* Component to render a draggable point on the map */}
          <DraggableMarker
            key={device.id}
            device={device}
            devices={devices}
            setDevices={setDevices}
            icon={generateCustomMarkerIcon(device)}
            addMarkerMode={addMarkerMode}
            newDevice={newDevice}
            setSelectedDevice={setSelectedDevice}
            editMode={editMode}
            updateMarker={updateMarker}
          />
        </>
      ))}
    </>
  );
}

export default Markers;
