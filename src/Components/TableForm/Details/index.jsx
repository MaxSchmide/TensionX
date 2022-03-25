import React from "react";
import "./style.scss";
import refresh from "../../Images/refresh.png";
export default function Details({ data }) {
  return (
    <>
      <div className="details">
        <div className="body">
          <div className="frame">
            <div className="label">
              STUDENT: <b>{data.name}</b>
              ID: <b> {data.id}</b>
            </div>
            <div className="filter">
              <select className="select-concepts">
                <option>ALL CONCEPTS</option>
              </select>
              <select className="select-score">
                <option>ALL SCORE</option>
              </select>
              <select className="select-speed">
                <option>ALL SPEED</option>
              </select>
              <input type="date" />
              <img src={refresh} alt="" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="labels">
            <div className="score-label">
              SCORE
              <div className="one blue">
                <div className="circle "></div>
                90%+ ACCURACY
              </div>
              <div className="two green">
                <div className="circle "></div>
                80%-89% ACCURACY
              </div>
              <div className="three yellow">
                <div className="circle"></div>
                50%-79% ACCURACY
              </div>
              <div className="four red">
                <div className="circle"></div>
                BELOW 50% ACCURACY
              </div>
            </div>
            <div className="speed-label">
              SPEED
              <div className="one blue">
                <div className="circle "></div>
                ABOVE EXPECTED
              </div>
              <div className="two green">
                <div className="circle "></div>
                AS EXPECTED
              </div>
              <div className="three red">
                <div className="circle"></div>
                BELOW EXPECTED
              </div>
            </div>
          </div>
          <table className="details-table">
            <thead className="details-thead">
              <tr>
                <td className="index">#</td>
                <td className="label">Test Label</td>
                <td className="score">Score</td>
                <td className="speed">Speed</td>
                <td className="total">Total Q-ns</td>
                <td className="expspeed">Exp. Speed</td>
                <td className="concept">Concept</td>
                <td className="date">Date</td>
                <td className="absent">Absent</td>
              </tr>
            </thead>
            <tbody className="details-tbody">
              {data.tests.map((item, index) => {
                return (
                  <tr>
                    <td className="index">{index}</td>
                    <td className="label">{item.label}</td>
                    <td className="score">{item.score ? item.score : "NIL"}</td>
                    <td className="speed">{item.speed ? item.speed : "NIL"}</td>
                    <td className="total">{item.total}</td>
                    <td className="expspeed">{item.expSpeed}</td>
                    <td className="concept">{item.concept}</td>
                    <td className="date">{item.date}</td>
                    <td className="absent">
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
              <div className="table-divider"></div>
              <tr className="details-footer">
                <td className="avg">AVERAGE</td>
                <td className="val">96%</td>
                <td className="res">ABOVE EXPECTED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
