import React from 'react';
import { PRIORITIES } from '../data';

const FilterBar = ({ query, priority, onQueryChange, onPriorityChange }) => (
  <div className="filter-bar">
    <div>
      <label htmlFor="search">Tìm kiếm</label>{' '}
      <input id="search" type="text" value={query} onChange={onQueryChange} />
    </div>
    <div>
      <label htmlFor="priority-filter">Mức ưu tiên</label>{' '}
      <select id="priority-filter" value={priority} onChange={onPriorityChange}>
        <option value="Tất cả">Tất cả</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
