import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InputQues from "./components/InputQues";
// import Table from "./components/Table";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/inputques" element={<InputQues />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <Table></Table> */}
    </div>
  );
}

export default App;
