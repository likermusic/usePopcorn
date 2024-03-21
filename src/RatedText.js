import React from "react";

function RatedText({ rating }) {
  return (
    <p>
      You rated with movie {rating} <span>⭐️</span>
    </p>
  );
}

export default RatedText;
