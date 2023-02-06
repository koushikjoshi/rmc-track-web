import React from "react";
import { Tickets } from "./Tickets";
import NavigationBar from "../Navigation/NavigationBar";
import SidePanel from "../SidePanel/SidePanel";
import "../Tickets/Ticket.css";
export const TicketPage = () => {
  return (
    <>
      <NavigationBar />

      <div className="App">
        <div className="Panel">
          <SidePanel />
          <Tickets />
        </div>
      </div>
    </>
  );
};
