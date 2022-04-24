import logo from './images/logo_gpa.png';
import './navBarForGpaCal.css';
import {FaTimes, FaBars} from 'react-icons/fa'
import { useState, useEffect } from 'react';


// pls insert the of each folder

const NavBarForGpaCal = () => {
  // {click ? "nav-items-active" : "nav-items"}
  
  return (
  <div className="nav-container">
    <div className="wrapper-container">
      <div className="wrapper">
        <nav>
          <ul>
            <div className="logo">
              <img src={logo} alt="CC info logo"/>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default NavBarForGpaCal;