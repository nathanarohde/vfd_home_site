import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css'

const navigation = () => (
  <nav className="Wrapper">
    <Link to="/">Home</Link>
    <Link to="/archive">Archive</Link>
  </nav>
)

export default navigation;
