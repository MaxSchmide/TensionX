import React from "react";
import vector from "../../Images/user-vector.png";
import "./style.scss";
export default function Archive({ base }) {
  return base.map((item) => {
    return (
      <>
        <tr className="archive">
          <td>
            <input type="checkbox" />
          </td>
          <td className="name">{item.name}</td>
          <td className="id">{item.id}</td>
          <td className="class">{item.class}</td>
          <td className="score">{item.score}</td>
          <td className="speed">{item.speed}</td>
          <td className="parents">{item.parents.join(", ")}</td>
          <td className="actions">
            <div>
              <img src={vector} alt="" />
            </div>
          </td>
        </tr>
      </>
    );
  });
}
