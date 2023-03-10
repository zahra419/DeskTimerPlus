import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./navigation";
import { MemoryRouter as Router}from "react-router-dom"
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Router>
    <Navbar/>
    </Router>
    </React.StrictMode>
 
);
