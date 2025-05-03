import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  onSearch: (text: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">MyFlix</Link>

        <div className="navbar__search">
          <input type="text" placeholder="Search..." onChange={handleInputChange} />
        </div>
      </div>

      <div className="navbar__menu">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/my-list" className="navbar__link">My List</Link>
        <div className="navbar__profile">
          <img src="/public/profile.jpg" alt="Profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;