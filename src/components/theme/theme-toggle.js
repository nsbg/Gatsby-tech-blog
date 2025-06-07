// src/components/theme/theme-toggle.js
import React, { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // 초기 로드 시 localStorage에서 다크모드 값 불러옴
    const saved = localStorage.getItem("darkMode")
    if (saved === "true") {
      setDarkMode(true)
      document.body.classList.add("dark-mode")
    }
  }, [])

  useEffect(() => {
    // 다크모드 상태 변경 시 body에 클래스 토글
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
      className="dark-mode-toggle"
      onClick={handleToggle}
      aria-label="다크모드 토글"
      type="button"
    >
      {darkMode ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  )
}

export default ThemeToggle