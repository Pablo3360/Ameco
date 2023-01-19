import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Landing from './Landing';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/panel/*' element={<Dashboard />}/>
      </Routes>
    </>
  );
}

export default App;
