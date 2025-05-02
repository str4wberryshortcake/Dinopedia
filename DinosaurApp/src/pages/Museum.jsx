import React from 'react';
import 'aframe';

export default function Museum() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 className="page-title">Dinosaur Museum</h1>
      <div style={{ width: '100%', height: '600px' }}>
        <a-scene embedded>
          <a-entity light="type: ambient; intensity: 0.5"></a-entity>
          <a-entity light="type: directional; intensity: 0.8" position="-1 1 0"></a-entity>

          <a-plane rotation="-90 0 0" width="30" height="30" color="#ddd"></a-plane>

          <a-entity camera wasd-controls look-controls position="0 1.6 5"></a-entity>

          <a-box position="-4 0.75 -3" rotation="0 45 0" depth="1" height="1.5" width="1" color="#D9534F"></a-box>
          <a-text value="T-Rex" align="center" position="-4 0.1 -3" rotation="-90 0 0" color="#000"></a-text>

          <a-sphere position="-1 0.75 -3" radius="0.75" color="#5CB85C"></a-sphere>
          <a-text value="Stegosaurus" align="center" position="-1 0.1 -3" rotation="-90 0 0" color="#000"></a-text>

          <a-cylinder position="2 0.75 -3" radius="0.5" height="1.5" color="#5BC0DE"></a-cylinder>
          <a-text value="Triceratops" align="center" position="2 0.1 -3" rotation="-90 0 0" color="#000"></a-text>

          <a-box position="5 1.25 -3" rotation="0 30 0" depth="0.8" height="2.5" width="0.8" color="#F0AD4E"></a-box>
          <a-text value="Brachiosaurus" align="center" position="5 0.1 -3" rotation="-90 0 0" color="#000"></a-text>
        </a-scene>
      </div>
    </div>
  );
}
