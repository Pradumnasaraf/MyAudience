import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  const [platformFollowers, setPlatformFollowers] = useState({
    YouTube: 0,
    GitHub: 0,
    Twitter: 0,
    LinkedIn: 0,
    'Dev.to': 0,
    Hashnode: 0
  });

  const platforms = [
    { name: 'YouTube', icon: 'fab fa-youtube' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Twitter', icon: 'fab fa-twitter' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin' },
    { name: 'Dev.to', icon: 'fab fa-dev' },
    { name: 'Hashnode', icon: 'fas fa-pencil-alt' } // Pencil icon for Hashnode
  ];

  const handleInputChange = (platform, value) => {
    const updatedFollowers = { ...platformFollowers, [platform]: value };
    setPlatformFollowers(updatedFollowers);
  };

  const formatNumber = (num) => {
    return num > 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
  };

  const totalFollowers = Object.values(platformFollowers).reduce((acc, count) => acc + count, 0);

  return (
    <div className="container">
      <h1>Audience Calculator</h1>
      
      <div className="tiles-container">
        {platforms.map(platform => (
          <div key={platform.name} className="tile">
            <i className={`${platform.icon} tile-icon`} />
            <div className="tile-label">{platform.name}</div>
            <input
              type="number"
              value={platformFollowers[platform.name] || ''}
              onChange={e => handleInputChange(platform.name, parseInt(e.target.value) || 0)}
              className="tile-input"
              placeholder="0"
            />
          </div>
        ))}
      </div>

      <div className="total-audience">
        <h2>Total Audience Count</h2>
        <div className="total-count">
          {formatNumber(totalFollowers)}
        </div>
      </div>
    </div>
  );
}