import { Link, useLocation } from "react-router-dom";

import { LuBrainCircuit } from "react-icons/lu";
import { CgProfile } from 'react-icons/cg'
import { BsThreeDots } from "react-icons/bs";

import IonianFarsiLogo from '../images/IonianFarsiLogo.png';

function NavigationBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation Button Names: find the page name from the path (ex. 'ionianfarsi.gr/profile' ) and indicate the nav button color
  const pathToButton = [
    { key: '/learn', value: 'learn' },
    { key: '/reels', value: 'reels' },
    { key: '/practice', value: 'pracitce' },
    { key: '/create', value: 'create' },
    { key: '/profile', value: 'profile' },
    { key: '/more', value: 'more' }
  ];

  // Find the first match or fall back to default
  const selected_button = (pathToButton.find(({ key }) => currentPath.startsWith(key))?.value) || null;

  return (
    <div className="bg-white flex flex-col md:h-full">
      <h1 className="hidden md:block w-9/12 mx-auto py-7 caret-transparent"><img src={IonianFarsiLogo} alt="IonianFarsi logo" /></h1>
      <ul className="flex flex-row md:flex-col justify-between md:p-5 md:space-y-4">
        <li className={`navigation-li ${selected_button === 'learn' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/learn'>
            <LuBrainCircuit className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> LEARN</h5>
          </Link>
        </li>
        {/* hidden */}
        <li className={`hidden navigation-li ${selected_button === 'reels' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/reels'>
            <CgProfile className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> Reels</h5>
          </Link>
        </li>
        {/* hidden */}
        <li className={`hidden navigation-li ${selected_button === 'practice' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/practice'>
            <CgProfile className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> Practice</h5>
          </Link>
        </li>
        {/* hidden */}
        <li className={`hidden navigation-li ${selected_button === 'create' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/create'>
            <CgProfile className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> Create</h5>
          </Link>
        </li>
        <li className={`navigation-li ${selected_button === 'profile' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/profile'>
            <CgProfile className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> PROFILE</h5>
          </Link>
        </li>
        <li className={`navigation-li ${selected_button === 'more' ? 'selected-li' : null}`}>
          <Link className='flex justify-center md:justify-between md:px-3 focus:text-white focus:bg-bluesea py-3 rounded-xl ' to='/more'>
            <BsThreeDots className='text-4xl md:text-3xl mr-4' /><h5 className='hidden md:block flex-grow'> MORE</h5>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationBar;
