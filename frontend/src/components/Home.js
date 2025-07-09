import '../css/Home.css';
import { Link } from 'react-router-dom';

// We're using Free plan of Render: Free instances spin down after periods of inactivity (50seconds Loading)
function Home( ) {
  
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to IonianFarsi</h1>
        <p>Your gateway to the finest experiences</p>
        <div className="button-container">
          <Link to='/practice' className='button go-app'>Go to Application</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
