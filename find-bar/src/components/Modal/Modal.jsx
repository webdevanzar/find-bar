import React from "react";
import "./Modal.css";

export const Modal = ({
  onClose,
  handleChange,
  handleNextClick,
  count,
  matchIndex,
  handlePrevClick,
  inputRef
}) => {
  return (
    <div className="main">
      <div className="find-bar">
        <div className="content">
          <input type="text" placeholder="Find" ref={inputRef} onChange={handleChange} />
          <span
            style={{
              color: "white",
              position: "absolute",
              right: "34%",
              top: "32%",
              backgroundColor: "rgba(0, 0, 0, 0)",
            }}
          >
            {matchIndex + 1}/{count}
          </span>
          <button className="previous" onClick={handlePrevClick}>‹</button>
          <button className="next" onClick={handleNextClick}>
            ›
          </button>
          <button onClick={onClose}>×</button>
        </div>
      </div>
    </div>
  );
};
