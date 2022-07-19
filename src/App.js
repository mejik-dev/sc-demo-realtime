import "./App.css";

import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PostPage />} />
    </Routes>
  );
};

export default App;
