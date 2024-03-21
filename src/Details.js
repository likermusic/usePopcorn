import React, { useEffect, useState } from "react";
import DetailsHeader from "./DetailsHeader";
import DetailsOverview from "./DetailsOverview";
import StarRaiting from "./StarRaiting";
import RatedText from "./RatedText";
import Error from "./Error";

// const KEY = "f84fc31d";
const KEY = "b1212e3a";

function Details({
  movieDescription,
  setMovieDescription,
  // isWatched,
  // setIsWathed,
  // rating,
  setWatched,
}) {
  const [personalRating, setPersonalRating] = useState(0);
  const [isWatched, setIsWatched] = useState(() => {
    if ("personalRating" in movieDescription) return true;
    else return false;
  });

  // console.log(movieDescription);
  function handleAddInWatched() {
    setWatched((prev) => [...prev, { ...movieDescription, personalRating }]);
    setIsWatched(true);
  }
  return (
    <div className="details">
      <DetailsHeader
        movieDescription={movieDescription}
        setMovieDescription={setMovieDescription}
      />
      {/* <p>{avgRating}</p> */}
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRaiting onSetRating={setPersonalRating} />
              {personalRating > 0 && (
                <button className="btn-add" onClick={handleAddInWatched}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <RatedText
              rating={personalRating || movieDescription.personalRating}
            />
          )}
        </div>
        <DetailsOverview movieDescription={movieDescription} />
      </section>
    </div>
  );
}

export default Details;
