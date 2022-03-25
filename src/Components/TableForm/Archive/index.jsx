import React from "react";
import unarchive from "../../Images/unarchive.png";
import vector from "../../Images/user-vector.png";
import "./style.scss";
export default function Archive({ archive, base, select }) {
  return base.map((item, index) => {
    return (
      <>
        {item.isArchivated && (
          <tr key={index} className="archive">
            <td>
              <input type="checkbox" onChange={() => select(index)} />
            </td>
            <td className="name">{item.name}</td>
            <td className="id">{item.id}</td>
            <td className="class">{item.class}</td>
            <td className="score">{item.score}</td>
            <td className="speed">{item.speed}</td>
            <td className="parents">{item.parents.join(", ")}</td>
            <td className="actions">
              <div
                onClick={archive}
                className={`action-buttons ${
                  base[index].isSelected && "active"
                }`}
              >
                <img src={unarchive} alt="" />
              </div>
              <div>
                <img src={vector} alt="vector" />
              </div>
            </td>
          </tr>
        )}
      </>
    );
  });
}
