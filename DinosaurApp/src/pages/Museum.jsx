import React, { useState } from 'react';
import 'aframe';

export default function Museum() {
  const [userInches, setUserInches] = useState('');
  const [cameraHeight, setCameraHeight] = useState(null);


  const handleHeightSubmit = (e) => {
    e.preventDefault();
    const inches = parseFloat(userInches);
    if (!isNaN(inches) && inches > 0) {
      setCameraHeight(inches * 0.0254); 
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className="page-title">(Very) Mini Dinosaur Museum</h1>

      {cameraHeight === null ? (
        <div
          style={{
            width: '100%',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.05)'
          }}
        >
          <form onSubmit={handleHeightSubmit} style={{ textAlign: 'center' }}>
            <label htmlFor="heightInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Enter your height (in inches):
            </label>
            <input
              id="heightInput"
              type="number"
              min="24"
              max="96"
              step="0.1"
              value={userInches}
              onChange={(e) => setUserInches(e.target.value)}
              style={{
                padding: '0.5rem',
                width: '120px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginRight: '0.5rem'
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                background: '#72cc72',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Compare!
            </button>
          </form>
        </div>
      ) : (
        // Once we have cameraHeight, render the A‑Frame scene
        <div style={{ width: '100%', height: '600px' }}>
          <a-scene embedded>
            <a-sky color="#ceeaed"></a-sky>
            <a-entity light="type: ambient; intensity: 0.5"></a-entity>
            <a-entity light="type: directional; intensity: 0.8" position="-1 1 0"></a-entity>
            <a-plane rotation="-90 0 0" width="100" height="100" color="#72cc72"></a-plane>

            {/* Camera height is set to the user's height in meters */}
            <a-entity
              camera
              wasd-controls
              look-controls
              position={`0 ${cameraHeight} 5`}
            ></a-entity>

            {/* Dinosaur models at fixed heights */}
            <a-entity
              gltf-model="/3dModels/stegosaurus.glb"
              position="-10 0 8"
              scale="1 1 1"
              rotation="0 50 0"
            ></a-entity>

            <a-entity
              gltf-model="/3dModels/tyrannosaurus.glb"
              position="-9 2.5 -15"
              scale="23 23 23"
              rotation="0 20 0"
            ></a-entity>

            <a-entity
              gltf-model="/3dModels/branchiosaurus.glb"
              position="10 0 1"
              scale="0.7 0.7 0.7"
              rotation="0 30 0"
            ></a-entity>
          </a-scene>
        </div>
      )}
    </div>
  );
}
