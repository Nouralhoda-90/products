import React, { useState } from 'react';

export default function ProductSearch({ onSearch, hasSearchButton }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update search term in component state
    onSearch(event.target.value); // Pass the current search term to the parent component
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm.trim()); // Trigger search if Enter key is pressed
    }
  };

  return (
    <div className="product-search">
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      {/* {hasSearchButton && <button onClick={() => onSearch(searchTerm.trim())}>Search</button>} */}
    </div>
  );
}