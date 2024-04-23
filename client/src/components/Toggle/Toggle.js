import React, { useState } from 'react';
import './Toggle.css';
import Income from '../Income/Income';
import Expense from '../Expense/Expense';

const Toggle = () => {
  const [isToggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <div>
      <div className="button-container">
        <div className="button-box">
          <button
            type="button"
            className={`toggle-btn ${isToggled ? 'toggled' : ''}`}
            onClick={handleToggle}
          >
            Expense
          </button>
          <button
            type="button"
            className={`toggle-btn ${!isToggled ? 'toggled' : ''}`}
            onClick={handleToggle}
          >
            Income
          </button>
        </div>
      </div>
      {isToggled ? <Expense /> : <Income />}
    </div>
  );
};

export default Toggle;
