import React, { useState } from "react";
import Star from "./Star";

function StarRaiting({ fillColor = "gold", border = "gold", onSetRating }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleMark(ind: number) {
    setRating(ind + 1);
    onSetRating(ind + 1);
  }
  function handleHover(ind: number) {
    setTempRating(ind + 1);
  }
  function handleClear() {
    setRating(0);
    setTempRating(0);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      ></div>
      {Array.from({ length: 10 }, (_, ind) => (
        <Star
          key={ind}
          s
          onMarked={() => handleMark(ind)}
          onHover={() => handleHover(ind)}
          onLeave={() => setTempRating(0)}
          rating={rating}
          tempRating={tempRating}
          ind={ind}
          fillColor={fillColor}
          border={border}
        />
      ))}
      <span
        style={{
          marginLeft: "5px",
          verticalAlign: "5px",
          color: "white",
        }}
      >
        {tempRating || rating}/10
      </span>
    </div>
  );
}

export default StarRaiting;
