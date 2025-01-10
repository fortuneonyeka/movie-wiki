import { useEffect, useRef } from "react";

export function useKeyEvents({ onEnter, onEscape }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const handleKeyEvent = (e) => {
      if (e.code === "Enter" && onEnter) {
        // Check if the inputEl ref is defined and not focused
        if (!inputEl.current || document.activeElement === inputEl.current) return;

        inputEl.current.focus(); // Safely access focus
        onEnter(); // Execute the Enter callback
      }

      if (e.code === "Escape" && onEscape) {
        onEscape(); // Execute the Escape callback
      }
    };

    document.addEventListener("keydown", handleKeyEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent); // Clean up the event listener
    };
  }, [onEnter, onEscape]);

  return inputEl; // Return the ref so it can be attached to the input
}
