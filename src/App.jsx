import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    setLoading(false); // Mark done
  }, []);

  const handleLogin = () => {
    console.log('App: User logged in');
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    console.log('App: User logged out');
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  if (loading) return null; // or a spinner while checking localStorage

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginForm onLogin={handleLogin} />
          }
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  minHeight: '100vh',
                  paddingBottom: '15vh',
                  position: 'relative',
                }}
              >
                <Home   onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
