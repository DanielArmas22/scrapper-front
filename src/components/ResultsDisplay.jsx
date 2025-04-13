const ResultsDisplay = ({ results }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="bg-gray-100 px-4 py-3 border-b">
        <h5 className="text-lg font-semibold text-gray-700">Search Results</h5>
      </div>
      <div className="p-4">
        <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono overflow-auto max-h-96 text-gray-800">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResultsDisplay;
