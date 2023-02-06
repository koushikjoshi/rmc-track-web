import React, { useState } from "react";
import "./SidePanel.css";
import { FaPhoneAlt, FaTicketAlt, FaFire, FaChartBar } from "react-icons/fa";
import { Onmail } from "../ReactSwitches/Onmail";
import { Meeting } from "../ReactSwitches/Meeting";
import { Break } from "../ReactSwitches/Break";
import { Link } from "react-router-dom";
const SidePanel = ({ setPage, page }) => {
  const [active, setActive] = useState(true);
  return (
    <div className={`side-main ${active ? "side-main--active" : ""}`}>
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
      <Link to="/TicketPage">
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
      </Link>
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
      <div className="Activity-Buttons">
        <div>
          <Onmail />
        </div>
        <div>
          <Meeting />
        </div>
        <div>
          <Break />
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
