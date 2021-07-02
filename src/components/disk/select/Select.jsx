import React from 'react';
import './select.scss';

function Select({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="select">
      <option value="name">by name</option>
      <option value="type">by type</option>
      <option value="date">by date</option>
    </select>
  );
}

export default Select;
