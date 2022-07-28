/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import name from "../Images/sort_by_alpha.png";
import sort from "../Images/sort_by_id.png";
import arrow_down from "../Images/user-vector.png";
import arrow_up from "../Images/arrow_up.png";
import edit from "../Images/edit-icon.png";
import promote from "../Images/promote-icon.png";
import TablePagination from "@mui/material/TablePagination";
import dataBase from "../../TensionX.json";
import Archive from "./Archive";
import Details from "./Details";
import Headline1 from "./Headline/Headline-one";
import Headline2 from "./Headline/Headline-two";
import "./style.scss";

export default function TableForm() {
  const [studentsBase, setStudentsBase] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isSelectedCounter, setisSelectedCounter] = useState(0);

  const countSelectedStudents = (num) => {
    setisSelectedCounter(num);
  };

  const searching = (terms) => {
    setSearchTerm(terms);
  };

  const handleArchive = () => {
    let archivated = studentsBase.map((item) =>
      item.isSelected === true
        ? {
            ...item,
            isSelected: !item.isSelected,
            isArchivated: !item.isArchivated,
          }
        : item
    );
    setStudentsBase(archivated);

    const total = archivated.reduce((sum, currentState) => {
      if (currentState.isSelected === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    countSelectedStudents(total);
  };

  const handleDetailsView = (position) => {
    const updatedStudentsBase = studentsBase.map((item, index) =>
      index === position ? { ...item, showDetails: !item.showDetails } : item
    );
    setStudentsBase(updatedStudentsBase);
  };

  const handleCheckboxOnChange = (position) => {
    const updatedStudentsBase = studentsBase.map((item, index) =>
      index === position ? { ...item, isSelected: !item.isSelected } : item
    );

    setStudentsBase(updatedStudentsBase);
    const total = updatedStudentsBase.reduce((sum, currentState) => {
      if (currentState.isSelected === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    countSelectedStudents(total);
  };

  const sorting = (e) => {
    if (order === "ASC") {
      const sorted = [...studentsBase].sort((a, b) =>
        a[e.target.name].toString().toLowerCase() >
        b[e.target.name].toString().toLowerCase()
          ? 1
          : -1
      );
      setStudentsBase(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...studentsBase].sort((a, b) =>
        a[e.target.name].toString().toLowerCase() <
        b[e.target.name].toString().toLowerCase()
          ? 1
          : -1
      );
      setStudentsBase(sorted);
      setOrder("ASC");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setStudentsBase(
      dataBase.data.map((item) => ({
        ...item,
        isSelected: false,
        isArchivated: false,
        showDetails: false,
        scoreColor:
          parseInt(item.score) < 50
            ? "red"
            : parseInt(item.score) < 80
            ? "yellow"
            : parseInt(item.score) < 90
            ? "green"
            : parseInt(item.score) >= 90
            ? "blue"
            : "",
        speedColor: item.speed.includes("w")
          ? "red"
          : item.speed.includes("s")
          ? "green"
          : item.speed.includes("v")
          ? "blue"
          : "",
      }))
    );
  }, []);

  return (
    <>
      {!isSelectedCounter ? (
        <Headline1 base={studentsBase} search={searching} />
      ) : (
        <Headline2
          base={studentsBase}
          archive={handleArchive}
          students={isSelectedCounter}
        />
      )}
      <section className="tableForm">
        <table className="table">
          <thead className="table-head">
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td className="name">
                <p>Name</p>
                <img src={name} alt="" name="name" onClick={sorting} />
              </td>
              <td className="id">
                <p>ID</p>
                <img src={sort} alt="" name="id" onClick={sorting} />
              </td>
              <td className="class">Class</td>
              <td className="score">
                <p>Av.Score, %</p>
                <img src={sort} alt="" name="score" onClick={sorting} />
              </td>
              <td className="speed">
                <p>Av.Speed</p>
                <img src={sort} alt="" name="speed" onClick={sorting} />
              </td>
              <td className="parents">Parents</td>
              <td className={`actions active`}>Actions</td>
            </tr>
          </thead>
          <tbody className="table-body">
            {studentsBase.length &&
              studentsBase
                .filter((item) => {
                  if (searchTerm === "") {
                    return item;
                  } else if (
                    item.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.id
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toString().toLowerCase()) ||
                    item.parents
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toString().toLowerCase())
                  ) {
                    return item;
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => {
                  return (
                    <>
                      {!item.isArchivated && (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxOnChange(index)}
                              checked={studentsBase[index].isSelected}
                            />
                          </td>
                          <td className="name">{item.name}</td>
                          <td className="id">{item.id}</td>
                          <td className="class">{item.class}</td>
                          <td className={`score ${item.scoreColor} `}>
                            {item.score}
                          </td>
                          <td className={`speed ${item.speedColor}`}>
                            {item.speed}
                          </td>
                          <td className="parents">{item.parents.join(", ")}</td>
                          <td className="actions">
                            <div
                              className={`action-buttons ${
                                studentsBase[index].isSelected && `active`
                              }`}
                            >
                              <img src={edit} alt="left" />
                              <img src={promote} alt="middle" />
                            </div>
                            <div onClick={() => handleDetailsView(index)}>
                              {studentsBase[index].showDetails ? (
                                <img src={arrow_up} alt="vector" />
                              ) : (
                                <img src={arrow_down} alt="vector" />
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                      {studentsBase[index].showDetails && (
                        <Details data={item} />
                      )}
                    </>
                  );
                })}
          </tbody>
          <span className="archived-row">ARCHIVED</span>
          <tfoot className={`table-foot `}>
            {studentsBase.length && (
              <Archive
                archive={handleArchive}
                select={handleCheckboxOnChange}
                base={studentsBase}
              />
            )}
          </tfoot>
        </table>
        <footer>
          <TablePagination
            component="table"
            count={20}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </footer>
      </section>
    </>
  );
}
