import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="moon">🌙</div>
        <h1>Lune</h1>
      </div>
      <p className="tagline">YouTube Downloader</p>
    </header>
  );
}

export default Header;
