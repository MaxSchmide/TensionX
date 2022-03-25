import React, { useState } from "react";
import Header from "./Header";
import Filter from "./Filter";
import Headline1 from "./Headline/Headline-one";
import Headline2 from "./Headline/Headline-two";
import TableForm from "./TableForm";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isSelectedCounter, setisSelectedCounter] = useState(0);
  const [isArchivated, setIsArchivated] = useState(false);
  const countSelectedStudents = (num) => {
    setisSelectedCounter(num);
  };
  const searching = (terms) => {
    setSearchTerm(terms);
  };
  const handleArchive = () => {
    console.log("Main", isArchivated);
    setIsArchivated(!isArchivated);
  };
  return (
    <>
      <Header />
      <Filter />
      {!isSelectedCounter ? (
        <Headline1 search={searching} />
      ) : (
        <Headline2 archive={handleArchive} students={isSelectedCounter} />
      )}

      <TableForm
        archive={isArchivated}
        count={countSelectedStudents}
        searchTerms={searchTerm}
      />
    </>
  );
}
