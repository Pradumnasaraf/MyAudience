import { formatNumber } from '../utils/helpers';

export default function PlatformTile({ platform, followers = 0, onChange }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) onChange(platform.name, value);
  };

  return (
    <div className={`tile ${platform.className}`}>
      <div className="tile-icon" style={{ color: platform.color }}>
        <i className={platform.icon} aria-hidden="true" />
      </div>
      <div className="tile-label">{platform.name}</div>
      <input
        type="number"
        value={followers || ''}
        onChange={handleChange}
        className="tile-input"
        placeholder="0"
        aria-label={`${platform.name} followers count`}
        min="0"
      />
      <div className="follower-count" aria-live="polite">
        {formatNumber(followers)} followers
      </div>
    </div>
  );
} 