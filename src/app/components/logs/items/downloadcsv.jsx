import React from 'react';
import Papa from 'papaparse';

const data = [
  { name: 'Alice', age: 25, email: 'alice@example.com' },
  { name: 'Bob', age: 30, email: 'bob@example.com' },
  { name: 'Charlie', age: 22, email: 'charlie@example.com' },
];

const CSVExporter = () => {
  const downloadCSV = () => {
    const csv = Papa.unparse(data); // Convert array of objects to CSV string
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md text-center">
      <h2 className="text-lg font-bold mb-2">Export Data as CSV</h2>
      <button
        onClick={downloadCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download CSV
      </button>
    </div>
  );
};

export default CSVExporter;
