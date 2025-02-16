import {createContext, useState} from 'react';
import run from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState("");// to save the input data.
    const [recentPrompt,setRecentPrompt] = useState("");//when we enter the send button the input will be stored here and we display result here using that input.
    const [previousPrompt,setPreviousPrompt] = useState([]);//we have declared it as array to save all the input history and to store it in the sidebar.
    const [showResult,setShowResult] = useState(false);//boolean type once it is true it will hide greet mesage and card showing information.
    const [loading,setLoading] = useState(false);//if this is true it will load some loading animation after that we will make it as false.
    const [resultData,setResultData] = useState("");// to display the result on the main tab.

    const delayPara =(index,nextword) => { // typing effect helper function...
        setTimeout(() => {
          setResultData(prev => prev+nextword);
          requestAnimationFrame(scrollToBottom);
        },75*index)
    };

    // Reset for new chat
    const newChat =() => {
      setLoading(false)
      setShowResult(false)
    }
    
    const scrollToBottom = () => {
      const resultElement = document.querySelector('.result'); // Ensure this matches the CSS class for your result container
      if (resultElement) {
          resultElement.scrollTop = resultElement.scrollHeight;
      }
  };
    // Main function to handle input and processing
    const onSent = async (prompt) => {

        setResultData(""); // Clear previous results
        setLoading(true); // Start loading animation
        setShowResult(true); // Show result area

        let result;
        if (prompt !== undefined) {
          result = await run(prompt);  // Fetch result for given prompt
          setRecentPrompt(prompt);
        }else{
          setPreviousPrompt(prev => [...prev,input]);
          setRecentPrompt(input);
          result = await run(input);
        }
        // setRecentPrompt(input)
        // setPreviousPrompt(prev => [...prev,input])
        // const result = await run(input)

        let responseArray = result.split("**");// split result to process bold text
        let newResult = "" ;

        //wrap bold text
        for (let i = 0;i<responseArray.length;i++){ 
          if(i===0 || i%2 !== 1){
            newResult += responseArray[i]; //normal text
          }  
          else{
            newResult += "<b>"+responseArray[i]+"</b>"; //bold text
          }   
        }
        let newResult2 = newResult.split("*").join("</br>");
        let newResult3 = newResult2.split("```").join("</br>");

        //replace * with line breaks
        let newResponseArray = newResult3.split(" ");
        for (let i = 0;i<newResponseArray.length;i++){ 
          const nextword = newResponseArray[i];
          delayPara(i,nextword+" ")
        }

        setTimeout(() => {
          setResultData(newResponseArray.join(" ")); // Set final result after typing finishes
          scrollToBottom(); 
        }, 75 * newResponseArray.length);

        // setResultData(newResult2) //final resut formatting
        setLoading(false)
        setInput("")
    }
    
    const contextValue ={
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
  return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
  )
}
export default ContextProvider;