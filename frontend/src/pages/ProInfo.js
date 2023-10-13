import React, { useState } from "react";
import data from '../utils/herbs.json'
import '../styles/proinfo.css';

const ProInfo = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="popup">
      <div className="fixed-pane">
        <div className="tabs" style={{ overflow: 'scroll', direction: 'rtl' }}>
          {data.herbs.map((herb) => (
            <label
              key={herb.id}
              className={`tab-label ${activeTab === herb.id ? 'active' : ''}`}
              onClick={() => setActiveTab(herb.id)}
            >
              {herb.name}
            </label>
          ))}
        </div>
      </div>

      <div className="tab-content">
        {data.herbs.map((herb) => (
          <div
            key={herb.id}
            className={`herb-content ${activeTab === herb.id ? 'active' : ''}`}
          >
            <div className="herb-content-container">
              <div className="info-image-container">
                <img src={`https://res.cloudinary.com/dfot3xc1n/image/upload/v1694578703/vitalife_images/${herb.id}`} alt="image" className="info-image" />
              </div>
              <div className="herb-description">
                {herb.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProInfo;
