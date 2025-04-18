import React from 'react';

const AdditionalSpecs = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Additional Specifications</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="max_num_doors"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Doors
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_num_doors"
            name="max_num_doors"
            min="2"
            max="6"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="min_horse_power"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Power (HP)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="min_horse_power"
            name="min_horse_power"
            placeholder="Min"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_horse_power"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Power (HP)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_horse_power"
            name="max_horse_power"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalSpecs;