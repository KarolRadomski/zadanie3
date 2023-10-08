import React, { useEffect } from 'react';
import styles from '../styles/Settings.module.css';
import NewDeviceFrom from './NewDeviceFrom';
import EditDeviceForm from './EditDeviceForm';

function Settings({ devices, setDevices, selectedDevice, setSelectedDevice, editMode, setEditMode, addMarkerMode, setAddMarkerMode, newDevice, setNewDevice, icons }) {
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleAddMarkerMode = () => {
    setAddMarkerMode(!addMarkerMode);
  };

  useEffect(() => {}, [newDevice]);

  return (
    <div className={styles.container}>
      <div>
        {editMode ? (
          <div className="d-flex justify-content-around">
            <button className="btn btn-success" onClick={toggleEditMode}>
              Exit edit mode
            </button>
            <button className="btn btn-success" onClick={toggleAddMarkerMode}>
              Add device
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-warning text-center" onClick={toggleEditMode}>
              Enter edit mode
            </button>
          </div>
        )}
        {editMode ? (
          addMarkerMode ? (
            <h5 className="mt-5 text-center">Click on the map to add a new device position</h5>
          ) : (
            <h5 className="mt-5 text-center">Click on the device to edit</h5>
          )
        ) : selectedDevice.name ? (
          <h3 className="mt-5 text-center">Device details</h3>
        ) : (
          <h5 className="mt-5 text-center">Click on the device to get more data</h5>
        )}

        {newDevice.lat ? <NewDeviceFrom newDevice={newDevice} setNewDevice={setNewDevice} devices={devices} setDevices={setDevices} icons={icons} /> : null}
        {selectedDevice.name ? (
          editMode ? (
            <EditDeviceForm selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} devices={devices} setDevices={setDevices} icons={icons} />
          ) : (
            <div className="mt-4">
              <p>
                Name : <strong>{selectedDevice.name}</strong>
              </p>
              <p>
                Type : <strong>{selectedDevice.type}</strong>
              </p>
              <p>
                Serial Number : <strong>{selectedDevice.serialNumber}</strong>
              </p>
              <p>
                Signal : <strong>{selectedDevice.signal}</strong>
              </p>
              <p>
                Status : <strong>{selectedDevice.status}</strong>
              </p>
              {selectedDevice.description ? (
                <p>
                  Description : <strong>{selectedDevice.description}</strong>
                </p>
              ) : null}
            </div>
          )
        ) : null}
        {/* {selectedDevice.name ? <EditDeviceForm selectedDevice={selectedDevice} icons={icons} /> : null} */}
        {/* <pre>{JSON.stringify(newDevice, null, 2)}</pre> */}
      </div>
    </div>
  );
}

export default Settings;
