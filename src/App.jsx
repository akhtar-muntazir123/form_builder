import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useSelector } from "react-redux";

import Forms from "../pages/Forms";
import Homepage from "../pages/Homepage";
import Form1 from "./components/FormDetail";
import FormDetail from "./components/FormDetail";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/forms" element={<Forms/>}/>
      <Route path="/forms/:id" element={<FormDetail/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
