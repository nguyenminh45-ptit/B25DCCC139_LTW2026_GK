import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/tasks" end>Danh sách</NavLink>
    <NavLink to="/tasks/new" end>Thêm mới</NavLink>
  </nav>
);

export default NavBar;
