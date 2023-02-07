import React from "react";
import { Tickets } from "./Tickets";
import NavigationBar from "../Navigation/NavigationBar";
import SidePanel from "../SidePanel/SidePanel";
import "./Ticket.css";

export const TicketPage = () => {
  return (
    <>
      <div className="App">
        <NavigationBar />

        <div className="panel">
          <SidePanel className="side-panel" />
          <Tickets />
        </div>
      </div>
    </>
  );
};
