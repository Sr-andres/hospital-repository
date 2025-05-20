import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Login";
import Files from "./screens/Files";
import Login from "./screens/Home";





export default function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/file" element={<Files/>}/>
      <Route path="/login" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}
  