import React from "react";

const SortOptions = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Opciones de Ordenación</h6>
      <div>
        <label
          htmlFor="order_by"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ordenar resultados por
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          id="order_by"
          name="order_by"
          onChange={onChange}
        >
          <option value="most_relevance">
            Por relevancia (predeterminado)
          </option>
          <option value="closest">Por cercanía</option>
          <option value="price_low_to_high">Precio: de menor a mayor</option>
          <option value="price_high_to_low">Precio: de mayor a menor</option>
          <option value="newest">Por los más nuevos primero</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Selecciona cómo quieres que se ordenen los resultados de búsqueda
        </p>
      </div>
    </div>
  );
};

export default SortOptions;
