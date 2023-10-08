import React, { useState } from 'react';
import axios from 'axios';

function NewDeviceFrom({ newDevice, setNewDevice, devices, setDevices, icons }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    connectedTo: '',
    description: '',
    iconID: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // function to handle change event on form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  // function to handle submit event on form
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate form inputs
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.type) errors.type = 'Plese select device type';
    if (!formData.connectedTo) {
      if (formData.type === 'Spliter') errors.connectedTo = 'Plese select OLT device';
      else if (formData.type === 'ONT') errors.connectedTo = 'Plese select Spliter device';
    }
    if (!formData.serialNumber) errors.serialNumber = 'Serial number is required';
    if (!formData.iconID) errors.iconID = 'Please select icon';

    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    //if form is valid, send post request to add new device
    const newDeviceData = { ...newDevice, ...formData };

    axios
      .post(`http://localhost:5000/devices`, {
        ...newDeviceData,
      })
      .catch(function (error) {
        console.log(error);
      });

    // update devices locally
    setDevices([...devices, { ...newDevice, ...formData }]);
    setNewDevice({});
  };

  // function to cancel adding new device
  const deleteNewDevice = () => {
    setNewDevice({});
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* New device name input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
            {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
          </div>
          {/* New device name type */}
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select className="form-control" id="type" name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select type </option>
              <option value="ONT">ONT</option>
              <option value="OLT">OLT</option>
              <option value="Spliter">Spliter</option>
            </select>
            {formErrors.type && <p className="text-danger">{formErrors.type}</p>}
          </div>
          {/* New device connected to depends on device type */}
          {formData.type === 'Spliter' ? (
            <div className="mb-3">
              <label htmlFor="connectedTo" className="form-label">
                OLT device
              </label>
              <select className="form-control" id="connectedTo" name="connectedTo" value={formData.connectedTo} onChange={handleChange}>
                <option value="">Select device </option>
                {devices.map((device) => {
                  return device.type === 'OLT' ? (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ) : null;
                })}
              </select>
              {formErrors.connectedTo && <p className="text-danger">{formErrors.connectedTo}</p>}
            </div>
          ) : null}
          {formData.type === 'ONT' ? (
            <div className="mb-3">
              <label htmlFor="connectedTo" className="form-label">
                Spliter device
              </label>
              <select className="form-control" id="connectedTo" name="connectedTo" value={formData.connectedTo} onChange={handleChange}>
                <option value="">Select device </option>
                {devices.map((device) => {
                  return device.type === 'Spliter' ? (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ) : null;
                })}
              </select>
              {formErrors.connectedTo && <p className="text-danger">{formErrors.connectedTo}</p>}
            </div>
          ) : null}

          {/* New device serial number input */}
          <div htmlFor="serialNumber" className="mb-3">
            <label className="form-label">Serial Number</label>
            <input type="text" className="form-control" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
            {formErrors.serialNumber && <p className="text-danger">{formErrors.serialNumber}</p>}
          </div>

          {/* New device description input */}
          <div htmlFor="description" className="mb-3">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>

          {/* New device icon input */}
          <div className="mb-3">
            <label htmlFor="iconID" className="form-label">
              Icon
            </label>
            <select className="form-control" id="iconID" name="iconID" value={formData.iconID} onChange={handleChange}>
              <option value="">Select icon</option>
              {icons.map((icon) => (
                <option key={icon.id} value={Number(icon.id)}>
                  {icon.name}
                </option>
              ))}
            </select>
            {formErrors.iconID && <p className="text-danger">{formErrors.iconID}</p>}
          </div>
          {/* Submit button */}
          <button className="btn btn-success w-50 " type="submit">
            Add device
          </button>
          {/* Cancel button */}
          <button className="btn btn-danger w-50 " onClick={deleteNewDevice}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default NewDeviceFrom;
