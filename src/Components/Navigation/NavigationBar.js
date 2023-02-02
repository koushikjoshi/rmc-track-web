import React from "react";
import "./NavigationBar.css";
import Switch from "react-switch";

const NavigationBar = () => {
  return (
    <div className="navigation-main">
      <div className="nav-logo">
        <img src={require("../../Images/rmclogo.png")}></img>
        <p>Koushik Joshi</p>
      </div>
    </div>
  );
};

export default NavigationBar;
