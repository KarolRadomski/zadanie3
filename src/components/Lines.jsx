import React, { useState, useEffect } from 'react';
import { Polyline } from 'react-leaflet';

function Lines({ devices }) {
  const [polylinse, setPolylines] = useState([]);

  // function to calculate polylines between devices
  const calculatePolylines = () => {
    let polylines = [];
    // loop through devices and find connected devices
    devices.map((device) => {
      let firstDevice = { lat: '', lon: '' };
      let secondDevice = { lat: '', lon: '' };
      if (device.connectedTo) {
        devices.map((device2) => {
          if (device2.id === parseInt(device.connectedTo)) {
            firstDevice.lat = device2.lat;
            firstDevice.lon = device2.lon;
            return firstDevice;
          }
        });
        secondDevice.lat = device.lat;
        secondDevice.lon = device.lon;

        // calculate color for polyline depending on device type
        let color = '';
        switch (device.type) {
          case 'ONT':
            color = calculateColorForONT(device);
            break;
          case 'Spliter':
            color = calculateColorForSpliter(devices, device);
            break;
          default:
            color = '#000000';
            break;
        }

        // add polyline to array
        polylines.push({
          id: polylines.length ? polylines.length : 0,
          color: color,
          position: [
            [firstDevice.lat, firstDevice.lon],
            [secondDevice.lat, secondDevice.lon],
          ],
        });
      }
    });
    setPolylines(polylines);
  };

  // function to calculate color for polyline between ONT and Spliter device (line color is the same as ONT color)
  const calculateColorForONT = (device) => {
    if (device.status === 'active' && device.signal > -26 && device.signal < -12) {
      return '#008000';
    } else if (device.status === 'active' && (device.signal > -12 || device.signal < -26)) {
      return '#ffa500';
    } else if (device.status === 'inactive') {
      return '#ff0000';
    } else if (device.status === 'power off') {
      return '#818181';
    } else {
      return '#000000';
    }
  };

  // function to calculate color for polyline between Spliter and OLT device (line color is the same as every Spliter device connected to OLT device)
  const calculateColorForSpliter = (devices, device) => {
    let spliterDevices = [];

    devices.map((tempDevice) => {
      if (parseInt(tempDevice.connectedTo) === device.id) {
        spliterDevices.push(tempDevice);
      }
    });

    if (spliterDevices.length === 0) return '#000000';
    else {
      let colorArray = new Array(spliterDevices?.length).fill('');
      spliterDevices.map((spliterDevice, index) => {
        if (spliterDevice.status === 'active' && spliterDevice.signal > -26 && spliterDevice.signal < -12) {
          colorArray[index] = '#008000';
        } else if (spliterDevice.status === 'active' && (spliterDevice.signal > -12 || spliterDevice.signal < -26)) {
          colorArray[index] = '#ffa500';
        } else if (spliterDevice.status === 'inactive') {
          colorArray[index] = '#ff0000';
        } else if (spliterDevice.status === 'power off') {
          colorArray[index] = '#818181';
        } else {
          colorArray[index] = '#000000';
        }
      });

      if (colorArray.every((value, index, array) => value === array[0])) return colorArray[0];
      else return '#000000';
    }
  };

  useEffect(() => {
    calculatePolylines();
  }, [devices]);

  // render connected devices polylines
  return polylinse.map((polyline) => <Polyline key={polyline.id} positions={polyline.position} color={polyline.color} />);
}

export default Lines;
