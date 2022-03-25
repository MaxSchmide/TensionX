import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Headline1 from "./Headline/Headline-one";
import Headline2 from "./Headline/Headline-two";
import TableForm from "./TableForm";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isSelectedCounter, setisSelectedCounter] = useState(0);
  const countSelectedStudents = (num) => {
    setisSelectedCounter(num);
  };
  const searching = (terms) => {
    setSearchTerm(terms);
  };

  return (
    <>
      <Header />
      <Filter />
      {!isSelectedCounter ? (
        <Headline1 search={searching} />
      ) : (
        <Headline2 students={isSelectedCounter} />
      )}

      <TableForm count={countSelectedStudents} searchTerms={searchTerm} />
    </>
  );
}
