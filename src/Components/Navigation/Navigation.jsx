import { useState } from 'react';
import { NavLink } from 'react-router';
import useUser from '@/hooks/useUser';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="navbar">
      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
        <NavLink to="/lost-found" className="nav-item">
          Lost & Found
        </NavLink>
        <NavLink to="/adoption" className="nav-item">
          Adoptions
        </NavLink>
        <NavLink to="/donation" className="nav-item">
          Donation
        </NavLink>
        {user && (
          <NavLink to="/my-reports" className="nav-item">
            My Reports
          </NavLink>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink
          to="/lost-found"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Lost & Found
        </NavLink>
        <NavLink
          to="/adoption"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Adoptions
        </NavLink>
        <NavLink
          to="/donation"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          Donation
        </NavLink>
        {user && (
          <NavLink
            to="/my-reports"
            className="nav-item"
            onClick={() => setIsOpen(false)}
          >
            My Reports
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
