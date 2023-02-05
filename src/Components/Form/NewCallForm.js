import { React, useState } from "react";
import "./NewCallForm.css";
import { ref, onValue, child } from "firebase/database";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaRegWindowClose,
  FaRegCalendarAlt,
  FaCalculator,
} from "react-icons/fa";
import { db } from "../../firebase";

const NewCallForm = ({ visibility, category, setVisibility }) => {
  // const [visible, setVisible] = useState(visibility ? "visible" : "hidden");

  const closeWindow = () => {
    setVisibility(false);
    // console.log(visible);
  };

  // let visible =
  console.log(category);

  const submitForm = () => {
    ref(db, "users/7eTaM8jp5rM7gPwTb3D5P1aRzwi1/Calls");
    console.log("submitted");
  };

  return (
    <div
      style={{ visibility: visibility ? "visible" : "hidden" }}
      className="FormMain"
    >
      {category === "New Leads" && (
        <div className="form-div">
          <form className="Leadform">
            <p>
              <FaMapMarkerAlt />
              Location
            </p>
            <p>
              <FaQuestionCircle /> Query
            </p>
            <label for="remarks">Name:</label>
            <input
              type="text"
              id="remarks"
              name="name"
              className="name"
              value={"Koushik"}
            />
            <label for="remarks">Phone:</label>
            <input
              type="text"
              id="remarks"
              name="phone"
              className="phone"
              value={"9980827075"}
            />
            <label for="category">Category:</label>
            <select id="category">
              <option value="Callback">Callback</option>
              <option value="RnR">RnR</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
            </select>
            <label for="remarks">Remarks:</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              className="remarks"
            />
            <div className="call-duration">
              <p>Duration:</p>
              <div className="duration-input">
                <input
                  type="text"
                  id="duration-hours"
                  name="duration"
                  value="00"
                  className="duration-hours"
                />
                <input
                  type="text"
                  id="duration-minutes"
                  name="duration"
                  value="00"
                  className="duration-minutes"
                />
                <input
                  type="text"
                  id="duration-seconds"
                  name="duration"
                  value="00"
                  className="duration-seconds"
                />
              </div>
            </div>
            <button
              type="button"
              value="Create Ticket"
              className="create-ticket"
              onClick={submitForm}
            >
              Create Ticket
            </button>
          </form>
          <div className="close-icon" onClick={closeWindow}>
            Cancel
          </div>
        </div>
      )}
      {/* {category === "Callbacks" && <div className="form-div"></div>}
      {category === "RnR" && <div className="form-div"></div>}
      {category === "Interested" && <div className="form-div"></div>} */}
    </div>
  );
};

export default NewCallForm;
