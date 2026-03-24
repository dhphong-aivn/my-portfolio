import React, { useState, useEffect } from 'react';

export const TypewriterMessage = ({ text, isLatest, scrollRef }) => {
  const [displayedText, setDisplayedText] = useState(isLatest ? '' : text);

  useEffect(() => {
    if (!isLatest) {
      setDisplayedText(text);
      return;
    }
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "auto" });
      if (i >= text.length) clearInterval(intervalId);
    }, 15);
    return () => clearInterval(intervalId);
  }, [text, isLatest, scrollRef]);

  return <span>{displayedText}</span>;
};
