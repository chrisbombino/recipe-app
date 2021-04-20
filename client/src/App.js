import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </Router>
  );
}

export default App;
