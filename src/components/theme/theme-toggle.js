import React, { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "true")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const handleToggle = () => setDarkMode((prev) => !prev)

  return (
    <button
      className="icon-btn theme-icon-btn"
      onClick={handleToggle}
      aria-label="다크모드 토글"
      type="button"
    >
      {darkMode ? (
        // 달 아이콘 (Moon)
        <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true">
          <path fill="currentColor" d="M19.7 16.95a8.03 8.03 0 0 1-9.85-9.85A7 7 0 1 0 19.7 16.95z"/>
        </svg>
      ) : (
        // 해 아이콘 (Sun)
        <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1.5" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="22.5"/>
            <line x1="4" y1="12" x2="1.5" y2="12"/>
            <line x1="22.5" y1="12" x2="20" y2="12"/>
            <line x1="5.5" y1="5.5" x2="3.7" y2="3.7"/>
            <line x1="18.5" y1="5.5" x2="20.3" y2="3.7"/>
            <line x1="5.5" y1="18.5" x2="3.7" y2="20.3"/>
            <line x1="18.5" y1="18.5" x2="20.3" y2="20.3"/>
          </g>
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
