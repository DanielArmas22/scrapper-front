const CarDetails = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Detalles del Vehículo</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="marca"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Marca
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="marca"
            name="marca"
            onChange={onChange}
            placeholder="e.g., Toyota"
          />
        </div>
        <div>
          <label
            htmlFor="modelo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Modelo
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="modelo"
            name="modelo"
            onChange={onChange}
            placeholder="e.g., Yaris"
          />
        </div>
        <div>
          <label
            htmlFor="año"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Año
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="año"
            name="año"
            min="1900"
            max={new Date().getFullYear()}
            onChange={onChange}
            placeholder="e.g., 2020"
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;