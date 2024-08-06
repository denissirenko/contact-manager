import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./pages/ContactList";
import ContactDetails from "./pages/ContactDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/:id" element={<ContactDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
