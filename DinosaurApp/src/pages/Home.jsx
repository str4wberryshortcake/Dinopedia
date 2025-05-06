import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './Home.css';
import { quizQuestions as questions, dinoMap, dinoProfiles } from '../data';
import { axisDefinitions } from '../data';

const events = [
  { time: -230, label: 'Origins in the Triassic', image: 'https://cdn.mos.cms.futurecdn.net/LPGNWGdE82Vc3j6ucxfxSS.jpg' },
  { time: -201, label: 'Jurassic Period', image: 'https://www.nhm.ac.uk/content/dam/nhm-www/discover/jurassic-period/three-allosaurus-in-forest-palaeoart-full-width.jpg.thumb.1160.1160.png' },
  { time: -145, label: 'Jurassic Flourishing', image: 'https://www.q-files.com/media/article/1060/fd2c00f2-0c98-4bb9-b20d-c35e36299fb6.jpg' },
  { time: -100, label: 'Cretaceous Period', image: 'https://i.natgeofe.com/n/9c56eafe-8285-4eef-b0d4-e12473098742/907.jpg' },
  { time: -66, label: 'Mass Extinction', image: 'https://catalyst.dmns.org/media/1814673/trex_denver15_2_downsizedjpg.jpg' },
];

const funFacts = [
  "The word 'dinosaur' means 'terrible lizard' in Greek.",
  "Dinosaurs lived on all continents, including Antarctica.",
  "The smallest dinosaur was about the size of a chicken.",
  "The largest dinosaur, Argentinosaurus, could weigh up to 100 tons.",
  "Birds are the only living descendants of dinosaurs.",
  "The longest dinosaur name is Micropachycephalosaurus.",
  "Nyasasaurus may be the earliest known dinosaur, dating to the late Anisian stage, about 243 million years ago."
];

