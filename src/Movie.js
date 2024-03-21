import React, { useState } from "react";

function Movie({ movie, setActive, active }) {
  return (
    <li
      onClick={() => setActive(movie.imdbID)}
      className={active === movie.imdbID ? "active" : ""}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movie;
