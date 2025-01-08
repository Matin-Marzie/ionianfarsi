import React, { useEffect } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';

function Home( {BACKEND_API_HOSTNAME} ) {

  // We're using Free plan of Render: Free instances spin down after periods of inactivity (50seconds Loading)
  useEffect(() => {

    const activate_render = async () => {
      fetch(`${BACKEND_API_HOSTNAME}/api/ok`);
    }
    activate_render();
  }, [BACKEND_API_HOSTNAME])

  
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to IonianFarsi</h1>
        <p>Your gateway to the finest experiences</p>
        <div className="button-container">
          <Link to='/vocabulary' className='button go-app'>Go to Application</Link>
          {/* <Link to='/login' className='button go-app'>Login</Link> */}
          {/* <Link to='/register' className='button go-app'>Register</Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
