import React from 'react';

const ModelSelector = ({ onChange }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="model"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Model
      </label>
      <select
        id="model"
        name="model"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        onChange={onChange}
      >
        <option value="">Select a model</option>
        <option value="Model A">Model A</option>
        <option value="Model B">Model B</option>
        <option value="Model C">Model C</option>
        <option value="Model D">Model D</option>
      </select>
    </div>
  );
};

export default ModelSelector;