import React, { useState } from 'react';
import { evolutionaryHistory, dinosaurs } from '../data';
import './Dinosaurs.css';

const Dinosaurs = () => {
  const row1 = evolutionaryHistory.slice(0, 3);
  const row2 = evolutionaryHistory.slice(3);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [filterSubgroup, setFilterSubgroup] = useState('');
  const [filterClade, setFilterClade] = useState('');

  const uniqueGroups = Array.from(new Set(dinosaurs.map(dino => dino.group)));
  const uniqueSubgroups = Array.from(new Set(dinosaurs.map(dino => dino.subgroup)));
  const uniqueClades = Array.from(new Set(dinosaurs.map(dino => dino.clade)));

  const filteredDinosaurs = dinosaurs.filter(dino =>
    dino.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterGroup ? dino.group === filterGroup : true) &&
    (filterSubgroup ? dino.subgroup === filterSubgroup : true) &&
    (filterClade ? dino.clade === filterClade : true)
  );

  const resetFilters = () => {
    setSearchTerm('');
    setFilterGroup('');
    setFilterSubgroup('');
    setFilterClade('');
  };

  return (
    <div className="container">
      <h1 className="page-title">Evolutionary History of Dinosaurs</h1>

      <div className="evolution-row">
        {row1.map((item,i) => (
          <div className="evolution-card-box" key={i}>
            <div className="evolution-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            {i < row1.length-1 && <div className="arrow arrow-right" />}
          </div>
        ))}
      </div>
      <div className="arrow arrow-down-center" />
      <div className="evolution-row">
        {row2.map((item,i) => (
          <div className="evolution-card-box" key={i}>
            <div className="evolution-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            {i < row2.length-1 && <div className="arrow arrow-right" />}
          </div>
        ))}
      </div>

      <h1 className="page-title">Dinosaurs</h1>

      <div className="filter-container">
        <div className="filter-left">
          <input
            type="text"
            placeholder="Search Dinosaurs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search"
          />
          <select
            value={filterGroup}
            onChange={e => setFilterGroup(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Groups</option>
            {uniqueGroups.map((g, i) => <option key={i} value={g}>{g}</option>)}
          </select>
          <select
            value={filterSubgroup}
            onChange={e => setFilterSubgroup(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Subgroups</option>
            {uniqueSubgroups.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          <select
            value={filterClade}
            onChange={e => setFilterClade(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Clades</option>
            {uniqueClades.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="filter-right">
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="dino-list">
        {filteredDinosaurs.map((dino,i) => (
          <div key={i} className="dino-card">
            <div className="dino-card-image">
              {dino.dinoIMG
                ? <img src={dino.dinoIMG} alt={dino.name} />
                : <div className="placeholder">Image not available</div>}
            </div>
            <div className="dino-card-info">
              <h2>{dino.name}</h2>
              <p><strong>Time:</strong> {dino.yearsAgo}</p>
              <p><strong>Group:</strong> {dino.group}</p>
              <p><strong>Clade:</strong> {dino.clade}</p>
              <p><strong>Subgroup:</strong> {dino.subgroup}</p>
              <p><strong>Description:</strong> {dino.description}</p>
              <p><strong>Region:</strong> {dino.region}</p>
              <p><strong>Fun Facts:</strong> {dino.funFacts}</p>
              <p><strong>Height:</strong> {dino.height}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dinosaurs;
