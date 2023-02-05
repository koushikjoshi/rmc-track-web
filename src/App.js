import { useState } from "react";
import "./App.css";
import { Board } from "./Components/Board/Board";
import NavigationBar from "./Components/Navigation/NavigationBar";
import SidePanel from "./Components/SidePanel/SidePanel";
import NewCallForm from "./Components/Form/NewCallForm";

function App() {
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
        <SidePanel className="side-panel" />
        {
          
        }
        <Board setVisible={setVisible} setCategory={setCategory} />
      </div>
    </div>
  );
}

export default App;
