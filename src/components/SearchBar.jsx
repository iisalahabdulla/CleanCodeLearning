import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <input
    type="text"
    placeholder="Search principles..."
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default SearchBar;