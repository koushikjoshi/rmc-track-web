import React, { useState, useEffect } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase";
import moment from "moment";
import Switch from "react-switch";
import "../ReactSwitches/ReactSwitches.css";

export const Meeting = () => {
  const currentDate = moment().format("DD MMM YYYY");
  const [statusField, setStatusField] = useState({
    Meeting: 0,
    Idle: 1,
  });
  const [ismeetingOn, setIsMeetingOn] = useState(false);
  const [meetingStart, setMeetingStart] = useState(0);
  const [meetingStarted, setMeetingStarted] = useState(false);
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
  function handleMeetingStart() {
    const meetingReason = document.getElementById("meeting-reason").value;
    let meetingStart = moment().format("HHmm");
    setMeetingStart(parseInt(moment().format("HHmm")));
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings`
      ),
      (snapshot) => {
        let data = snapshot.val();
        if (!data) {
          data = {};
        }
        if (!("meetings" in data)) {
          data["meetings"] = {};
        }

        console.log(data);
        let newMeeting = { meeting_start: meetingStart, remark: meetingReason };
        let meetingCount = Object.keys(data).length + 1;
        let newMeetingKey = `meeting${meetingCount}`;
        data[newMeetingKey] = newMeeting;
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings`
          ),
          data
        );
      },
      {
        onlyOnce: true,
      }
    );
    set(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Meeting`
      ),
      "1"
    );
    set(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Idle`
      ),
      "0"
    );
    console.log(
      `Meeting started at ${meetingStart} for the reason: ${meetingReason}`
    );
    document.getElementById("meeting-reason").value = "";
    setMeetingStarted(true);
  }

  function handleMeetingEnd() {
    let meetingEnd = moment().format("HHmm");
    meetingEnd = parseInt(meetingEnd);
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings/`
      ),
      (snapshot) => {
        let data = snapshot.val();
        let lastMeeting = data[Object.keys(data)[Object.keys(data).length - 1]];
        console.log(lastMeeting);
        lastMeeting.meeting_end = meetingEnd;
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings`
          ),
          data
        );
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/Status/Meeting`
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
        console.log(`Meeting ended at ${meetingEnd}`);
      },
      {
        onlyOnce: true,
      }
    );
    onValue(
      ref(
        db,
        `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings_duration`
      ),
      (snapshot) => {
        let existingDuration = snapshot.val() || 0;
        console.log(existingDuration);
        let newDuration = existingDuration + (meetingEnd - meetingStart);
        set(
          ref(
            db,
            `users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Activity/${currentDate}/meetings_duration`
          ),
          newDuration
        );
        console.log(`Total meeting duration: ${newDuration}`);
      },
      {
        onlyOnce: true,
      }
    );

    setIsMeetingOn(false);
  }
  return (
    <div className="Switch">
      <label>
        <Switch
          onChange={(checked) => {
            setIsMeetingOn(checked);
            if (!checked) {
              handleMeetingEnd();
            }
          }}
          checked={ismeetingOn}
        />
      </label>
      {ismeetingOn && (
        <div className="checkboxes">
          <input
            type="text"
            id="meeting-reason"
            placeholder="Enter the reason for the meeting"
            className="meeting-input"
          />
          <button onClick={handleMeetingStart} className="breakstart">
            Start Meeting
          </button>
        </div>
      )}
      <span className="label">Meeting</span>
    </div>
  );
};
