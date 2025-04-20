import React from "react";

const PriceRange = ({ onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
        Rango de precios
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="desde"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Precio desde (€)
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="desde"
            name="desde"
            onChange={onChange}
          >
            <option value="">Sin mínimo</option>
            <option value="1000">1.000 €</option>
            <option value="2000">2.000 €</option>
            <option value="3000">3.000 €</option>
            <option value="5000">5.000 €</option>
            <option value="10000">10.000 €</option>
            <option value="15000">15.000 €</option>
            <option value="20000">20.000 €</option>
            <option value="25000">25.000 €</option>
            <option value="30000">30.000 €</option>
            <option value="40000">40.000 €</option>
            <option value="50000">50.000 €</option>
            <option value="60000">60.000 €</option>
            <option value="80000">80.000 €</option>
            <option value="100000">100.000 €</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="hasta"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Precio hasta (€)
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="hasta"
            name="hasta"
            onChange={onChange}
          >
            <option value="">Sin máximo</option>
            <option value="2000">2.000 €</option>
            <option value="3000">3.000 €</option>
            <option value="5000">5.000 €</option>
            <option value="10000">10.000 €</option>
            <option value="15000">15.000 €</option>
            <option value="20000">20.000 €</option>
            <option value="25000">25.000 €</option>
            <option value="30000">30.000 €</option>
            <option value="40000">40.000 €</option>
            <option value="50000">50.000 €</option>
            <option value="60000">60.000 €</option>
            <option value="80000">80.000 €</option>
            <option value="100000">100.000 €</option>
            <option value="120000">120.000 €</option>
            <option value="150000">150.000 €</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;