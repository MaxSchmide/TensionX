import React, { useEffect, useState } from "react";
import name from "../Images/sort_by_alpha.png";
import sort from "../Images/sort_by_id.png";
import "./style.scss";
export default function Table() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [studentsBase, setStudentsBase] = useState([]);
  useEffect(() => {
    fetch("https://test-task-j.herokuapp.com/data?page=1&size=20")
      .then((response) => response.json())
      .then((result) => {
        setStudentsBase(result.data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <section className="table">
      <table>
        <thead>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td className="name">
              <p>Name</p>
              <img src={name} alt="" />
            </td>
            <td className="id">
              <p>ID</p>
              <img src={sort} alt="" />
            </td>
            <td className="class">Class</td>
            <td className="score">
              <p>Av.Score, %</p> <img src={sort} alt="" />
            </td>
            <td className="speed">
              <p>Av.Speed</p> <img src={sort} alt="" />
            </td>
            <td className="parents">Parents</td>
          </tr>
        </thead>
        <tbody>
          {isLoaded &&
            studentsBase.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
        </tbody>
      </table>
    </section>
  );
}
