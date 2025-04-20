import React from "react";

const PaginationSelector = ({ step, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      {/* <label
        htmlFor="pagination-selector"
        className="text-sm text-gray-700 mb-2"
      >
        Paginación
      </label> */}
      <div className="flex items-center">
        <input
          id="pagination-selector"
          type="number"
          min="1"
          max="20"
          value={step}
          onChange={(e) => onChange(parseInt(e.target.value) || 1)}
          className="w-16 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-500 ml-2">
          Número de páginas a consultar
        </span>
      </div>
    </div>
  );
};

export default PaginationSelector;
