import React from "react";
import "./style.scss";
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
          </div>
        </div>
      </div>
    </>
  );
}
