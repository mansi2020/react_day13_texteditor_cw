import { useReducer,useRef } from "react";
import "./TextEditor.css";

const TextEditor = () => {
    // useref for copied text functionality
    const textAreaRef = useRef(null);

  // usereducer to update text editor value
  const reduceFn = (state, action) => {
    switch (action.type) {
      case "updatetext":
        if(action.payload == ""){
            return { ...state, text: action.payload ,countWords:0,countCharacter:0,readingTimer : 0};
        }
        let wordCount = action.payload.split(/\s+/).join(" ").trim().split(" ").length;
        let characterCount = action.payload.split(/\s+/).join("").length;
        let readingTime = (wordCount*8)/1000;
        return { ...state, text: action.payload ,countWords:wordCount,countCharacter:characterCount,readingTimer : readingTime};
      case "uppercase":
        return { ...state, text: state.text.toUpperCase() };
      case "lowercase":
        return { ...state, text: state.text.toLowerCase() };
      case "cleartext":
        return { ...state, text:"" };
      case "copytext": 
        textAreaRef.current.select();
        let copyValue = navigator.clipboard.writeText(textAreaRef.current.value)
        .then(()=>{
            console.log("text copied");
        })
        return state;
      case "removeextraspace":
        let updatedStr = state.text.split(/\s+/).join(" ");
        return {...state,text:updatedStr}
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reduceFn, { text: "",countWords:0,countCharacter:0,readingTimer:0});

  return (
    <div className="texteditor-container">
      <h1>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>

      {/* text editor text */}
      <div className="texteditor-text">
        <h3>Enter Your Text Here:</h3>
        <textarea
          cols="30"
          rows="15"
          onChange={(e) =>
            dispatch({ type: "updatetext", payload: e.target.value })
          }
          value={state.text}
          ref={textAreaRef}
        ></textarea>
      </div>

      {/* buttons */}
      <div className="texteditor-buttons">
        <button onClick={() => dispatch({ type: "uppercase" })} className={`texteditor-button ${state.text !== "" ? "texteditor-disble-button": ""}`}>
          Convert Uppercase
        </button>
        <button onClick={() => dispatch({ type: "lowercase" })} className={`texteditor-button ${state.text !== "" ? "texteditor-disble-button": ""}`}>
          Convert LowerCase
        </button>
        <button onClick={() => dispatch({ type: "cleartext" })} className={`texteditor-button ${state.text !== "" ? "texteditor-disble-button": ""}`}>
          Clear Text
        </button>
        <button onClick={() => dispatch({ type: "copytext" })} className={`texteditor-button ${state.text !== "" ? "texteditor-disble-button": ""}`}>
          Copy To Clipboard
        </button>
        <button onClick={() => dispatch({ type: "removeextraspace" })} className={`texteditor-button ${state.text !== "" ? "texteditor-disble-button": ""}`}>
          Remove Extra Spaces
        </button>
      </div>

      {/* summary of text */}
      <div className="texteditor-summery">
        <h1>Summery Of Your Text</h1>
        <p>Number of words : {state.countWords}</p>
        <p>Number of charecters : {state.countCharacter}</p>
        <p>Reading Time: {state.readingTimer}</p>
      </div>

      {/* preview text */}
      <div className="texteditor-preview">
        <h2>Preview Document</h2>
        <textarea name="" id="" cols="30" rows="6" value={state.text}></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
