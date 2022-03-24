/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import name from "../Images/sort_by_alpha.png";
import sort from "../Images/sort_by_id.png";
import arrow_down from "../Images/user-vector.png";
import arrow_up from "../Images/arrow_up.png";
import edit from "../Images/edit-icon.png";
import promote from "../Images/promote-icon.png";
import "./style.scss";
import TablePagination from "@mui/material/TablePagination";
import Archive from "./Archive";
import Details from "./Details";

export default function TableForm(props) {
  const [archivedBase, setArchivedBase] = useState([]);
  const [archiveMenu, setArchiveMenu] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [studentsBase, setStudentsBase] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("ASC");
  const [checkedState, setCheckedState] = useState();
  const [isAllChecked, setIsAllChecked] = useState();
  const [selectedState, setSelectedState] = useState();

  const selectAllStudents = () => {
    let toggle = isAllChecked.map((item) => (item = !item));

    const total = toggle.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setIsAllChecked(toggle);
    setCheckedState(toggle);
    props.count(total);
  };
  const handleDetailsView = (position) => {
    const updatedSelectedState = selectedState.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedState(updatedSelectedState);
  };
  const handleCheckboxOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const total = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    props.count(total);
  };

  const handleArchivedSectionView = () => {
    setArchiveMenu(!archiveMenu);
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
    fetch("https://test-task-j.herokuapp.com/data?page=1&size=20")
      .then((response) => response.json())
      .then((result) => {
        setStudentsBase(result.data);
        setArchivedBase(result.data.slice(0, 2));
        setIsLoaded(true);
      });
  }, []);
  useEffect(() => {
    setCheckedState(new Array(studentsBase.length).fill(false));
    setSelectedState(new Array(studentsBase.length).fill(false));
    setIsAllChecked(new Array(studentsBase.length).fill(false));
  }, [studentsBase]);
  return (
    <section className="tableForm">
      <table className="table">
        <thead className="table-head">
          <tr>
            <td>
              <input type="checkbox" onClick={selectAllStudents} />
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
            <td className={`actions ${checkedState && `active`}`}>Actions</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {isLoaded &&
            studentsBase
              .filter((item) => {
                if (props.terms === "") {
                  return item;
                } else if (
                  item.name
                    .toLowerCase()
                    .includes(props.searchTerms.toLowerCase()) ||
                  item.id
                    .toString()
                    .toLowerCase()
                    .includes(props.searchTerms.toString().toLowerCase()) ||
                  item.parents
                    .toString()
                    .toLowerCase()
                    .includes(props.searchTerms.toString().toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxOnChange(index)}
                          checked={checkedState[index]}
                        />
                      </td>
                      <td className="name">{item.name}</td>
                      <td className="id">{item.id}</td>
                      <td className="class">{item.class}</td>
                      <td className={`score  `}>{item.score}</td>
                      <td className={`speed `}>{item.speed}</td>
                      <td className="parents">{item.parents.join(", ")}</td>
                      <td className="actions">
                        <div
                          className={`action-buttons ${
                            checkedState[index] && `active`
                          }`}
                        >
                          <img src={edit} alt="left" srcset="" />
                          <img src={promote} alt="middle" srcset="" />
                        </div>
                        <div onClick={() => handleDetailsView(index)}>
                          {selectedState[index] ? (
                            <img src={arrow_up} alt="vector" />
                          ) : (
                            <img src={arrow_down} alt="vector" />
                          )}
                        </div>
                      </td>
                    </tr>
                    {selectedState[index] && <Details data={item} />}
                  </>
                );
              })}
        </tbody>
        <span onClick={handleArchivedSectionView} className="archived-row">
          ARCHIVED
        </span>
        <tfoot className={`table-foot ${archiveMenu && "active"}`}>
          {isLoaded && <Archive base={archivedBase} />}
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
  );
}
