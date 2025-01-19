import { useEffect, useRef, useState } from "react";
import "./App.css";
import Main from "./Main";
import Navbar from "./Navbar";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import Error from "./Error";
import ListMovies from "./ListMovies";
import Details from "./Details";
import Summary from "./Summary";
import ListWatched from "./ListWatched";

// const KEY = "f84fc31d";
const KEY = "b1212e3a";

function App() {
  // const [activeMovie, setActiveMovie] = useState("");
  const [movieDescription, setMovieDescription] = useState(null);
  const [movies, setMovies] = useState([]);
  // const [movies, setMovies] = useState([
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt0133093",
  //     Title: "The Matrix",
  //     Year: "1999",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt6751668",
  //     Title: "Parasite",
  //     Year: "2019",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  //   },
  // ]);
  const [errorMovies, setError] = useState(null);
  const [errorMovie, setErrorMovie] = useState(null);
  const [loadingMovies, setLoading] = useState(false);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [watched, setWatched] = useState([]);

  const controllerRef = useRef();
  // console.log(watched);
  function handleGetMovies(query) {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Прерываем предыдущий запрос, если он есть
    }
    controllerRef.current = new AbortController();
    setError(null);
    setMovies([]);
    setLoading(true);
    if (!query) {
      setLoading(false);
      return;
    }
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
      signal: controllerRef.current.signal,
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("Response error 😑");
        return resp.json();
      })
      .then((res) => {
        if (res.Response !== "True")
          throw new Error("Could not find movies 😑");
        setMovies(res.Search);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          const error = err?.message || "Movie not found";
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }

  function handleGetMovieDescription(imdbID) {
    setErrorMovie(null);
    setLoadingMovie(true);
    setMovieDescription(null);
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`)
      .then((resp) => {
        if (!resp.ok) throw new Error("Response error 😑");
        return resp.json();
      })
      .then((res) => {
        if (res.Response !== "True") throw new Error("Could not get movie 😑");
        // Проверяем есть ли пост который делаем активным среди Просмотренных
        const personalRating = watched?.find(
          (el) => el.imdbID === imdbID
        )?.personalRating;

        res = personalRating ? { ...res, personalRating } : res;
        setMovieDescription(res);
      })
      .catch((err) => {
        const error = err?.message || "Can not get movie";
        setErrorMovie(error);
      })
      .finally(() => setLoadingMovie(false));
  }

  function avg(type) {
    const res =
      watched.reduce((acc, el) => {
        if (type === "Runtime") {
          const dur = Number(el[type].split(" ")[0]);
          if (!isNaN(dur)) return acc + dur;
          else return acc + 0;
        } else {
          return acc + (isNaN(Number(el[type])) ? 0 : Number(el[type]));
        }
      }, 0) / watched.length;
    return res;
  }

  // let a = "48 min";
  // console.log(a.split(" ")[0]);
  return (
    <>
      <Navbar>
        <Logo />
        <Search onChangeQuery={handleGetMovies} />
        <NumResults count={movies.length} />
      </Navbar>
      <Main>
        <Box>
          {loadingMovies && <p className="loader">Loading...</p>}
          {errorMovies && <Error error={errorMovies} />}
          <ListMovies
            movies={movies}
            onSetActiveMovie={handleGetMovieDescription}
          />
        </Box>

        <Box>
          {loadingMovie && <p className="loader">Loading...</p>}
          {!movieDescription ? (
            <>
              <Summary
                amount={watched.length}
                avgImdbRating={avg("imdbRating").toFixed(2)}
                avgPersonalRating={avg("personalRating").toFixed(2)}
                avgDuration={avg("Runtime")}
              />
              <ListWatched watched={watched} />
            </>
          ) : errorMovie ? (
            <Error error={errorMovie} />
          ) : (
            <Details
              movieDescription={movieDescription}
              setMovieDescription={setMovieDescription}
              setWatched={setWatched}
            />
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
