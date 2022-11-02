import "./App.css";
// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import TicketForm from "./components/ticketForm/TicketForm";
import TicketTable from "./components/ticketTable/TicketTable";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TicketTable />} />
        <Route path="/tickets" element={<TicketForm page="addTicket" />} />
        <Route path="/ticket/:id" element={<TicketForm page="editTicket" />} />
      </Routes>
    </div>
  );
}

export default App;
