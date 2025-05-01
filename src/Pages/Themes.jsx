import React, { useState, useEffect } from "react";
import daisyUIThemes from "../utils/themes.js";

const Themes = () => {
  const [activeTheme, setActiveTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, [activeTheme]);

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setActiveTheme(theme);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-2xl font-bold mb-6">Try them:</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Object.entries(daisyUIThemes).map(([theme, colors]) => (
          <button
            key={theme}
            onClick={() => applyTheme(theme)}
            className={`w-40 h-24 rounded-lg shadow-md border flex flex-col items-center justify-center p-2 transition-all duration-200 ${
              activeTheme === theme ? "ring-2 ring-primary scale-105" : ""
            }`}
          >
            {/* Theme Preview */}
            <div className="flex gap-1">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
            {/* Theme Name */}
            <h1 className="mt-2 font-bold text-sm">{theme}</h1>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Themes;
