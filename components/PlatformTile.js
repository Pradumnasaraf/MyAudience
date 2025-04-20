import { formatNumber } from '../utils/helpers';

export default function PlatformTile({ platform, followers, onChange }) {
  return (
    <div className={`tile ${platform.className}`}>
      <div className="tile-icon" style={{ color: platform.color }}>
        <i className={platform.icon} aria-hidden="true" />
      </div>
      <div className="tile-label">{platform.name}</div>
      <input
        type="number"
        value={followers || ''}
        onChange={(e) => onChange(platform.name, parseInt(e.target.value) || 0)}
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