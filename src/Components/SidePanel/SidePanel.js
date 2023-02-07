import React, { useState } from "react";
import "./SidePanel.css";
import {
  FaPhoneAlt,
  FaTicketAlt,
  FaFire,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { Onmail } from "../ReactSwitches/Onmail";
import { Meeting } from "../ReactSwitches/Meeting";
import { Break } from "../ReactSwitches/Break";
import { Link, useRouteError } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set } from "firebase/database";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SidePanel = ({ userId, dashboardurl }) => {
  const [active, setActive] = useState(true);

  const currentDate = moment().format("DD MMM YYYY");
  const currentTime = moment().format("HHmm");
  console.log(dashboardurl);

  const navigate = useNavigate();
  const logout = () => {
    set(ref(db, `users/${userId}/Activity/${currentDate}/Status`), {
      Idle: "1",
      Break: "0",
      Meeting: "0",
      OnMail: "0",
    })
      .then(set(ref(db, `users/${userId}/Login`), "No"))
      .then(
        set(
          ref(db, `users/${userId}/Activity/${currentDate}/Logout`),
          currentTime.toString()
        )
      )
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className={`side-main ${active ? "side-main--active" : ""}`}>
      <Link to={dashboardurl}>
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
      </Link>
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
      <p className="side-button" onClick={logout}>
        <FaSignOutAlt
          style={{
            paddingRight: "10px",
            paddingTop: "0px",
            alignSelf: "center",
          }}
        />
        Logout
      </p>
    </div>
  );
};

export default SidePanel;
