import { useState } from "react";
import "./App.css";
import { Board } from "./Components/Board/Board";
import NavigationBar from "./Components/Navigation/NavigationBar";
import SidePanel from "./Components/SidePanel/SidePanel";
import NewCallForm from "./Components/Form/NewCallForm";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      {visible && <NewCallForm visibility={visible} />}
      <NavigationBar />
      <div className="panel">
        <SidePanel className="side-panel" />
        <Board setVisible={setVisible} />
      </div>
    </div>
  );
}

export default App;
