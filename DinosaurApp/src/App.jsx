import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dinosaurs from './pages/Dinosaurs';
import Merch from './pages/Merch';
import Contact from './pages/Contact';
import Museum from './pages/Museum';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dinosaurs" element={<Dinosaurs />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/museum" element={<Museum />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
