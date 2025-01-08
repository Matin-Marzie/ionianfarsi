import React from 'react';
import { Link, useLocation } from "react-router-dom";

import { FaBook } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg'
import { LuBrainCircuit } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";

import IonianFarsiLogo from './images/IonianFarsiLogo.png';

function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation Button Names: find the page name from the path (ex. 'ionianfarsi.gr/profile' ) and indicate the nav button color
const pathToButton = [
  { key: 'vocabulary', value: 'vocabulary'},
  { key: '/exercise', value: 'exercise' },
  { key: '/profile', value: 'profile' },
  { key: '/more', value: 'more' }
];

// Find the first match or fall back to default
const selected_button = (pathToButton.find(({ key }) => currentPath.startsWith(key))?.value) || 'vocabulary';

  return (
    <div className="navigation-bar">
      <div className='navigation-bar-innercontainer'>
        <h1 className="logo"><img src={IonianFarsiLogo} alt="IonianFarsi logo" /></h1>
        <ul className="nav-list">
          <li>
            <Link className={selected_button === 'vocabulary' ? 'selected-button' : null} to='/vocabulary'>
              <FaBook className="svg FaBook" /><span className='navigation-page-name'> VOCABULARY</span>
            </Link>
          </li>
          <li>
            <Link className={selected_button === 'exercise' ? 'selected-button' : null} to='/exercise'>
              <LuBrainCircuit className="svg LuBrainCircuit" /><span className='navigation-page-name'> EXERCISE</span>
            </Link>
          </li>
          <li>
            <Link className={selected_button === 'profile' ? 'selected-button' : null} to='/profile'>
              <CgProfile className="svg CgProfile" /><span className='navigation-page-name'> PROFILE</span>
            </Link>
          </li>
          <li>
            <Link className={selected_button === 'more' ? 'selected-button' : null} to='/more'>
              <BsThreeDots className='svg BsThreeDots'/><span className='navigation-page-name'> MORE</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;
