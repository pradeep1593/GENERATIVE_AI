import { createContext, useState, useEffect } from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    const resultElement = document.querySelector('.result');
    if (resultElement) {
      resultElement.scrollTop = resultElement.scrollHeight;
    }
  }, [resultData]);

  const delayPara = (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput('');
    setResultData('');
    setRecentPrompt('');
  };

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResult(true);

    const actualPrompt = (prompt !== undefined ? prompt : input).trim();

    if (!actualPrompt) {
      setLoading(false);
      return;
    }

    if (!prompt) {
      const username = localStorage.getItem('username');

      if (username) {
        try {
          await fetch('http://localhost:8081/api/v1/save-prompt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: actualPrompt,
              username: username,
            }),
          });
        } catch (err) {
          console.error('Error saving prompt:', err);
        }
      }
    }

    setRecentPrompt(actualPrompt);

    try {
      const result = await run(actualPrompt);
      let responseArray = result.split('**');
      let newResult = '';

      for (let i = 0; i < responseArray.length; i++) {
        newResult += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
      }

      const formatted = newResult.split('*').join('</br>').split('```').join('</br>');
      const newResponseArray = formatted.split(' ');

      for (let i = 0; i < newResponseArray.length; i++) {
        delayPara(i, newResponseArray[i] + ' ');
      }

      setTimeout(() => {
        setResultData(newResponseArray.join(' '));
      }, 75 * newResponseArray.length);

    } catch (error) {
      console.error('Error generating response:', error);
    }

    setLoading(false);
    setInput('');
  };

  const contextValue = {
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    userPrompts,
    setUserPrompts,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
