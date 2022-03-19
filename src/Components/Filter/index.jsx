import React from "react";
import "./style.scss";
import arrow from "../Images/user-vector.png";
import cancel from "../Images/cancel.png";
export default function Filter() {
  return (
    <>
      <section className="filter">
        <div className="filtering">
          <div className="item">
            SHOW ALL
            <img src={arrow} alt="" />
          </div>
          <div className="item">
            ALL GRADES
            <img src={arrow} alt="" />
          </div>
          <div className="item">
            ALL CLASSES <img src={arrow} alt="" />
          </div>
          <div className="item">
            AV.SCORE <img src={arrow} alt="" />
          </div>
          <div className="item">
            AV.SPEED <img src={arrow} alt="" />
          </div>
          <div className="item">
            ALL CLASSES <img src={arrow} alt="" />
          </div>
          <div className="item clear">
            <img src={cancel} alt="" className="cancel" /> CLEAR ALL
          </div>
        </div>
      </section>
    </>
  );
}
