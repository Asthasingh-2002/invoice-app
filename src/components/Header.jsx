"use client"
import "../styles/Header.css"

function Header({ onLogout }) {
  const userSession = JSON.parse(localStorage.getItem("userSession"))

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">← Create New Invoice</h1>
        </div>
        <div className="header-right">
          <span className="user-info">Welcome, {userSession?.username}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
