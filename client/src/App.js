import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import SingIn from './landing/SingIn';

function App() {
  return (
    <Routes>
      <Route path='/' element={<SingIn />}/>
      <Route path='/panel/*' element={<Dashboard />}/>
    </Routes>
  );
}

export default App;