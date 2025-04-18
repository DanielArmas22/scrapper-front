const CarDetails = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">Detalles del Coche</h6>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            multiple
          >
            <option value="">Cualquiera</option>
            <option value="small_car">Pequeño</option>
            <option value="coupe_cabrio">Coupe/Cabrio</option>
            <option value="sedan">Sedan</option>
            <option value="family_car">Familiar</option>
            <option value="mini_van">Monovolumen</option>
            <option value="4X4">4X4</option>
            <option value="van">Furgoneta</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Mantén presionada la tecla Ctrl para seleccionar múltiples opciones
          </p>
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
            multiple
          >
            <option value="">Cualquiera</option>
            <option value="gasoil">Diésel</option>
            <option value="gasoline">Gasolina</option>
            <option value="electric-hybrid">Eléctrico/Híbrido</option>
            <option value="others">Otros</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Mantén presionada la tecla Ctrl para seleccionar múltiples opciones
          </p>
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
            multiple
          >
            <option value="">Cualquiera</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automático</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Mantén presionada la tecla Ctrl para seleccionar múltiples opciones
          </p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            id="warranty"
            name="warranty"
            onChange={onChange}
          />
          <label
            htmlFor="warranty"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Con garantía
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            id="professional"
            name="professional"
            onChange={onChange}
          />
          <label
            htmlFor="professional"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Solo profesionales
          </label>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
