import React, { useState } from "react";

const Search = () => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const q = e.target.value;
    setText(q);
  };
  return (
    <form action={`?search=${text}`}>
      <input
        type="search"
        id="q"
        name="search"
        onChange={(e) => handleChange(e)}
      />
    </form>
  );
};

export default Search;
