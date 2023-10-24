
import React, { useState } from 'react';

export default function SortProducts({ onSort }) {
  const [sortType, setSortType] = useState('asc');

  const handleSortChange = (event) => {
    setSortType(event.target.value); // Update sort type in component state
    onSort(event.target.value); // Pass the current sort type to the parent component
  };

  return (
    <div className="sort-products">
      <label htmlFor="sort">Sort by</label>
      <select id="sort" value={sortType} onChange={handleSortChange}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
