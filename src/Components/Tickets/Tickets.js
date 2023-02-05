import React from "react";

export const Tickets = () => {
  return (
    <div className="Ticket-Container">
      <div className="category">
        <p>Category</p>
      </div>
      <div className="Ticket-Inner-Container">
        <div>
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Location</p>
          </div>
        </div>

        <div>
          <div>
            <p>No of Calls</p>
          </div>
          <div>
            <p>Query</p>
          </div>
        </div>
      </div>
    </div>
  );
};
