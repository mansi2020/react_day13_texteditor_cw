import React from "react";
import "./Header.css";

const Header = () => {
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
          <input type="checkbox" id="toggle" class="toggle-input" />
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
