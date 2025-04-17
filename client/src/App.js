import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/Home';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
