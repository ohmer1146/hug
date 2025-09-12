import React from 'react';

const TestTailwind = () => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg m-4">
      <h1 className="text-2xl font-bold">Tailwind CSS Test</h1>
      <p className="mt-2">If this is styled, Tailwind is working!</p>
      <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
        Test Button
      </button>
    </div>
  );
};

export default TestTailwind;