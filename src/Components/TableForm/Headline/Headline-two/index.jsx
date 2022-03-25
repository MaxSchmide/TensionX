/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "./style.scss";
import download from "../../../Images/download-white.png";
import cancel from "../../../Images/cancel-white.png";
import archive from "../../../Images/archive.png";
import { CSVLink } from "react-csv";
export default function Headline2(props) {
  const csvLinkElem = useRef();
  const [usersData, setUsersData] = useState([]);
  const [name, setName] = useState([]);
  useEffect(() => {
    const users = props.base.filter((item) => item.isSelected && item);
    const names = users.map((item) => item.name);
    const details = users.map((item) => item.tests);

    setName(names);
    setUsersData(details.map((item, index) => item[index]));
  }, [props.base]);

  const exportDetails = () => {
    csvLinkElem.current.link.click();
  };

  return (
    <section className="headline-two">
      <h1 className="head">{props.students} STUDENTS SELECTED</h1>
      <div className="buttons">
        <div className="box">
          <img src={cancel} alt="" />
          <h1>CANCEL SELECTED </h1>
        </div>
        <div className="box" onClick={exportDetails}>
          <img src={download} alt="" />
          <h1>EXPORT CSV </h1>
          <CSVLink
            data={usersData}
            ref={csvLinkElem}
            filename={`${name}_details.csv`}
          />
        </div>
        <div className="box" onClick={props.archive}>
          <img src={archive} alt="" />
          <h2 className="dark">ARCHIVE SELECTED </h2>
        </div>
      </div>
    </section>
  );
}
