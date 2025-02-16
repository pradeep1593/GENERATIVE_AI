import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';
import bgImage from './bg.jpg';
// import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  const validatePassword = (input) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(input);
    const hasLowerCase = /[a-z]/.test(input);
    const hasNumber = /[0-9]/.test(input);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);

    if (input.length < minLength) {
      setError('Password must be at least 8 characters long.');
      return false;
    } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setError('Password must include uppercase, lowercase, a number, and a special character.');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };

  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);

    if (password !== input) {
      setError('Passwords do not match.');
    } else {
      setError('');
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // axios.post('http://localhost:3031/SignupForm',{usernamename, email, password})

    if (!username || !email || !password) {
      setError('All fields are required.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
    } else if (!termsAccepted) {
      setError('You must accept the terms and conditions to proceed.');
    } else if (validatePassword(password) && password === confirmPassword) {
      setError('');
      console.log("Signup form submitted successfully");
      navigate('/login');
    } else {
      setError('Passwords do not match.');
    }

    try {
      const response = await fetch('http://localhost:8081/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email,password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('SignUp successful', data);
        console.log(`email:${email} , username : ${username} , password : ${password}`)
        // Save token, update state, etc.
      } else {
        setError(data.message);
        console.log('SignUp failed');
        navigate("/signup")
      }
    } catch (error) {
      setError('An error occurred, please try again later.');
    }
  };
  
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    
  <div style={{
    height: '100vh',
    width: '100vw',  
    backgroundImage: `url(${bgImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }}>
    <div style={{
      width: '420px',
      height:'570px',
      background: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      color: '#120707',
      backdropFilter: 'blur(30px)',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      padding: '30px 40px',
      textAlign: 'center',
      fontSize: '29px'
    }}>
      <form onSubmit={handleSubmit}>
        <h1>SIGNUP</h1>
        <div style={{ position: 'relative', width: '100%', height: '50px', margin: '30px 0' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
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
              padding: '20px 45px 20px 20px'
            }}
          />
          <FaUser style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '50px', margin: '30px 0' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              padding: '20px 45px 20px 20px'
            }}
          />
          <FaEnvelope style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '50px', margin: '30px 0' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
              padding: '20px 45px 20px 20px'
            }}
          />
          <FaLock style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: '50px', margin: '30px 0' }}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
              padding: '20px 45px 20px 20px'
            }}
          />
          <FaLock style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', fontSize: '14px', margin: '-15px 0 15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', color: '#333', cursor: 'pointer', gap: '5px' }}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={{ marginRight: '8px', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            I accept the <a href="#" style={{ color: '#007BFF', textDecoration: 'none' }}>terms and conditions</a>
          </label>
        </div>
        {error && <p style={{ color: '#f80a0a', fontSize: '0.85rem', marginTop: '0.1px', margin: '-15px 0 15px' }}>{error}</p>}
        <button type="submit" disabled={!!error || !termsAccepted} style={{
          width: '100%',
          height: '45px',
          background: '#120707',
          border: 'none',
          outline: 'none',
          borderRadius: '40px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          fontSize: '16px',
          color: 'white',
          fontWeight: '700'
        }}>Sign Up</button>

        <div style={{ fontSize: '14.5px', textAlign: 'center', margin: '20px 0 15px' }}>
          <p>Already have an account? <a onClick={goToLogin} style={{ color: '#120707', textDecoration: 'none', fontWeight: '600' ,cursor: 'pointer'}}>Login</a></p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SignupForm;
