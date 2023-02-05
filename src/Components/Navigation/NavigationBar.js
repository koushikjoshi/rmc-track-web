import React from "react";
import "./NavigationBar.css";

import { FaDotCircle } from "react-icons/fa";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import moment from "moment";

const NavigationBar = () => {
  const currentDate = moment().format("DD MMM YYYY");
  const [activity, setActivity] = useState();
  const [login, setLogin] = useState("0000");
  const [status, setStatus] = useState();

  useEffect(() => {
    new Promise((resolve, reject) => {
      onValue(
        ref(db, `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}`),
        (snapshot) => {
          const data = snapshot.val();
          setActivity(data);
          if (!data) {
            reject("No data found");
          }

          resolve(data);
        },
        {
          onlyOnce: true,
        }
      );
    })
      .then((data) => {
        setLogin(data.Login);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status`
      ),
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          return;
        }
        console.log(data);
        if (data.Break === "1") {
          setStatus("Break");
        } else if (data.OnMail === "1") {
          setStatus("OnMail");
        } else if (data.Meeting === "1") {
          setStatus("Meeting");
        } else {
          setStatus("Idle");
        }
        console.log(status);
      }
    );
  }, []);

  return (
    <div className="navigation-main">
      <div className="nav-logo">
        <img src={require("../../Images/rmclogo.png")}></img>
        <p>Koushik Joshi</p>
        <div className="login-time">
          <p>
            Login Time:
            {" " +
              login.toString().slice(0, 2) +
              ":" +
              login.toString().slice(2)}
          </p>
        </div>
      </div>
      <div
        className="nav-status"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaDotCircle
          style={{ color: "green", paddingRight: "5px", paddingTop: "2px" }}
        />
        <p style={{ paddingRight: "20px", color: "white" }}>Status: {status}</p>
      </div>
    </div>
  );
};

export default NavigationBar;
