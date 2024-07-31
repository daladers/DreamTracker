import React from "react";
import useStats from "../hooks/useStats";


const Stats = ({ startDate, endDate, userId }) => { 
  const { stats, loading, error } = useStats(startDate, endDate, userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const renderReactions = (reactions) => {
    return (
      <ul>
        {Object.entries(reactions).map(([reaction, count]) => (
          <li key={reaction}>
            {reaction.charAt(0).toUpperCase() + reaction.slice(1)}: {count}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>Statistics</h3>
      {stats ? (
        <div>
          <p>Total Notes: {stats.totalNotes}</p>
          <div>
            <h4>Reactions Count:</h4>
            {renderReactions(stats.reactionCounts)}
          </div>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Stats;
