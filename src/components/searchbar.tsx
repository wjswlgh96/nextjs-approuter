"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!search || q === search) return;
    e.preventDefault();
    router.push(`/search?q=${search}`);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </form>
  );
}
