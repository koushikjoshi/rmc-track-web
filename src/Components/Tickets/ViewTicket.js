import React from "react";

export const ViewTicket = (props) => {
  const { user } = props;

  console.log(user);
  return (
    <div className="view-ticket-main">
      {/* <h2>Ticket Details</h2>
      <div>
        <p> Category: {user.Category}</p>
        <p>Name: {user.Name}</p>
        <p>Location: {user.City}</p>
        <p>No of Calls: {user.Logs ? Object.keys(user.Logs).length : "1"}</p>
        <p>Query: {user.Query}</p>
      </div> */}
    </div>
  );
};
