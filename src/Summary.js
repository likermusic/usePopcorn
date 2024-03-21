import React from "react";

function Summary({ amount, avgImdbRating, avgPersonalRating, avgDuration }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{isNaN(amount) ? 0 : amount} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{isNaN(avgImdbRating) ? 0 : avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{isNaN(avgPersonalRating) ? 0 : avgPersonalRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{isNaN(avgDuration) ? 0 : avgDuration} min</span>
        </p>
      </div>
    </div>
  );
}

export default Summary;
