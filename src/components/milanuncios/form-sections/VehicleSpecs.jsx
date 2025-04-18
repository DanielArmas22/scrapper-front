import React from 'react';

const VehicleSpecs = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Vehicle Specifications</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="engine_type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Engine Type
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="engine_type"
            name="engine_type"
            onChange={onChange}
          >
            <option value="">Any</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="transmission"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transmission
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="transmission"
            name="transmission"
            onChange={onChange}
          >
            <option value="">Any</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="mileage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mileage (km)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="mileage"
            name="mileage"
            placeholder="e.g., 50000"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;