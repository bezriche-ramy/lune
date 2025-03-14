import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src="/lune-logo.svg" alt="Lune Logo" className="logo" />
      </div>
      <h1>YouTube Video Downloader</h1>
    </div>
  );
};

export default Header;
