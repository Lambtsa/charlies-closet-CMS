import React, { useState } from 'react';

interface FiltersProps {
  items: any[],
  updateItems: (items: any) => void,
  filters: any,
}

/*
  Filters have to match item properties
*/

const Filters = (props: FiltersProps) => {
  const { items, updateItems, filters } = props;
  const [activeFilter, setActiveFilter] = useState('');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    const filteredItems = items.sort((a: any, b: any) => {
      if (typeof a[`${filter}`] === 'number' || typeof a[`${filter}`] === 'number') {
        return a[`${filter}`] - b[`${filter}`];
      }
      return a[`${filter}`].localeCompare(b[`${filter}`]);
    });
    updateItems(filteredItems);
  };

  return (
    <>
      <div className="filters__container">
        {Object.keys(filters).map((filter: string, index: number) => (
          <button
            key={index}
            className={`filters__btn ${activeFilter === filter ? 'active' : ''}`}
            type="button"
            onClick={() => handleFilterClick(filter)}>
              {`Par ${filters[filter]}`}
          </button>
        ))}
      </div>
    </>
  )
};

export default Filters;
