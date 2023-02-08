import React from "react";
import { Tickets } from "./Tickets";
import NavigationBar from "../Navigation/NavigationBar";
import SidePanel from "../SidePanel/SidePanel";
import "./TicketPage.css";
import { ViewTicket } from "./ViewTicket";
export const TicketPage = ({ userId }) => {
  return (
    <>
      <div className="Panel">
        <div className="tickets-column">
          <Tickets />
        </div>
        <div className="view-tickets">
          <ViewTicket />
        </div>
      </div>
    </>
  );
};
