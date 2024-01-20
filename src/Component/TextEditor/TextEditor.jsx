import { useEffect, useReducer, useRef } from "react";
import "./TextEditor.css";

const TextEditor = () => {
  //todo-----------------useref for copied text functionality------------------------
  const textAreaRef = useRef(null);
  const alertDangerMessage = useRef(null);

  //todo----------------------- function which update state---------------------------------
  //updateText function
  function updatetext(state, action) {
    if (action.payload == "") {
      return {
        ...state,
        text: action.payload,
        countWords: 0,
        countCharacter: 0,
        readingTimer: 0,
      };
    }
    let wordCount = action.payload
      .split(/\s+/)
      .join(" ")
      .trim()
      .split(" ").length;
    let characterCount = action.payload.split(/\s+/).join("").length;
    let readingTime = (wordCount * 8) / 1000;
    return {
      ...state,
      text: action.payload,
      countWords: wordCount,
      countCharacter: characterCount,
      readingTimer: readingTime,
    };
  }
  // copy text
  function copyText(state) {
    textAreaRef.current.select();
    navigator.clipboard.writeText(textAreaRef.current.value);
    return {
      ...state,
      message: `SUCCESS: Copied the Text: ${state.text}`,
      setAlertMessage: true,
    };
  }

  //todo------------------reduce function for update data------------------------------------
  const reduceFn = (state, action) => {
    switch (action.type) {
      case "updatetext":
        return updatetext(state, action);
      case "uppercase":
        return {
          ...state,
          text: state.text.toUpperCase(),
          message: "SUCCESS: Converted to UpperCase",
          setAlertMessage: true,
        };
      case "lowercase":
        return {
          ...state,
          text: state.text.toLowerCase(),
          message: "SUCCESS: Converted to LowerCase",
          setAlertMessage: true,
        };
      case "cleartext":
        state = {
          ...state,
          text: "",
          message: "DANGER: Cleared the whole Text",
          setAlertMessage: true,
        };
        return state;
      case "copytext":
        return copyText(state);
      case "removeextraspace":
        return {
          ...state,
          text: state.text.split(/\s+/).join(" "),
          message: "SUCCESS: All extra Space are cleared",
          setAlertMessage: true,
        };
      case "show":
        return { ...state, setAlertMessage: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reduceFn, {
    text: "",
    message: "",
    countWords: 0,
    countCharacter: 0,
    readingTimer: 0,
    setAlertMessage: false,
  });

  //todo show alert message -----------------
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "show" });
    }, 2000);
  }, [state.setAlertMessage]);

  return (
    <div className="texteditor-container">
      {state.setAlertMessage && (
        <div
          className="texteditor-message"
          ref={alertDangerMessage}
          style={{
            backgroundColor:
              state.message == "DANGER: Cleared the whole Text"
                ? "rgb(242, 151, 151)"
                : "rgb(180, 252, 160)",
          }}
        >
          {state.message}
        </div>
      )}
      <h1>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>

      {/* text editor text */}
      <div className="texteditor-text">
        <h3>Enter Your Text Here:</h3>
        <textarea
          onChange={(e) =>
            dispatch({ type: "updatetext", payload: e.target.value })
          }
          value={state.text}
          ref={textAreaRef}
        ></textarea>
      </div>

      {/* buttons */}
      <div className="texteditor-buttons">
        <button
          onClick={() => dispatch({ type: "uppercase" })}
          className={`texteditor-button ${
            state.text !== "" ? "texteditor-disble-button" : ""
          }`}
        >
          Convert Uppercase
        </button>
        <button
          onClick={() => dispatch({ type: "lowercase" })}
          className={`texteditor-button ${
            state.text !== "" ? "texteditor-disble-button" : ""
          }`}
        >
          Convert LowerCase
        </button>
        <button
          onClick={() => dispatch({ type: "cleartext" })}
          className={`texteditor-button ${
            state.text !== "" ? "texteditor-disble-button" : ""
          }`}
        >
          Clear Text
        </button>
        <button
          onClick={() => dispatch({ type: "copytext" })}
          className={`texteditor-button ${
            state.text !== "" ? "texteditor-disble-button" : ""
          }`}
        >
          Copy To Clipboard
        </button>
        <button
          onClick={() => dispatch({ type: "removeextraspace" })}
          className={`texteditor-button ${
            state.text !== "" ? "texteditor-disble-button" : ""
          }`}
        >
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
        <textarea name="" id="" value={state.text}></textarea>
      </div>
    </div>
  );
};

export default TextEditor;
