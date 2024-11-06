import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Files from "./screens/Files";





export default function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/file" element={<Files/>}/>
    </Routes>
    </BrowserRouter>
  )
}
