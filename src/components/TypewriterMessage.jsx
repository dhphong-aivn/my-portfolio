import React, { useState, useEffect, useMemo } from 'react';

function parseMarkdown(text) {
  if (!text) return '';
  let html = text
    // Code blocks (```)
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    // Inline code (`)
    .replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>')
    // Bold (**text**)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic (*text*)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // Headings
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Unordered list items (- item)
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*?<\/li>(?:<br\/>)?)+)/g, '<ul>$1</ul>');
  // Clean up extra <br/> inside <ul>
  html = html.replace(/<ul>(.*?)<\/ul>/gs, (match, inner) => {
    return '<ul>' + inner.replace(/<br\/>/g, '') + '</ul>';
  });

  return html;
}

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

  const renderedHtml = useMemo(() => parseMarkdown(displayedText), [displayedText]);

  return <span className="chat-md" dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
};
