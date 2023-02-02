import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import LogIn from './landing/LogIn';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LogIn />}/>
      {/* <PrivateRoute path="/panel/*" element={<Dashboard />} /> */}
      <Route path="/panel/*" element={<PrivateRoute component={Dashboard} />} />
    </Routes>
  );
}

export default App;