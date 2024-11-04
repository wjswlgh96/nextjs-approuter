"use client";
import { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("on Submit!!");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={search} onChange={onChangeSearch} />
        <button>검색</button>
      </form>
    </div>
  );
}
