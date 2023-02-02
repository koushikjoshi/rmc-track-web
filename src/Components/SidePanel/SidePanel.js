import React from "react";
import "./SidePanel.css";
import { FaPhoneAlt, FaTicketAlt, FaFire, FaChartBar } from "react-icons/fa";
import { Onmail } from "../ReactSwitches/Onmail";
const SidePanel = () => {
  return (
    <div className="side-main">
      <p className="side-button">
        <FaPhoneAlt
          style={{
            paddingRight: "10px",
            paddingTop: "5px",
            alignSelf: "center",
          }}
        />
        Your Leads
      </p>
      <p className="side-button">
        <FaTicketAlt
          style={{
            paddingRight: "10px",
            paddingTop: "5px",
            alignSelf: "center",
          }}
        />
        Tickets
      </p>
      <p className="side-button">
        <FaFire
          style={{
            paddingRight: "10px",
            paddingTop: "5px",
            alignSelf: "center",
          }}
        />
        Hot Leads
      </p>
      <p className="side-button">
        <FaChartBar
          style={{
            paddingRight: "10px",
            paddingTop: "5px",
            alignSelf: "center",
          }}
        />
        Your Performance
      </p>
      <div className="Activity Buttons">
        <Onmail />
      </div>
    </div>
  );
};

export default SidePanel;
