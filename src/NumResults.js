import React from "react";

function NumResults({ count }) {
  return (
    <p className="num-results">
      Found <strong>{count}</strong> results
    </p>
  );
}

export default NumResults;