export default function Home() {
  const [position, setPosition] = useState(-252);
  const [showFunFact, setShowFunFact] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showAllTypes, setShowAllTypes] = useState(false);

  // Timeline D3 setup
  useEffect(() => {
    const svgEl = document.querySelector('.timeline-svg');
    const width = svgEl.clientWidth;
    const height = svgEl.clientHeight;
    const svg = d3.select(svgEl);
    svg.selectAll('*').remove();

    const scale = d3.scaleLinear().domain([-252, -66]).range([50, width - 50]);
    svg.append('g')
      .attr('transform', `translate(0, ${height / 2})`)
      .call(d3.axisBottom(scale).ticks(6).tickFormat(d => `${Math.abs(d)} Myr`))
      .selectAll('text')
      .attr('fill', 'var(--color-text)');

    const handle = svg.append('circle')
      .attr('cx', scale(-252))
      .attr('cy', height / 2)
      .attr('r', 12)
      .attr('fill', 'var(--color-accent)')
      .style('cursor', 'pointer');

    handle.call(
      d3.drag().on('drag', evt => {
        const x = Math.max(50, Math.min(width - 50, evt.x));
        handle.attr('cx', x);
        setPosition(scale.invert(x));
      })
    );
  }, []);

  const toggleFunFact = () => setShowFunFact(s => !s);
  const nextFact = () => setFactIdx(i => (i + 1) % funFacts.length);

  const current = events.reduce((prev, ev) => (position >= ev.time ? ev : prev), events[0]);

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const tally = { diet: [], social: [], decision: [], motion: [] };
    questions.forEach(({ id, options }) => {
      const pick = answers[id];
      if (pick) {
        const { axis } = options.find(o => o.value === pick);
        tally[axis].push(pick);
      }
    });
    const code = ['diet', 'social', 'decision', 'motion']
      .map(axis => {
        const arr = tally[axis];
        return arr.length
          ? arr.sort((a, b) =>
            arr.filter(v => v === b).length - arr.filter(v => v === a).length
          )[0]
          : '';
      })
      .join('');
    setResult({ code, name: dinoMap[code] || 'Unknown' });
  };

  return (
    <main className="home-page">
      {/* Timeline Section */}
      <div
        className="timeline-fullscreen"
        style={{ backgroundImage: `url(${current.image})` }}
      >
        <svg className="timeline-svg"></svg>
        <div className="timeline-event-card" key={current.label}>
          <p className="timeline-label-text">{current.label}</p>
        </div>
      </div>

      {/* Fun Fact Widget */}
      <section className="funfact-widget">
        <h1>Welcome to DinoPedia!</h1>
        <p>Discover the fascinating world of dinosaurs: species, quiz, museum, and merch await.</p>
        <button className="funfact-toggle" onClick={toggleFunFact}>
          {showFunFact ? 'Hide Fun Fact' : 'Show Fun Fact'}
        </button>
        {showFunFact && (
          <div className="funfact-panel">
            <p><strong>Fun Fact:</strong> {funFacts[factIdx]}</p>
            <button className="funfact-next" onClick={nextFact}>Next Fact</button>
          </div>
        )}
      </section>

      {/* Explore Sections */}
      <div className="explore-container">
      <section className="explore-sections parallax">
        <h2>Explore Our Sections</h2>
        <div className="explore-cards">
          <div className="dino-card">
            <h3>Dinosaur Catalog</h3>
            <p>Browse our extensive collection of dinosaur species.</p>
            <a href="/dinosaurs" className="nav-link">Explore Dinosaurs</a>
          </div>
          <div className="dino-card">
            <h3>Dinosaur Media</h3>
            <p>Check out amazing dinosaur images and videos.</p>
            <a href="/media" className="nav-link">View Media</a>
          </div>
          <div className="dino-card">
            <h3>Dino Merch</h3>
            <p>Shop for cool dinosaur-themed merchandise.</p>
            <a href="/merch" className="nav-link">Shop Now</a>
          </div>
          <div className="dino-card">
            <h3>Contact Us</h3>
            <p>Have questions? We’d love to hear from you!</p>
            <a href="/contact" className="nav-link">Get in Touch</a>
          </div>
        </div>
      </section>
      </div>

      {/* Quiz Section */}
      <section className="dino-quiz-section">
        <h2>What Kind of Dinosaur Are You? Quiz</h2>

        {result ? (

          <div className="result">
            {(() => {
              const profile = dinoProfiles.find(p => p.code === result.code);
              return (
                <>
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="dino-result-img"
                  />
                  <h3>Your Dino Type: {profile.name} ({profile.code})</h3>
                  <p className="dino-description">{profile.description}</p>
                </>
              );
            })()}
            <button
              className="view-all-btn"
              onClick={() => setShowAllTypes(s => !s)}
            >
              {showAllTypes ? 'Hide all types' : 'See all Dino Types'}
            </button>

            {showAllTypes && (
              <ul className="all-dino-list">
                {dinoProfiles.map(p => (
                  <li key={p.code}>
                    <strong>{p.name} ({p.code}):</strong> {p.description}
                  </li>
                ))}
              </ul>
            )}

            <div className="axis-legend">
              {axisDefinitions.map((ax, i) => (
                <div key={i} className="axis-block">
                  <strong>{ax.axis}</strong><br />
                  <span className="letter">{ax.letter1}: </span> {ax.letter1Label} vs.
                  <span className="letter"> {ax.letter2}: </span> {ax.letter2Label} <br />
                  <em>{ax.description}</em>
                </div>
              ))}
            </div>

          </div>



        ) : (
          <form onSubmit={handleSubmit}>
            {questions.map(q => (
              <div key={q.id} className="question-block">
                <p>{q.id}. {q.text}</p>
                {q.options.map(opt => (
                  <label key={opt.value}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt.value}
                      onChange={() => handleChange(q.id, opt.value)}
                      required
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            ))}
          <button type="submit">Submit</button>
          </form>
        )}
      </section>
    </main>
  );
}
