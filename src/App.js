import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      const coins = ['bitcoin', 'ethereum', 'dogecoin','monero', 'ripple', 'cardano', 'solana', 'polkadot'];
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);
      const data = await response.json();
      const pricesArray = [];
      for (const coin of coins) {
        const price = data[coin].usd;
        pricesArray.push({ coin, price });
      }
      setPrices(pricesArray);
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div className="prices">
      <div className="card-container">
        {prices.map((crypto, index) => (
          <div className="card" key={index}>
            <h2>{crypto.coin}</h2>
            <p>${crypto.price}</p>
          </div>
        ))}
      </div>
      <div className='footer'>
        <p>Her sayfa yenilendiğinde fiyatlar güncellenecektir.</p>
      </div>
    </div>
    
  );
}

export default App;