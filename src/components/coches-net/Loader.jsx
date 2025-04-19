import React from "react";

const Loader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
      <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 mt-2">
        Buscando vehículos, por favor espere...
      </p>
    </div>
  );
};

export default Loader;
