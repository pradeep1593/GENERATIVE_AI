import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = ( { onLogout }) => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);
    

  return (
    <div className='main'>
        <div className="nav">
            <p> Gemini </p>
            {/* Logout button */}
            <button className="logout-button" onClick={onLogout}>
                Logout
            </button>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult?
            <>
            <div className="greet">
                <p><span>Hello, Deepu</span></p>
                <p>How can I help you today?</p>
            </div>
            
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful place to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div> 

            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading ?( 
                    <div className="loader" >
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    ):(<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    )}
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    {/* <img src={assets.gallery_icon} alt="" /> */}
                    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text"placeholder="Ask Gemini.." />
                    <div>
                        {/* <img src={assets.mic_icon} alt="" /> */}
                        {input? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null }
                    </div>
                </div>
                <p className='bottom-info'>
                Gemini can make mistakes, so double-check it.
                </p>
            </div>
        </div>
        {/* Logout button */}
        {/* <button className="logout-button" onClick={onLogout}>
            Logout
        </button> */}
    </div>
  );
};

export default Main;