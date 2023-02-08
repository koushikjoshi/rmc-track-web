import React from "react";
import { useState } from "react";
import { Board } from "./Board/Board";
import NavigationBar from "./Navigation/NavigationBar";
import SidePanel from "./SidePanel/SidePanel";
import NewCallForm from "./Form/NewCallForm";
import { TicketPage } from "./Tickets/TicketPage";
import { useParams } from "react-router-dom";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("Your Leads");
  const { Name, userId, EmployeeId } = useParams();

  console.log(userId);
  return (
    <div className="App">
      {visible && (
        <NewCallForm
          visibility={visible}
          category={category}
          setVisibility={setVisible}
        />
      )}
      <NavigationBar />
      <div className="panel">
        <SidePanel
          className="side-panel"
          setPage={setPage}
          page={page}
          Name
          userId
        />

        {page === "Your Leads" && (
          <Board setVisible={setVisible} setCategory={setCategory} />
        )}
        {page === "Tickets" && <TicketPage userId={userId} />}
        {/* Write code for Hot Leads and Performance */}
      </div>
    </div>
  );
};

export default Hero;
