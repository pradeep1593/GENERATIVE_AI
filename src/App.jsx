
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import LoginForm from './components/Login/LoginForm';
// import SignupForm from './components/Login/SignupForm';
// import Home from './Home';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

//   const handleLogin = () => {
//     console.log('App: User logged in'); // Debug log
//     setIsLoggedIn(true); // Update login state
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <div style={{ 
//                 display: 'flex',
//                 flex: 1,
//                 minHeight: '100vh',
//                 paddingBottom: '15vh',
//                 position: 'relative',
//                }}>
//                 <Home />
//               </div>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/Login/SignupForm';
import Home from './Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    console.log('App: User logged in');
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Persist login status
  };

  const handleLogout = () => {
    console.log('App: User logged out');
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear login status
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
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
                <Home onLogout={handleLogout} />
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
