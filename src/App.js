import "./App.css";
import Hero from "./Components/Hero";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { TicketPage } from "./Components/Tickets/TicketPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard/:Name/:userId" element={<Hero />} />
        <Route path="/TicketPage" element={<TicketPage />} />
      </Routes>
    </>
  );
}

export default App;
