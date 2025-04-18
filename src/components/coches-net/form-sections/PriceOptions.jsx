import React from 'react';

const PriceOptions = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Price Options</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="min_price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Price (€)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="min_price"
            name="min_price"
            placeholder="Min"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Price (€)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_price"
            name="max_price"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceOptions;