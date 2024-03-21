import React, { useState } from "react";

function Search({ onChangeQuery }) {
  const [value, setValue] = useState("");

  function handleChangeValue(e) {
    setValue(e.target.value);
    onChangeQuery(e.target.value);
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      onChange={handleChangeValue}
      value={value}
    />
  );
}

export default Search;
