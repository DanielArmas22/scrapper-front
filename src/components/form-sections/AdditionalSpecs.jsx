const AdditionalSpecs = ({ onChange }) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
      <h6 className="font-medium text-gray-700 mb-3">
        Additional Specifications
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="min_seats"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Seats
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="min_seats"
            name="min_seats"
            min="1"
            max="9"
            placeholder="Min"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_seats"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Seats
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_seats"
            name="max_seats"
            min="1"
            max="9"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="min_num_doors"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Doors
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="min_num_doors"
            name="min_num_doors"
            min="2"
            max="6"
            placeholder="Min"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_num_doors"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Doors
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_num_doors"
            name="max_num_doors"
            min="2"
            max="6"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label
            htmlFor="min_horse_power"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Min Power (HP)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="min_horse_power"
            name="min_horse_power"
            placeholder="Min"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_horse_power"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Power (HP)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_horse_power"
            name="max_horse_power"
            placeholder="Max"
            onChange={onChange}
          />
        </div>
        <div>
          <label
            htmlFor="max_km"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Mileage (KM)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            id="max_km"
            name="max_km"
            placeholder="Max KM"
            onChange={onChange}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          id="professional"
          name="professional"
          value="true"
          onChange={onChange}
        />
        <label
          className="ml-2 block text-sm text-gray-700"
          htmlFor="professional"
        >
          Only Professional Sellers
        </label>
      </div>
    </div>
  );
};

export default AdditionalSpecs;
