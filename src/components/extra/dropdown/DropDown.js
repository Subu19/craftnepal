import React, { useState } from "react";
import "./main.css";
import CustomMarkDown from "../CustomMarkDown";
const DropDown = ({ show, toggle, data }) => {
  return (
    <div className="dropdownBox">
      <div className="dropdownHeader" onClick={() => toggle(data.title)}>
        {data.title}
        <i
          className={`fa fa-chevron-${
            show == data.title ? "up" : "down"
          } downIcon`}
        ></i>
      </div>
      <div
        className={
          show == data.title
            ? "dropdownContent dropdownShow"
            : "dropdownContent"
        }
      >
        {show == data.title ? (
          <CustomMarkDown content={data.text}></CustomMarkDown>
        ) : null}
      </div>
    </div>
  );
};
const DropDowns = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const toggle = (header) => {
    if (header == selected) {
      setSelected(null);
    } else {
      setSelected(header);
    }
  };
  return data.map((dropdown) => (
    <DropDown show={selected} toggle={toggle} data={dropdown}></DropDown>
  ));
};
export default DropDowns;
