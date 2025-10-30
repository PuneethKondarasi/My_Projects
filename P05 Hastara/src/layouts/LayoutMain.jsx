import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import logo from '../assets/hastara-logo.png'; // <-- Import the logo

const LayoutMain = () => {
  return (
    <div className="container">
      {/* The header is now a flex container */}
      <header className="header">
        <img src={logo} alt="Hastara brand logo" className="header-logo" />
        <h1 className="brand-name">Hastara</h1>
      </header>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default LayoutMain;