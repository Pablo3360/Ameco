import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/panel/*' element={<Dashboard />}/>
      </Routes>
    </>
  );
}

export default App;
