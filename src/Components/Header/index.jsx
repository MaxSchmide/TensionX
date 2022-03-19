import React from "react";
import "./style.scss";
import userVector from "../Images/user-vector.png";
import photo from "../Images/my-photo.jpg";
import logo from "../Images/logo.png";
export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
        <select name="schools">
          <option>SCHOOL 1</option>
          <option>SCHOOL 3</option>
          <option>SCHOOL 2</option>
        </select>
      </div>
      <div className="categories">
        <div className="c n01">ANALYTICS</div>
        <div className="c n02">GRADEBOOK</div>
        <div className="c n03">TESTS</div>
        <div className="c n04">STUDENTS</div>
        <div className="c n05">TEACHERS</div>
        <div className="c n06">ATCHIVE</div>
      </div>
      <div className="user">
        <img src={photo} className="photo" alt="" />
        <img src={userVector} alt="" className="icon" />
      </div>
    </header>
  );
}
