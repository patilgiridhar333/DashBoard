import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Private from "./components/Private";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Add from "./components/Add";
import UpdateProduct from "./components/UpdateProduct";
import Products from "./components/Products";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route element={<Private />}>
            <Route path="/" element={<Products />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/update/:id" element={<UpdateProduct />}></Route>
            <Route path="/logout" element={<h2>Hi logout</h2>}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
