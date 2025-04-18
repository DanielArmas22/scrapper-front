import React from "react";

const SearchTypeToggle = ({ isDeepSearch, onChange }) => {
  return (
    <div className="flex flex-col items-end justify-end mb-4">
      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-2">
          {isDeepSearch ? "Búsqueda profunda" : "Búsqueda rápida"}
        </span>
        <button
          type="button"
          onClick={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
            isDeepSearch ? "bg-blue-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={isDeepSearch}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isDeepSearch ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      <span className="text-xs text-gray-500 ml-2 mt-2">
        {isDeepSearch ? "Uso de Agentes IA para procesar resultados" : ""}
      </span>
    </div>
  );
};

export default SearchTypeToggle;
