import React, { useState } from "react";
import Movie from "./Movie";

function ListMovies({ movies, onSetActiveMovie }) {
  const [active, setActive] = useState();

  function handleSetActive(imdbID) {
    setActive(imdbID);
    onSetActiveMovie(imdbID);
  }
  return (
    <ul className="list list-movies">
      {movies.length > 0 &&
        movies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            setActive={handleSetActive}
            active={active}
          />
        ))}
    </ul>
  );
}

export default ListMovies;
