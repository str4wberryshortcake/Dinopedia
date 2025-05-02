import React, { useState } from 'react';
import { evolutionaryHistory, dinosaurs } from '../data';
import './Dinosaurs.css';

const SCIENTISTS = [
  {
    name: "Mary Anning",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Mary_Anning_painting.jpg",
    facts: [
      "Pioneering English fossil collector and paleontologist.",
      "Discovered the first correctly identified ichthyosaur skeleton at age 12.",
      "Her discoveries contributed to important changes in scientific thinking about prehistoric life and the history of the Earth."
    ]
  },
  {
    name: "Richard Owen",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Richard_Owen_original.jpg",
    facts: [
      "Coined the term 'Dinosauria' in 1842.",
      "British biologist, comparative anatomist and paleontologist.",
      "Instrumental in establishing the Natural History Museum, London."
    ]
  },
  {
    name: "Jack Horner",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT_xket4_BoiyK9OrCot8lVIHkNF5_AjsJuKyVLcJuJCA6ZTuIUYAhNlyDna1jSsxSQpW_pXdm1TYdhrhyZV_pNYw",
    facts: [
      "American paleontologist known for his research on dinosaur growth and behavior.",
      "Technical adviser for the 'Jurassic Park' films.",
      "Discovered the first dinosaur eggs in the Western Hemisphere."
    ]
  },
  {
    name: "Yeh Hsiang-kʼuei (Yang Zhongjian)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Yang_Zhongjian_1922.jpg",
    facts: [
      "Known as the 'Father of Chinese Vertebrate Paleontology.'",
      "Described several important Chinese dinosaur species.",
      "Instrumental in the development of paleontology in China."
    ]
  },
  {
    name: "Barnum Brown",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/BarnumBrown_Student.jpg",
    facts: [
      "Discovered the first partial skeleton of Tyrannosaurus rex.",
      "American fossil hunter and paleontologist.",
      "Known for extensive dinosaur excavations across North America."
    ]
  },
  {
    name: "Othniel Charles Marsh",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Othniel_Charles_Marsh_-_Brady-Handy.jpg",
    facts: [
      "One of the leading figures in the Bone Wars.",
      "Discovered and named dozens of dinosaur species.",
      "First professor of paleontology in the United States."
    ]
  },
  {
    name: "Edward Drinker Cope",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cope_Edward_Drinker_1840-1897.jpg/250px-Cope_Edward_Drinker_1840-1897.jpg",
    facts: [
      "Rival of Othniel Charles Marsh in the Bone Wars.",
      "Discovered over a thousand fossil species.",
      "Made significant contributions to the study of vertebrate paleontology."
    ]
  },
  {
    name: "Paul Sereno",
    image: "https://images.nationalgeographic.org/image/upload/v1691184110/EducationHub/photos/paul-sereno-2.jpg",
    facts: [
      "Modern paleontologist known for numerous dinosaur discoveries in Africa and Asia.",
      "Founded Project Exploration to encourage kids in science.",
      "Discovered several new dinosaur genera."
    ]
  },
  {
    name: "Peter Dodson",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSegq3ZrAzXQsl41zpuX7x2-SQ5GCpu4CbA_Si5B5pbsK1SAN4aA2Nco2iZuVkmYA58qb2heJLtSas8GDpj5XSyPzMhkE4qttYH2CJ6lzw",
    facts: [
      "Expert on dinosaur eggs and nesting behaviors.",
      "Professor of vertebrate paleontology.",
      "Worked extensively on ceratopsian dinosaurs."
    ]
  },
  {
    name: "Zofia Kielan-Jaworowska",
    image: "https://researchinpoland.org/wp-content/uploads/2024/12/65KIELAN_JAWOROWSKA-768x432-1.jpg",
    facts: [
      "Pioneering Polish paleontologist.",
      "Led expeditions to the Gobi Desert uncovering important vertebrate fossils.",
      "Contributed to the understanding of mammal-like reptiles."
    ]
  }
];


const ScientistCard = ({ scientist, expanded, onClick }) => (
  <div className="flip-card" onClick={onClick} tabIndex={0} onKeyPress={e => e.key==='Enter' && onClick()}>
    <div className={`flip-inner ${expanded ? 'flipped' : ''}`}>      
      <div className="flip-front">
        <img src={scientist.image} alt={scientist.name} className="scientist-img" />
        <h4 className="scientist-name">{scientist.name}</h4>
      </div>
      <div className="flip-back">
        <h4>{scientist.name}</h4>
        <ul className="scientist-facts">
          {scientist.facts.map((fact, i) => <li key={i}>{fact}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

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

  const [expandedScientist, setExpandedScientist] = useState(null);

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

      {/* New Paleontologists Section */}
      <div className="parallax">
         <h1 className="page-title">Famous Paleontologists</h1>
        <div className="scientist-list">
          {SCIENTISTS.map((s, idx) => (
            <ScientistCard
              key={idx}
              scientist={s}
              expanded={expandedScientist===idx}
              onClick={() => setExpandedScientist(expandedScientist===idx?null:idx)}
            />
          ))}
        </div>
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
