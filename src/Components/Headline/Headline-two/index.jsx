import React from "react";
import "./style.scss";
import download from "../../Images/download-white.png";
import cancel from "../../Images/cancel-white.png";
import archive from "../../Images/archive.png";
export default function Headline2(props) {
  return (
    <section className="headline-two">
      <h1 className="head">{props.students} STUDENTS SELECTED</h1>
      <div className="buttons">
        <div className="box">
          <img src={cancel} alt="" />
          <h1>CANCEL SELECTED </h1>
        </div>
        <div className="box">
          <img src={download} alt="" />
          <h1>EXPORT CSV </h1>
        </div>
        <div className="box">
          <img src={archive} alt="" />
          <h2 className="dark">ARCHIVE SELECTED </h2>
        </div>
      </div>
    </section>
  );
}
