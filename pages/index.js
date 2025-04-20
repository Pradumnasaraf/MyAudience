import { useState, useEffect } from 'react';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import PlatformTile from '../components/PlatformTile';
import { PLATFORMS, INITIAL_FOLLOWERS, STORAGE_KEYS, CHART_OPTIONS, META_TAGS } from '../utils/constants';
import { formatNumber, calculateTotalFollowers, loadFromLocalStorage, saveToLocalStorage, downloadImage } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [platformFollowers, setPlatformFollowers] = useState(INITIAL_FOLLOWERS);
  const [history, setHistory] = useState([]);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    try {
      const savedFollowers = loadFromLocalStorage(STORAGE_KEYS.FOLLOWERS);
      const savedHistory = loadFromLocalStorage(STORAGE_KEYS.HISTORY);
      const savedLastUpdated = loadFromLocalStorage(STORAGE_KEYS.LAST_UPDATED);

      // Only update state if we have saved data
      if (savedFollowers && Object.keys(savedFollowers).length > 0) {
        setPlatformFollowers(savedFollowers);
      }
      if (savedHistory && savedHistory.length > 0) {
        setHistory(savedHistory);
      }
      if (savedLastUpdated) {
        setLastUpdated(savedLastUpdated);
      }
    } catch (err) {
      setError('Failed to load saved data');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Don't save if we're using the initial state
    if (platformFollowers === INITIAL_FOLLOWERS) {
      return;
    }

    try {
      const now = new Date().toISOString();
      saveToLocalStorage(STORAGE_KEYS.FOLLOWERS, platformFollowers);
      saveToLocalStorage(STORAGE_KEYS.LAST_UPDATED, now);
      setLastUpdated(now);
      
      // Update history monthly
      const today = new Date();
      const lastEntry = history[history.length - 1];
      const totalFollowers = calculateTotalFollowers(platformFollowers);
      
      if (!lastEntry || new Date(lastEntry.date).getMonth() !== today.getMonth()) {
        const newHistory = [...history, { date: today.toISOString(), total: totalFollowers }];
        setHistory(newHistory);
        saveToLocalStorage(STORAGE_KEYS.HISTORY, newHistory);
      }
    } catch (err) {
      setError('Failed to save data');
      console.error('Error saving data:', err);
    }
  }, [platformFollowers, history]);

  const handleInputChange = (platform, value) => {
    if (value < 0) return;
    setPlatformFollowers(prev => ({ ...prev, [platform]: value }));
  };

  const handleDownload = async () => {
    try {
      await downloadImage('snapshot-area', downloadFormat);
    } catch (err) {
      setError('Failed to download snapshot');
      console.error('Error downloading snapshot:', err);
    }
  };

  const clearData = () => {
    setPlatformFollowers(INITIAL_FOLLOWERS);
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.FOLLOWERS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    setLastUpdated(null);
  };

  const totalFollowers = calculateTotalFollowers(platformFollowers);

  const chartData = {
    labels: history.map(entry => new Date(entry.date).toLocaleDateString()),
    datasets: [{
      label: 'Total Audience',
      data: history.map(entry => entry.total),
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F620',
      tension: 0.4,
      fill: true
    }]
  };

  return (
    <>
      <Head>
        <title>{META_TAGS.title}</title>
        <meta name="description" content={META_TAGS.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TAGS.title} />
        <meta property="og:description" content={META_TAGS.description} />
        <meta property="og:image" content={META_TAGS.ogImage} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TAGS.title} />
        <meta name="twitter:description" content={META_TAGS.description} />
        <meta name="twitter:image" content={META_TAGS.ogImage} />
      </Head>

      <div className="app-container">
        {error && (
          <div className="error-message" role="alert">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="error-close"
              aria-label="Close error message"
            >
              <i className="fa-solid fa-times" aria-hidden="true" />
            </button>
          </div>
        )}
        
        {isLoading ? (
          <div className="loading-spinner" role="status">
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            <span>Loading...</span>
          </div>
        ) : (
          <div id="snapshot-area" className="container">
            <h1>Audience Calculator</h1>
            
            {lastUpdated && (
              <div className="last-updated">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </div>
            )}

            <div className="tiles-container">
              {PLATFORMS.map(platform => (
                <PlatformTile
                  key={platform.name}
                  platform={platform}
                  followers={platformFollowers[platform.name]}
                  onChange={handleInputChange}
                />
              ))}
            </div>

            <div className="total-audience" role="region" aria-label="Total audience count">
              <h2>Total Audience</h2>
              <div className="total-count">
                {formatNumber(totalFollowers)}
              </div>
            </div>

            {history.length > 1 && (
              <div className="chart-container" role="region" aria-label="Growth over time chart">
                <h2>Growth Over Time</h2>
                <Line data={chartData} options={CHART_OPTIONS} />
              </div>
            )}

            <div className="action-buttons">
              <div className="download-options">
                <select 
                  value={downloadFormat} 
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="format-select"
                  aria-label="Select download format"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                </select>
                <button 
                  className="action-button" 
                  onClick={handleDownload}
                  aria-label="Download snapshot"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" /> Download
                </button>
              </div>
              <button 
                className="action-button clear-button" 
                onClick={clearData}
                aria-label="Clear all data"
              >
                <i className="fa-solid fa-trash" aria-hidden="true" /> Clear Data
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}