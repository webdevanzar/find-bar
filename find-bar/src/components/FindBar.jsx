import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./FindBar.css";
import { Paragraph } from "./Paragraph/Paragraph";
import { Modal } from "./Modal/Modal";

export const FindBar = () => {
  const [showFindBar, setShowFindBar] = useState(false);
  const [text, setText] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [matchIndex, setMatchIndex] = useState(-1);

  const htmlRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    const html = htmlRef.current.innerHTML;
    setText(html);
    return () => {
      document.removeEventListener("keydown", detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      setShowFindBar((prev) => !prev);
    }
  };

  useEffect(() => {
    if (showFindBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showFindBar]);

  const handleChange = (e) => {
    var keyword = e.target.value;
    if (!keyword) {
      setMatchCount(0);
      setMatchIndex(-1);
      htmlRef.current.innerHTML = text;
      return;
    }
    const regex = new RegExp(`(?![^<>]*>)(${keyword})`, "gi");
    const highLighted = text.replace(regex, (match, index) => {
      return `<span class="high-light">${match}</span>`;
    });
    htmlRef.current.innerHTML = highLighted;

    if (regex.source !== "(?:)") {
      const matches = htmlRef.current.querySelectorAll(".high-light");
      const count = matches.length;
      setMatchCount(count);
    } else {
      htmlRef.current.innerHTML = text;
      setMatchCount(0);
      setMatchIndex(-1);
    }
  };

  const handleNextClick = () => {
    const matches = htmlRef.current.querySelectorAll(".high-light");
    const count = matches.length;
    if (count === 0) {
      return;
    }
    const nextIndex = matchIndex >= count - 1 ? 0 : matchIndex + 1;
    matches[nextIndex].classList.add("high-light1");
    if (matchIndex != -1) matches[matchIndex].classList.remove("high-light1");
    setMatchIndex(nextIndex);
    matches[nextIndex].scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handlePrevClick = () => {
    const matches = htmlRef.current.querySelectorAll(".high-light");
    const count = matches.length;
    if (count === 0 || count === 1) {
      return;
    }
    const prevIndex = matchIndex <= 0 ? count - 1 : matchIndex - 1;
    matches[prevIndex].classList.add("high-light1");
    matches[matchIndex].classList.remove("high-light1");
    setMatchIndex(prevIndex);
    matches[prevIndex].scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const onClose = () => {
    setShowFindBar(false);
    htmlRef.current.innerHTML = text;
    setMatchCount(0);
    setMatchIndex(-1);
  };

  return (
    <div>
      {showFindBar && (
        <Modal
          onClose={onClose}
          handleChange={handleChange}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          count={matchCount}
          matchIndex={matchIndex}
          inputRef={inputRef}
        />
      )}

      <div ref={htmlRef}>
        <Paragraph />
      </div>
    </div>
  );
};
