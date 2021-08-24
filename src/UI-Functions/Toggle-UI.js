import React, { useState, useEffect } from 'react';

export function useToggle(start) {
  const [val, setVal] = useState(start);
  function toggleVal() {
    setVal(!val);
  }
  return [val, toggleVal];
}

export function HoverContext(on, off) {
  const [hover, toggleHover] = useToggle(true);
  return (
    <div onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}>
      {hover ? on : off}
    </div>
  );
}

export function HoverStyle(element, on, off) {
  const [hover, toggleHover] = useToggle(true);
  return (
    <div
      style={hover ? on : off}
      onMouseEnter={() => toggleHover()}
      onMouseLeave={() => toggleHover()}
    >
      {element}
    </div>
  );
}
