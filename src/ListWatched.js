import React from "react";
import Watched from "./Watched";

function ListWatched({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default ListWatched;
