import { useState } from 'react';

const FollowerForm = ({ platforms, setPlatformFollowers }) => {
  const [followers, setFollowers] = useState({});

  const handleChange = (platform, count) => {
    const updatedFollowers = { ...followers, [platform]: count };
    setFollowers(updatedFollowers);
    setPlatformFollowers(updatedFollowers);
  };

  return (
    <div className="form-container">
      {platforms.map(platform => (
        <div key={platform} className="form-group">
          <label htmlFor={platform}>{platform} Followers:</label>
          <input
            type="number"
            id={platform}
            value={followers[platform] || ''}
            onChange={e => handleChange(platform, parseInt(e.target.value) || 0)}
          />
        </div>
      ))}
    </div>
  );
};

export default FollowerForm;