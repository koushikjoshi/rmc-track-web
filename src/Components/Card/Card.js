import React, { useState, useEffect } from "react";
import { ref, onValue, child } from "firebase/database";
import { db } from "../../firebase";
import NewCallForm from "../Form/NewCallForm";
import "./Card.css";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaRegCalendarAlt,
} from "react-icons/fa";

export const Card = ({ title, setVisible, setCategory }) => {
  const [calls, setCalls] = useState({});

  useEffect(() => {
    const reference = ref(db, "users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Calls");
    onValue(reference, (snapshot) => {
      var data = [];
      // );

      if (title == "New Leads") {
        snapshot.forEach((childSnapshot) => {
          if (!childSnapshot.child("Category").val()) {
            data.push(childSnapshot.val());
          }
        });
        setCalls(data);
      } else if (title == "Callbacks") {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.child("Category").val() === "Callback") {
            data.push(childSnapshot.val());
          }
        });
        setCalls(data);
      } else if (title == "RnR") {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.child("Category").val() === "RnR") {
            data.push(childSnapshot.val());
          }
        });
        setCalls(data);
      } else if (title == "Interested") {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.child("Category").val() === "Interested") {
            data.push(childSnapshot.val());
          }
        });
        setCalls(data);
      }
    });
  }, []);

  const openSidePanel = () => {
    // setVisible(true);
    setCategory(title);
    if (title === "New Leads") {
      setVisible(true);
    }
  };
  return (
    <>
      {Object.keys(calls).map((call, idx) => {
        let status = "";
        const callDate = new Date(calls[call].Date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - callDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 2) {
          status = "New";
        } else {
          status = "Overdue";
        }

        return (
          <div key={idx}>
            <div className="card-main" onClick={openSidePanel}>
              <div className="card-left">
                <p
                  className="status"
                  style={{
                    fontSize: "smaller",
                    width: "fit-content",
                    border:
                      status === "New" ? "1px solid green" : "1px solid red",
                    borderRadius: "8px",
                    color: "white",
                    backgroundColor:
                      status === "New" ? "aquamarine" : "lightcoral",
                    color: status === "New" ? "black" : "white",
                    padding: status === "New" ? "5px" : "2px",
                  }}
                >
                  {status}
                </p>

                <p className="card-text">
                  <FaUserAlt style={{ paddingRight: "5px" }} />
                  <b>{calls[call].Name}</b>
                </p>
                <p className="card-text">
                  <FaPhoneAlt style={{ paddingRight: "5px" }} />
                  {calls[call].Phone}
                </p>
                <p className="card-text">
                  <FaMapMarkerAlt style={{ paddingRight: "5px" }} />
                  {calls[call].City}
                </p>
                <p className="card-text">
                  <FaQuestionCircle style={{ paddingRight: "5px" }} />
                  {calls[call].Query}
                </p>
              </div>
              <div className="card-right">
                <p className="card-text">
                  <FaRegCalendarAlt style={{ paddingRight: "5px" }} />
                  <b>{calls[call].Date}</b>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
