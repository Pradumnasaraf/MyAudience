const TotalAudience = ({ platformFollowers }) => {
    const total = Object.values(platformFollowers).reduce((acc, count) => acc + count, 0);
  
    return (
      <div className="total-audience">
        <h2>Total Audience Count</h2>
        <div className="total-count">{total}</div>
      </div>
    );
  };
  
  export default TotalAudience;