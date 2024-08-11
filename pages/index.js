import { useState } from 'react';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import html2canvas from 'html2canvas';

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
    { name: 'YouTube', icon: 'fab fa-youtube', className: 'youtube' },
    { name: 'GitHub', icon: 'fab fa-github', className: 'github' },
    { name: 'Twitter', icon: 'fab fa-twitter', className: 'twitter' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', className: 'linkedin' },
    { name: 'Dev.to', icon: 'fab fa-dev', className: 'devto' },
    { name: 'Hashnode', icon: 'fas fa-pencil-alt', className: 'hashnode' }
  ];

  const handleInputChange = (platform, value) => {
    const updatedFollowers = { ...platformFollowers, [platform]: value };
    setPlatformFollowers(updatedFollowers);
  };

  const formatNumber = (num) => {
    return num > 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();
  };

  const totalFollowers = Object.values(platformFollowers).reduce((acc, count) => acc + count, 0);

  const downloadSnapshot = () => {
    html2canvas(document.body, {
      useCORS: true,
      backgroundColor: '#ffffff',
      scale: 2,
      logging: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'audience.png';
      link.click();
    });
  };

  return (
    <>
      <Head>
        <title>Audience Calculator</title>
        <meta name="description" content="Track and calculate your total social media audience." />
      </Head>
      <div className="container">
        <h1>Audience Calculator</h1>

        <div className="tiles-container">
          {platforms.map(platform => (
            <div key={platform.name} className={`tile ${platform.className}`}>
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

        <button className="download-button" onClick={downloadSnapshot}>
          <i className="fas fa-download"></i>
        </button>
      </div>
    </>
  );
}