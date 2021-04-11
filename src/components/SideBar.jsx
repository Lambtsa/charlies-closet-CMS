import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <>
    <aside className="sidebar">
      <h2>Menu</h2>
      <Link to="/items">Items</Link>
      <Link to="/boxes">Boxes</Link>
      <Link to="/sales">Sales</Link>
    </aside>
  </>
);

export default SideBar;
