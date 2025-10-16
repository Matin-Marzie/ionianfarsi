import '../css/Home.css';
import { Link } from 'react-router-dom';

// We're using Free plan of Render: Free instances spin down after periods of inactivity (50seconds Loading)

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to IonianFarsi</h1>
        <p>Learn Persian (Farsi) for free.</p>
        <div className="button-container flex flex-col">
          <Link to='/learn' className='button go-app'>Go to Application</Link>

          <div className="privacy-section" style={{ marginTop: '2rem', textAlign: 'center' }}>

            <a href="/privacy-policy" className="text-blue-500 hover:text-blue-700 underline bg-white p-1">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
