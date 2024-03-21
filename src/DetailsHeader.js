import React from "react";

function DetailsHeader({ movieDescription, setMovieDescription }) {
  // console.log(movieDescription);
  return (
    <header>
      <button onClick={() => setMovieDescription(null)} className="btn-back">
        &larr;
      </button>
      <img src={movieDescription.Poster} />
      <div className="details-overview">
        <h2>{movieDescription.Title}</h2>
        <p>
          {movieDescription.Released} &bull; {movieDescription.Runtime}
        </p>
        <p>{movieDescription.Genre}</p>
        <p>
          <span>⭐️</span>
          {movieDescription.imdbRating} IMDb rating
        </p>
      </div>
    </header>
  );
}

export default DetailsHeader;
