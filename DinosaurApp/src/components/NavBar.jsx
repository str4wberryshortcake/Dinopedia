import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/"> DinoPedia </Link>
      </div>
      <div className="navbar-right">
        <div className="dropdown" ref={dropdownRef}>
          <span
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Dinosaur
          </span>
          {showDropdown && (
            <div className="dropdown-content">
              <Link to="/dinosaurs">Dinosaurs</Link>
              <Link to="/time-periods">Time Periods</Link>
              <Link to="/major-groups">Major Groups</Link>
            </div>
          )}
        </div>
        <Link to="/merch">Merch</Link>
        <Link to="/museum">Museum</Link>
        <Link to="/contact">Contact Us</Link>

      </div>
    </nav>
  );
};

export default NavBar;
