import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import bgImage from './bg.jpg';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    if (!password) {
      setError('Please enter password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        onLogin(); // Notify App about successful login
        navigate('/'); // Redirect to the main page
      } else {
        console.error('Login failed:', data);
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '420px',
          height: '420px',
          background: 'transparent',
          border: '2px solid rgba(255, 255, 255, .2)',
          color: '#120707',
          backdropFilter: 'blur(30px)',
          boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
          borderRadius: '10px',
          padding: '30px 40px',
          fontSize: '26px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '50px',
              margin: '30px 0',
            }}
          >
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                outline: 'none',
                border: '2px solid rgba(53, 51, 51, 0.2)',
                borderRadius: '40px',
                fontSize: '16px',
                color: '#120707',
                padding: '20px 45px 20px 20px',
              }}
            />
            <FaUser
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
              }}
            />
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '50px',
              margin: '30px 0',
            }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                outline: 'none',
                border: '2px solid rgba(53, 51, 51, 0.2)',
                borderRadius: '40px',
                fontSize: '16px',
                color: '#120707',
                padding: '20px 45px 20px 20px',
              }}
            />
            <FaLock
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
              }}
            />
          </div>
          {error && (
            <p
              style={{
                color: '#f80a0a',
                fontSize: '0.85rem',
                margin: '-15px 0 15px',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              height: '45px',
              background: '#120707',
              border: 'none',
              outline: 'none',
              borderRadius: '40px',
              boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'white',
              fontWeight: '700',
            }}
          >
            Login
          </button>

          <div
            style={{
              fontSize: '14.5px',
              textAlign: 'center',
              margin: '20px 0 15px',
            }}
          >
            <p>
              Don't have an account?{' '}
              <span className="link">
                <a
                  onClick={handleSignupRedirect}
                  style={{
                    color: '#120707',
                    textDecoration: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Sign up
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
