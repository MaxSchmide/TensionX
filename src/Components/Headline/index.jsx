import React from "react";
import "./style.scss";
import search from "../Images/search-icon.png";
import download from "../Images/Vector.png";
export default function Headline() {
  return (
    <>
      <section className="headline">
        <div className="text">
          <h1>STUDENTS</h1>
        </div>
        <div className="searchForm">
          <input
            id="search-box"
            type="search"
            placeholder="Enter Student Name, Parent or ID here"
          />
          <label htmlFor="search-box">
            <img src={search} alt="" />
          </label>
        </div>
        <div className="exportButton">
          <img src={download} alt="" />
          <h1>EXPORT CSV </h1>
        </div>
      </section>
    </>
  );
}
