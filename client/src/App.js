import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import LogIn from './landing/LogIn';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LogIn />}/>
      <Route path='/panel/*' element={<Dashboard />}/>
    </Routes>
  );
}

export default App;