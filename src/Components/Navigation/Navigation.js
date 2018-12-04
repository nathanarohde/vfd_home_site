import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css'

const navigation = () => (
  <nav className="Wrapper">
    <div className="circusSign">
      <Link to="/">Home</Link>
    </div>
    <div className="circusSign">
      <Link to="/archive">Archive</Link>
    </div>
  </nav>
)

export default navigation;
