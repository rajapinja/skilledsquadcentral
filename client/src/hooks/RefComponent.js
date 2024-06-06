import React, { useRef } from 'react';

function RefComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default RefComponent;

// useRef:
// Returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
// Useful for accessing DOM elements or persisting values across renders without causing re-renders.