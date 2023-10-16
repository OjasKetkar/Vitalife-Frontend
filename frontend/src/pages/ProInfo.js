import React, { useState, useEffect } from "react";
import data from '../utils/herbs.json';
import '../styles/proinfo.css';

const ProInfo = () => {
  const [activeTab, setActiveTab] = useState(1); // Start with the first tab active

  useEffect(() => {
    const tabsLinks = document.querySelectorAll('.tabs-controls__link');
    const cards = document.querySelectorAll('.card');

    tabsLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const currentId = parseInt(this.getAttribute('data-id'), 10);

        tabsLinks.forEach(function(tabLink) {
          tabLink.classList.remove('tabs-controls__link--active');
        });
        this.classList.add('tabs-controls__link--active');

        cards.forEach(function(card) {
          const cardId = parseInt(card.id, 10);
          if (cardId === currentId) {
            card.classList.add('card--current');
            card.classList.remove('hidden');
          } else {
            card.classList.remove('card--current');
            card.classList.add('hidden');
          }
        });
      });
    });
  }, []);

  

  return (
    <section className="page">
      <section className="cards-container">
        {data.herbs.map((herb) => (
          <div key={herb.id} id={herb.id} className={`card ${activeTab === herb.id ? 'card--current' : 'hidden'}`} style={{ backgroundImage: `url(https://res.cloudinary.com/dfot3xc1n/image/upload/v1697124258/vitalife_images/${herb.id}.jpg)` }}>
            <h1 className="herb-header">{herb.name}</h1>
            <p className="herb-content">{herb.description}</p>
          </div>
        ))}
      </section>
      <section>
        <div className="tabs-container">
          <ul className="tabs-controls">
            {data.herbs.map((herb) => (
              <a
                href="#"
                className={`tabs-controls__link ${activeTab === herb.id ? 'tabs-controls__link--active' : ''}`}
                data-id={herb.id}
                key={herb.id}
              >
                {herb.name}
              </a>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default ProInfo;
