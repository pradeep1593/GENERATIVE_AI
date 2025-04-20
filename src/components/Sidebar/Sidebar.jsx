import React, { useContext, useState, useEffect } from 'react';
import './sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const { onSent, setRecentPrompt, newChat } = useContext(Context);

  // Fetch prompts for the logged-in user
  const fetchPrompts = async () => {
    const username = localStorage.getItem('username');

    if (!username) {
      console.warn('No username found in localStorage');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/v1/get-prompts?username=${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPrompts(data.prompts || []); // Fallback to empty array
        console.log('Fetched prompts:', data.prompts);
      } else {
        console.error('Error fetching prompts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };

  // Load a selected prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  // Remove a specific prompt from the local state and database
  const removePrompt = async (indexToRemove, prompt) => {
    const updatedPrompts = prompts.filter((_, index) => index !== indexToRemove);
    setPrompts(updatedPrompts);

    const username = localStorage.getItem('username');

    if (!username) {
      console.warn('No username found in localStorage');
      return;
    }

    try {
      // Ensure you're passing the correct prompt string to the backend
      const promptText = typeof prompt === 'string' ? prompt : prompt.prompt;

      const response = await fetch('http://localhost:8081/api/v1/delete-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          prompt: promptText, // Pass the correct prompt string to be removed
        }),
      });

      if (!response.ok) {
        console.error('Error deleting prompt:', response.statusText);
      } else {
        console.log('Prompt deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  // Navigate to Help
  const navigate = () => {
    window.open(
      'https://support.google.com/gemini/community?hl=en',
      '_blank'
    );
  };

  // Fetch on mount and when sidebar is extended
  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="plus" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prompts.length > 0 ? (
              prompts.map((item, index) => (
                <div className="recent-entry" key={index}>
                  <div onClick={() => loadPrompt(item)} className="prompt-text">
                    <img src={assets.message_icon} alt="prompt" />
                    <p>{typeof item === 'string' ? item.slice(0, 18) : item.prompt.slice(0, 18)}</p> {/* Adjusted for object */}
                  </div>
                  <span className="remove-prompt" onClick={() => removePrompt(index, item)}>x</span>
                </div>
              ))
            ) : (
              <p>No recent prompts available</p>
            )}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={navigate}>
          <img src={assets.question_icon} alt="help" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="activity" />
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
