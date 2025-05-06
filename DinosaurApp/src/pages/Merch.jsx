import React, { useState } from 'react';
import '../App.css'; 
const merchItems = [
  { id: 1, name: 'T-Rex T-Shirt', description: 'Comfortable cotton tee with T-Rex print.', price: 19.99 },
  { id: 2, name: 'Stegosaurus Mug', description: 'Ceramic mug with Stegosaurus silhouette.', price: 12.50 },
  { id: 3, name: 'Triceratops Plush', description: 'Soft plush toy in Triceratops shape.', price: 24.00 },
];

const Merch = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    setCart(c => [...c, id]);
    alert(`Added item to cart! Cart now has ${cart.length + 1} items.`);
  };

  return (
    <div className="container">
      <h1 className="page-title">Dinosaur Merchandise</h1>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button className="filter-button">
          Cart ({cart.length})
        </button>
      </div>

      <div className="merch-container">
        {merchItems.map(item => (
          <div key={item.id} className="merch-item">
            <div style={{
              height: '150px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
              marginBottom: '10px'
            }}>
              <p>[{item.name} Image]</p>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="merch-price">${item.price.toFixed(2)}</p>
            <button
              className="buy-button"
              onClick={() => addToCart(item.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merch;
