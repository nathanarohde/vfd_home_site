import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navigation.css'

const navigation = () => (
  <nav className="Wrapper">
    <NavLink to="/">Home</NavLink>
    <NavLink to="/archive">Archive</NavLink>
  </nav>
)

export default navigation;
