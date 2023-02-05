import { React, useState } from "react";
import { Column } from "../Column/Column";
import NewCallForm from "../Form/NewCallForm";
import SidePanel from "../SidePanel/SidePanel";
import "./Board.css";

export const Board = (props) => {
  var { setVisible, setCategory } = props;

  // console.log(visible);

  return (
    <div className="board-top">
      <div className="board-main">
        <div className="board-columns">
          <Column
            title="New Leads"
            background="AliceBlue"
            setVisible={setVisible}
            setCategory={setCategory}
          ></Column>
          <Column
            title="Callbacks"
            background="Pink"
            setVisible={setVisible}
            setCategory={setCategory}
          ></Column>
          <Column
            title="RnR"
            background="#FF7373"
            setVisible={setVisible}
            setCategory={setCategory}
          ></Column>
          <Column
            title="Interested"
            background="#DAF7A6"
            setVisible={setVisible}
            setCategory={setCategory}
          ></Column>
        </div>
      </div>
    </div>
  );
};
