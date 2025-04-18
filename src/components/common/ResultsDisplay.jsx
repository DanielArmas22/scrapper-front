import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="results-display">
      {results.map((result, index) => (
        <div key={index} className="result-item">
          <h3 className="result-title">{result.title}</h3>
          <p className="result-description">{result.description}</p>
          <p className="result-price">{result.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;