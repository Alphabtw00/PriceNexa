import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTexts } from '../utils/api';
import '../styles/terms.css';

function Terms() {
  const [language, setLanguage] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [texts, setTexts] = useState({});
  const navigate = useNavigate();

  const HamburgerIcon = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="hamburger-menu" height="1em" width="1em">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
    </svg>
  );

  useEffect(() => {
    fetchTexts();
  }, [language]);

  const fetchTexts = async () => {
    try {
      const data = await getTexts('terms', language);
      setTexts(data);
    } catch (err) {
      console.error('failed to load texts:', err);
    }
  };

  const languageOptions = [
    { code: 'sv', name: 'Svenska', flag: 'https://storage.123fakturere.no/public/flags/SE.png' },
    { code: 'en', name: 'English', flag: 'https://storage.123fakturere.no/public/flags/GB.png' }
  ];

  const currentLang = languageOptions.find(l => l.code === language);

  return (
    <div className="terms-wrapper">
      <nav className="terms-navbar">
        <div className="navbar-left">
          <div onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <HamburgerIcon />
          </div>

          {showMobileMenu && (
            <div className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}>
              <a href="/" onClick={() => setShowMobileMenu(false)}>Home</a>
              <a href="/order" onClick={() => setShowMobileMenu(false)}>Order</a>
              <a href="/customers" onClick={() => setShowMobileMenu(false)}>Our Customers</a>
              <a href="/about" onClick={() => setShowMobileMenu(false)}>About us</a>
              <a href="/contact" onClick={() => setShowMobileMenu(false)}>Contact Us</a>
            </div>
          )}

          <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
            <img
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="logo"
              className="navbar-logo"
            />
          </div>
        </div>

        <div className="navbar-center">
          <div className="navbar-links">
            <a href="/">Home</a>
            <a href="/order">Order</a>
            <a href="/customers">Our Customers</a>
            <a href="/about">About us</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>

        <div className="navbar-right">
          <button
            className="language-dropdown-btn"
            onClick={() => setShowLangMenu(!showLangMenu)}
          >
            {currentLang.name}
            <img src={currentLang.flag} alt={currentLang.name} />
          </button>

          {showLangMenu && (
            <div className="language-menu">
              {languageOptions.map(lang => (
                <button
                  key={lang.code}
                  className="language-option"
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                >
                  {lang.name}
                  <img src={lang.flag} alt={lang.name} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mobile-lang-dropdown">
          <div className="navbar-right">
            <button
              className="language-dropdown-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              {currentLang.name}
              <img src={currentLang.flag} alt={currentLang.name} />
            </button>

            {showLangMenu && (
              <div className="language-menu">
                {languageOptions.map(lang => (
                  <button
                    key={lang.code}
                    className="language-option"
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                  >
                    {lang.name}
                    <img src={lang.flag} alt={lang.name} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="terms-main">
        <h1 className="terms-title">{texts.title || 'Terms'}</h1>

        <button className="close-btn" onClick={() => navigate(-1)}>
          {texts.close_button || 'Close and Go Back'}
        </button>

        <div className="terms-content-box">
          <div className="terms-text">
            {texts.content ? (
              texts.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>Loading terms...</p>
            )}
          </div>
        </div>
        <button
          className="close-btn bottom-close-btn"
          onClick={() => navigate(-1)}
        >
          {texts.close_button || 'Close and Go Back'}
        </button>
      </div>
    </div>
  );
}

export default Terms;