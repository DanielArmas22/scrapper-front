import React from "react";

const CarDetails = ({ onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Generar años desde 1970 hasta el año actual
  for (let year = currentYear; year >= 1970; year--) {
    years.push(year);
  }

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-3 border-b pb-2">
        Detalles del vehículo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Año
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="year"
            name="year"
            onChange={onChange}
          >
            <option value="">Todos los años</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="kms"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kilometraje máximo
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="kms"
            name="kms"
            onChange={onChange}
          >
            <option value="">Sin límite</option>
            <option value="5000">5.000 km</option>
            <option value="10000">10.000 km</option>
            <option value="20000">20.000 km</option>
            <option value="30000">30.000 km</option>
            <option value="50000">50.000 km</option>
            <option value="80000">80.000 km</option>
            <option value="100000">100.000 km</option>
            <option value="120000">120.000 km</option>
            <option value="150000">150.000 km</option>
            <option value="200000">200.000 km</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Color
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="color"
            name="color"
            onChange={onChange}
          >
            <option value="">Todos</option>
            <option value="negro">Negro</option>
            <option value="blanco">Blanco</option>
            <option value="gris">Gris / Plata</option>
            <option value="azul">Azul</option>
            <option value="rojo">Rojo</option>
            <option value="verde">Verde</option>
            <option value="amarillo">Amarillo</option>
            <option value="marron">Marrón / Beige</option>
            <option value="naranja">Naranja</option>
            <option value="otros">Otros colores</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;