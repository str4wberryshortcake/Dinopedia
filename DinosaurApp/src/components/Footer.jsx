import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-purpose">
        <p>
          <strong>Our Purpose:</strong> Our website hopes to bring the ancient past to life
          with interactive exhibits, detailed dinosaur data, and an immersive virtual museum.
        </p>
      </div>

      <div className="footer-container">
        {/* Explore Section */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dinosaurs">Dinosaurs</Link></li>
            <li><Link to="/merch">Merch</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/museum">Museum</Link></li>
          </ul>
        </div>

        {/* Visit Us Section */}
        <div className="footer-section">
          <h4>Visit Us</h4>
          <address>
            Bayside High School<br />
            32-24 Corp Kennedy St.<br />
            Bayside, NY 11361
          </address>
          <p>
            Phone: (555) 123-4567<br />
            Email: altheam7@nycstudents.net, mukhlisf@nycstudents.net
          </p>
        </div>

        {/* Follow Section */}
        <div className="footer-section">
          <h4>Follow</h4>
          <ul className="social-list">
            <li><a href="#" aria-label="Facebook">🦖 Facebook</a></li>
            <li><a href="#" aria-label="Twitter">🦕 Twitter</a></li>
            <li><a href="#" aria-label="Instagram">🦴 Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Dinosaur. All rights reserved.
      </div>
    </footer>
  );
}
