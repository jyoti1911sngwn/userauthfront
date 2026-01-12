import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import DashboardGoogle from "./pages/DashboardGoogle";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth-success" element={<DashboardGoogle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
