import React from "react";
import "./NewCallForm.css";

const NewCallForm = ({ visibility }) => {
  let visible = visibility ? "visible" : "hidden";
  console.log(visible);
  return (
    <div style={{ visibility: { visible } }} className="FormMain">
      <div className="form-div">
        <form className="Leadform">
          <label for="fname">First name:</label>
          <input type="text" id="fname" name="fname" />
          <label for="lname">Last name:</label>
          <input type="text" id="lname" name="lname" />
        </form>
      </div>
    </div>
  );
};

export default NewCallForm;
