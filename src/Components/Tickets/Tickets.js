import React from "react";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import moment from "moment";
import { useParams } from "react-router-dom";
import "./Tickets.css";
import { useNavigate } from "react-router-dom";

export const Tickets = () => {
  const [users, setUsers] = useState({});

  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    onValue(ref(db, `users/${userId}/Calls`), (snapshot) => {
      let data = snapshot.val();
      console.log(data);
      setUsers(data);
    });

    console.log(users);
  }, []);

  return (
    <>
      {Object.keys(users).map((user, i) => {
        if (users[user].Category && users[user].Category !== "Not Interested") {
          return (
            <div className="Ticket-Container">
              <div className="category">
                <p>Category: {users[user].Category}</p>
              </div>
              {/* <div className="Ticket-Inner-Container"> */}
              {/* <div> */}
              <div>
                <p>Name:{users[user].Name}</p>
              </div>
              <div>
                <p>
                  Location:{users[user].City != null ? users[user].City : "NA"}
                </p>
              </div>
              {/* </div> */}

              {/* <div> */}
              <div>
                <p>
                  No of Calls:{" "}
                  {users[user].Logs != null
                    ? Object.keys(users[user].Logs).length
                    : "1"}
                </p>
              </div>
              <div>
                <p>Query: {users[user].Query}</p>
              </div>
              {/* </div> */}
              <div className="button">
                {/* <button
                  className="Ticketbutton"
                  onClick={() => handleViewTicket(users[user])}
                >
                  View Ticket{" "}
                </button> */}
              </div>
              {/* </div> */}
            </div>
          );
        }
      })}
    </>
  );
};
