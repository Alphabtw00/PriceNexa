import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, getTexts } from '../utils/api';
import '../styles/login.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [texts, setTexts] = useState({});
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const EyeIcon = ({ show }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {show ? (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      )}
    </svg>
  );

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
      const data = await getTexts('login', language);
      setTexts(data);
    } catch (err) {
      console.error('failed to load texts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginApi(username, password);
      setToken(data.token);
      navigate('/pricelist');
    } catch (err) {
      setError(err.message);
    }
  };

  const languageOptions = [
    { code: 'sv', name: 'Svenska', flag: 'https://storage.123fakturere.no/public/flags/SE.png' },
    { code: 'en', name: 'English', flag: 'https://storage.123fakturere.no/public/flags/GB.png' }
  ];

  const currentLang = languageOptions.find(l => l.code === language);

  return (
    <div className="login-container">
      <nav className="login-navbar">
        <div className="navbar-left">
          <div onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <HamburgerIcon />
          </div>

          {showMobileMenu && (
            <div className={`mobile-menu ${showMobileMenu ? 'active' : ''}`}>
              <a href="#" onClick={() => setShowMobileMenu(false)}>Home</a>
              <a href="#" onClick={() => setShowMobileMenu(false)}>Order</a>
              <a href="#" onClick={() => setShowMobileMenu(false)}>Our Customers</a>
              <a href="#" onClick={() => setShowMobileMenu(false)}>About us</a>
              <a href="#" onClick={() => setShowMobileMenu(false)}>Contact Us</a>
            </div>
          )}

          <img 
            src="https://storage.123fakturera.se/public/icons/diamond.png" 
            alt="logo" 
            className="navbar-logo"
          />
        </div>
        
        <div className="navbar-center">
          <div className="navbar-links">
            <a href="#">Home</a>
            <a href="#">Order</a>
            <a href="#">Our Customers</a>
            <a href="#">About us</a>
            <a href="#">Contact Us</a>
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

      <div className="login-content">
        <div className="login-box">
          <h1>{texts.welcome || 'Welcome'}</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{texts.username || 'Username'}</label>
              <input
                type="text"
                placeholder={texts.username_placeholder || 'testuser1'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>{texts.password || 'Password'}</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
            </div>
            
            <button type="submit" className="login-btn">
              {texts.login_button || 'Login'}
            </button>
          </form>
          
          <div className="login-footer">
            <a href="#">{texts.register || 'Register'}</a>
            <a href="#">{texts.forgot_password || 'Forgot password?'}</a>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-div">
          <div className="footer-top">
            <div className="footer-logo">123 Fakturera</div>
            <div className="footer-links">
              <a href="#">Hem</a>
              <a href="#">Beställ</a>
              <a href="#">Kontakta oss</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © Lättfaktura, CRO no. 638537, 2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;