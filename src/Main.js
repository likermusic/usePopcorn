import React from "react";
import Box from "./Box";
import ListMovies from "./ListMovies";
import Error from "./Error";
import Details from "./Details";
import Summary from "./Summary";
import ListWatched from "./ListWatched";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default Main;
