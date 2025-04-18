const CarDetails = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Detalles del Coche</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="body_type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Carrocería
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="body_type"
            name="body_type"
            onChange={onChange}
          >
            <option value="">Cualquiera</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Coupe">Coupe</option>
            <option value="Sedan">Sedan</option>
            <option value="Familiar">Familiar</option>
            <option value="Monovolumen">Monovolumen</option>
            <option value="4X4">4X4</option>
            <option value="Furgoneta">Furgoneta</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="engine"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de Motor
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="engine"
            name="engine"
            onChange={onChange}
          >
            <option value="">Cualquiera</option>
            <option value="Diésel">Diésel</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="gearbox"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transmisión
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="gearbox"
            name="gearbox"
            onChange={onChange}
          >
            <option value="">Cualquiera</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;