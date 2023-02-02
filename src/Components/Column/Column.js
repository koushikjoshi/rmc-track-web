import React from "react";
import { Card } from "../Card/Card";
import { FaSearch } from "react-icons/fa";
import "./Column.css";

export const Column = (props) => {
  const { title, background, setVisible } = props;
  return (
    <div className="column-main">
      <div className="column-header" style={{ backgroundColor: background }}>
        <p>{title}</p>
      </div>
      <div className="column-search-bar">
        <FaSearch color="black" style={{ zIndex: "1" }} />
        <input placeholder="Search using phone number"></input>
      </div>
      <div className="cards-holder">
        <Card title={title} setVisible={setVisible} />
      </div>
    </div>
  );
};
