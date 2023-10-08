import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Markers from '../components/Markers';
import Settings from '../components/Settings';
import NewMarker from '../components/NewMarker';
import Lines from '../components/Lines';

function Map() {
  const [devices, setDevices] = useState([]);

  const [icons, setIcons] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [addMarkerMode, setAddMarkerMode] = useState(false);

  const [newDevice, setNewDevice] = useState({});

  // Fetching data from server and setting state
  useEffect(() => {
    (async () => {
      const devicesResponse = await fetch('http://localhost:5000/devices');
      const devicesData = await devicesResponse.json();
      setDevices(devicesData);

      await fetch('http://localhost:5000/icons')
        .then((response) => response.json())
        .then((data) => {
          setIcons(data);
        });
    })();
  }, []);

  // Function to handle click event on map during adding new device
  function ClickWatch() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setNewDevice({ lat: lat, lon: lng, status: 'active', signal: '-20' });
        setAddMarkerMode(false);
      },
    });
    return null;
  }

  // Setting selected device to empty object when addMarkerMode is true
  useEffect(() => {
    if (addMarkerMode) {
      setSelectedDevice({});
    }
  }, [addMarkerMode]);

  return (
    <div className="d-flex">
      {/* MapContainer component from react-leaflet library */}
      <MapContainer center={[52.0, 19.0]} zoom={7} style={{ height: '100vh', width: '75%' }} scrollWheelZoom={true}>
        {/* Displaying the map */}
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Component which redner every point on the map */}
        <Markers devices={devices} setDevices={setDevices} selectedDevice={selectedDevice} addMarkerMode={addMarkerMode} newDevice={newDevice} setSelectedDevice={setSelectedDevice} icons={icons} editMode={editMode} />
        {/* Component to capture a click on the map when the user adds a new point */}
        {addMarkerMode ? <ClickWatch /> : null}
        {/* Component to render a new point on the map */}
        {newDevice.lat ? <NewMarker newDevice={newDevice} setNewDevice={setNewDevice} /> : null}
        {/* Component to render lines between points */}
        <Lines devices={devices} />
      </MapContainer>

      {/* Component to render settings panel */}
      <Settings
        devices={devices}
        setDevices={setDevices}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        editMode={editMode}
        setEditMode={setEditMode}
        addMarkerMode={addMarkerMode}
        setAddMarkerMode={setAddMarkerMode}
        newDevice={newDevice}
        setNewDevice={setNewDevice}
        icons={icons}
      />
    </div>
  );
}

export default Map;
