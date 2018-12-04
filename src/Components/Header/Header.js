import React from 'react'
import './Header.css'
import logo from '../../Assets/vfd_finished_logo.png'

const header = () => (
  <div>
    <header className="bannerBackground">
      <div className="Wrapper">
        <div className="logo-title-box">
         <h1><span className="emphasizeBannerTitle">V</span>egetables for <span className="emphasizeBannerTitle">D</span>essert</h1>
         <img className="logo" src={logo} alt="Clown Skull"/>
        </div>
      </div>
    </header>
    <div className="Wrapper">
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
      <div className="halfCircle"></div>
    </div>
  </div>
)

export default header;
