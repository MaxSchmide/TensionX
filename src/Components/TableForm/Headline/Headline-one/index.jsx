import React, { useRef } from "react";
import "./style.scss";
import search from "../../../Images/search-icon.png";
import download from "../../../Images/Vector.png";
import { CSVLink } from "react-csv";
export default function Headline1(props) {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Class", key: "class" },
    { label: "Av. Score, %", key: "score" },
    { label: "Av. Speed", key: "speed" },
    { label: "Parents", key: "parents" },
  ];

  const csvLinkEl = useRef();
  const downloadReport = () => {
    csvLinkEl.current.link.click();
  };
  return (
    <>
      <section className="headline">
        <div className="text">
          <h1>STUDENTS</h1>
        </div>
        <div className="searchForm">
          <input
            onChange={(e) => props.search(e.target.value)}
            id="search-box"
            type="search"
            placeholder="Enter Student Name, Parent or ID here"
          />
          <label htmlFor="search-box">
            <img src={search} alt="" />
          </label>
        </div>
        <div className="exportButton" onClick={downloadReport}>
          <img src={download} alt="" />
          <h1>EXPORT CSV </h1>
          <CSVLink
            headers={headers}
            filename="Students_info.csv"
            data={props.base}
            ref={csvLinkEl}
          />
        </div>
      </section>
    </>
  );
}
