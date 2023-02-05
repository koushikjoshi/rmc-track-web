import { React, useState, useEffect } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase";
import moment from "moment";
import Switch from "react-switch";
import "../ReactSwitches/ReactSwitches.css";

export const Onmail = () => {
  const currentDate = moment().format("DD MMM YYYY");
  const [statusField, setStatusField] = useState({
    OnMail: 0,
    Idle: 1,
  });

  useEffect(() => {
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status`
      ),
      (snapshot) => {
        const statuses = snapshot.val();
        if (statuses) {
          setStatusField(statuses);
          console.log(statusField);
        } else {
          console.log("No status found for today");
        }
      }
    );
  }, [currentDate]);
  function handleChange(field, value) {
    set(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/${field}`
      ),
      value ? "1" : "0"
    );
    set(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Idle`
      ),
      value ? "0" : "1"
    );
  }

  return (
    <div className="Switch">
      <div className="switch-container">
        <label>
          <Switch
            checked={statusField.OnMail === "1"}
            onChange={(checked) => handleChange("OnMail", checked)}
          />
        </label>
      </div>
      <div>
        <span className="label">OnMail</span>
      </div>
    </div>
  );
};
