import { useEffect, useState } from "react";

// Custom hook to manage layout mode (dark/light)
const useTheme = (): [string, () => void] => {
  const [mode, setMode] = useState<string>("light");

  // Function to toggle between dark and light mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Effect to apply the selected mode on the HTML element
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", mode);
  }, [mode]);

  return [mode, toggleMode];
};

export default useTheme;
