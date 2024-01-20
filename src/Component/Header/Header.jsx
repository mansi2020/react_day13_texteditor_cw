import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  // ---------------------------usestate for change mode-----------------------------
  let [darkMode, setDarkMode] = useState(false);

  //-----------------------onchange of input then update state------------------
  function onchangeMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  // useEffect
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);

  return (
    <div className="header-container">
      <ul>
        <li>TextUtils</li>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="header-mode">
        <div class="toggle-container">
          <input
            type="checkbox"
            id="toggle"
            class="toggle-input"
            onChange={onchangeMode}
          />
          <label for="toggle" class="toggle-label">
            <div class="toggle-ball"></div>
          </label>
        </div>
        <p>Enable dark Mode</p>
      </div>
    </div>
  );
};

export default Header;
