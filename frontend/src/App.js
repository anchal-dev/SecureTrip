// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TouristDashboard from './pages/TouristDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/tourist/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['tourist']}>
                <TouristDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/authority/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['authority', 'admin']}>
                <AuthorityDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;