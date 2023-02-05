import React, { useState, useEffect } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase";
import moment from "moment";
import Switch from "react-switch";
import "../ReactSwitches/ReactSwitches.css";

export const Break = () => {
  const currentDate = moment().format("DD MMM YYYY");
  const [statusField, setStatusField] = useState({
    Break: 0,
    Idle: 1,
  });
  const [breakStart, setBreakStart] = useState(0);
  const [breaktimeStart, setBreakTimeStart] = useState(false);
  const [isBreakOn, setIsBreakOn] = useState(false);

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

  function handleBreakStart() {
    const breakReason = document
      .querySelector('input[name="break-reason"]:checked')
      .getAttribute("value");
    let breakStart = moment().format("HHmm");
    setBreakStart(parseInt(moment().format("HHmm")));
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/breaks`
      ),
      (snapshot) => {
        let data = snapshot.val() || {};
        if (!("breaks" in data)) {
          data["breaks"] = {};
        }

        console.log(data);
        let newBreak = { break_start: breakStart, remark: breakReason };
        let breakCount = Object.keys(data).length + 1;
        let newBreakKey = `breaks${breakCount}`;
        data[newBreakKey] = newBreak;
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/breaks`
          ),
          data
        );
      },
      {
        onlyOnce: true,
      }
    );
    handleChange("Break", true);
    console.log(
      `Break started at ${breakStart} for the reason: ${breakReason}`
    );
    document.getElementById("break-reason").value = "";
    setBreakTimeStart(true);
  }

  function handleBreakEnd() {
    let BreakEnd = moment().format("HHmm");
    BreakEnd = parseInt(BreakEnd);

    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/breaks`
      ),
      (snapshot) => {
        let data = snapshot.val();
        let lastBreak = data[Object.keys(data)[Object.keys(data).length - 1]];
        console.log(lastBreak);
        lastBreak.break_end = BreakEnd;
        console.log(BreakEnd);

        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/breaks`
          ),
          data
        );
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Break`
          ),
          "0"
        );
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Idle`
          ),
          "1"
        );
        console.log(`Break ended at ${BreakEnd}`);
      },
      {
        onlyOnce: true,
      }
    );
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/break_duration`
      ),
      (snapshot) => {
        let existingDuration = snapshot.val() || 0;
        console.log(existingDuration);
        let newDuration = existingDuration + (BreakEnd - breakStart);
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/break_duration`
          ),
          newDuration
        );
      },
      {
        onlyOnce: true,
      }
    );
    setIsBreakOn(false);
  }

  return (
    <div className="Switch">
      <label>
        <Switch
          onChange={(checked) => {
            setIsBreakOn(checked);
            if (!checked) {
              handleBreakEnd();
            }
          }}
          checked={isBreakOn}
        />
      </label>
      {isBreakOn && (
        <div className="checkboxes">
          <label className="checkbox">
            <input
              name="break-reason"
              id="break-reason"
              type="checkbox"
              defaultChecked={false}
            />
            Lunch Break
          </label>
          <label className="checkbox">
            <input
              name="break-reason"
              id="break-reason"
              type="checkbox"
              defaultChecked={false}
            />
            Snack Break
          </label>

          <button onClick={handleBreakStart} className="breakstart">
            Start Break
          </button>
        </div>
      )}
      <span className="label">Break</span>
    </div>
  );
};
