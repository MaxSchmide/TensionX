/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import name from "../Images/sort_by_alpha.png";
import sort from "../Images/sort_by_id.png";
import vector from "../Images/user-vector.png";
import edit from "../Images/edit-icon.png";
import promote from "../Images/promote-icon.png";
import "./style.scss";
import TablePagination from "@mui/material/TablePagination";

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
        setCheckedState(new Array(result.data.length).fill(false));
        setIsAllChecked(new Array(result.data.length).fill(false));
        setIsLoaded(true);
      });
  }, []);

  return (
    <section className="table">
      <table>
        <thead>
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
          </tr>
        </thead>
        <tbody>
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
                          className={`selected-buttons ${
                            checkedState[index] && `active`
                          }`}
                        >
                          <img src={edit} alt="" srcset="" />
                          <img src={promote} alt="" srcset="" />
                        </div>
                        <div>
                          <img src={vector} alt="" />
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
        </tbody>
        <tr onClick={handleArchivedSectionView} className="archived-row">
          <td>ARCHIVED</td>
        </tr>
        <tfoot className={archiveMenu && "active"}>
          {isLoaded &&
            archivedBase.map((item) => {
              return (
                <>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="name">{item.name}</td>
                    <td className="id">{item.id}</td>
                    <td className="class">{item.class}</td>
                    <td className={`score  `}>{item.score}</td>
                    <td className={`speed `}>{item.speed}</td>
                    <td className="parents">{item.parents.join(", ")}</td>
                    <td className="actions">
                      <div>
                        <img src={vector} alt="" />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
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
