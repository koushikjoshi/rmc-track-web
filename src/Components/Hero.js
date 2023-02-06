import React from "react";
import { useState } from "react";
import { Board } from "./Board/Board";
import NavigationBar from "./Navigation/NavigationBar";
import SidePanel from "./SidePanel/SidePanel";
import NewCallForm from "./Form/NewCallForm";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState("Your Leads");

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
        <SidePanel className="side-panel" setPage={setPage} page={page} />

        <Board setVisible={setVisible} setCategory={setCategory} />
      </div>
    </div>
  );
};

export default Hero;
