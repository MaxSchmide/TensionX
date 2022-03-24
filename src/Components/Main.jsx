import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Headline1 from "./Headline/Headline-one";
import Headline2 from "./Headline/Headline-two";
import TableForm from "./TableForm";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [checkedCounter, setCheckedCounter] = useState(0);
  const countSelectedStudents = (num) => {
    setCheckedCounter(num);
  };
  const searching = (terms) => {
    setSearchTerm(terms);
  };

  return (
    <>
      <Header />
      <Filter />
      {!checkedCounter ? (
        <Headline1 search={searching} />
      ) : (
        <Headline2 students={checkedCounter} />
      )}

      <TableForm count={countSelectedStudents} searchTerms={searchTerm} />
    </>
  );
}
