import React from "react";

function DetailsOverview({ movieDescription }) {
  return (
    <div className="details-overview">
      <p>
        <em>{movieDescription.Plot}</em>
      </p>
      <p>Starring actors: {movieDescription.Actors}</p>
      <p>Directed by: {movieDescription.Director}</p>
    </div>
  );
}

export default DetailsOverview;
