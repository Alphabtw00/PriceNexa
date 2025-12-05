import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPricelistItems, updatePricelistItem, getTexts } from '../utils/api';
import '../styles/pricelist.css';

function Pricelist({ token, setToken }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [language, setLanguage] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [texts, setTexts] = useState({});
  const navigate = useNavigate();

  const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const SortIcon = ({ color }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="4" x2="12" y2="20" />
      <polyline points="6 14 12 20 18 14" />
    </svg>
  );



  const ArrowIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2">
      <circle cx="5" cy="12" r="1.5" fill="#2196f3" />
      <circle cx="12" cy="12" r="1.5" fill="#2196f3" />
      <circle cx="19" cy="12" r="1.5" fill="#2196f3" />
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const PrintIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" strokeWidth="2">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );

  const AdvancedIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e88e5" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );

  const MenuIcon = ({ type }) => {
    const base = {
      width: 22,
      height: 22,
      viewBox: "0 0 24 24",
      fill: "none",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    const blue = "#4FC3F7";
    const green = "#69F0AE";
    const orange = "#FFB74D";
    const red = "#FF5252";
    const yellow = "#FFEB3B";

    switch (type) {

      case "invoices":
        return (
          <svg {...base} stroke={blue} fill={blue}>
            <rect x="4" y="3" width="16" height="18" rx="3" />
          </svg>
        );

      case "customers":
        return (
          <svg {...base} stroke={green}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
          </svg>
        );

      case "business":
        return (
          <svg {...base} stroke={blue}>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V21a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H3a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1A1 1 0 0 0 9 4.2V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9h.1a1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H21a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z"/>
          </svg>
        );

      case "journal":
        return (
          <svg {...base} stroke={blue}>
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="13" x2="16" y2="13" />
          </svg>
        );

      case "pricelist":
        return (
          <svg {...base} stroke={orange}>
            <path d="M4 8l8-5 8 5v10l-8 5-8-5z" />
            <circle cx="12" cy="10" r="2" fill={orange} stroke="none" />
          </svg>
        );

      case "multiple":
        return (
          <svg {...base} stroke={blue} fill={blue}>
            <rect x="4" y="3" width="16" height="18" rx="3" />
          </svg>
        );

      case "unpaid":
        return (
          <svg {...base} stroke={red} fill={red}>
            <circle cx="12" cy="12" r="10" />
            <line x1="9" y1="9" x2="15" y2="15" stroke="#fff" />
            <line x1="15" y1="9" x2="9" y2="15" stroke="#fff" />
          </svg>
        );

      case "offer":
        return (
          <svg {...base} stroke={yellow}>
            <path d="M4 10l8-6 8 6-8 10z" />
            <circle cx="10" cy="12" r="1" fill={yellow} stroke="none" />
            <circle cx="14" cy="12" r="1" fill={yellow} stroke="none" />
            <line x1="10" y1="16" x2="14" y2="8" />
          </svg>
        );

      case "inventory":
        return (
          <svg {...base} stroke={blue}>
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="16" y2="16" />
          </svg>
        );

      case "member":
        return (
          <svg {...base} stroke={blue}>
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <circle cx="9" cy="12" r="2.5" />
            <path d="M14 15h5" />
          </svg>
        );

      case "import":
        return (
          <svg {...base} stroke={blue}>
            <path d="M18 18H6a4 4 0 0 1 0-8h1a5 5 0 0 1 10 0h1a4 4 0 1 1 0 8z" />
            <polyline points="12 14 12 9 9 12" />
          </svg>
        );

      case "logout":
        return (
          <svg {...base} stroke={blue}>
            <rect x="4" y="3" width="10" height="18" rx="2" />
            <polyline points="14 16 19 12 14 8" />
          </svg>
        );

      default:
        return null;
    }
  };



  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchItems();
    fetchTexts();
  }, [token]);

  useEffect(() => {
    if (language) fetchTexts();
  }, [language]);

  useEffect(() => {
    const delaySearch = setTimeout(() => handleSearch(), 300);
    return () => clearTimeout(delaySearch);
  }, [searchArticle, searchProduct, items]);

  const fetchTexts = async () => {
    try {
      const data = await getTexts('pricelist', language);
      setTexts(data);
    } catch (err) {
      console.error('failed to load texts:', err);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await getPricelistItems(token);
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.error('failed to load items:', err);
      if (err.message.includes('token')) {
        setToken(null);
        navigate('/');
      }
    }
  };

  const handleSearch = () => {
    const filtered = items.filter(item => {
      const matchArticle = searchArticle ?
        item.article_no?.toLowerCase().includes(searchArticle.toLowerCase()) : true;
      const matchProduct = searchProduct ?
        item.product_service?.toLowerCase().includes(searchProduct.toLowerCase()) : true;
      return matchArticle && matchProduct;
    });
    setFilteredItems(filtered);
  };

  const handleCellClick = (itemId, field, currentValue) => {
    setEditingCell({ itemId, field });
    setEditValue(currentValue || '');
  };

  const handleCellBlur = async () => {
    if (!editingCell) return;

    const { itemId, field } = editingCell;
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const updatedItem = { ...item, [field]: editValue };

    try {
      await updatePricelistItem(token, itemId, updatedItem);
      const newItems = items.map(i => i.id === itemId ? { ...i, [field]: editValue } : i);
      setItems(newItems);
      setFilteredItems(newItems);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error('update failed:', err);
    }

    setEditingCell(null);
    setEditValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCellBlur();
    if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  const handlePrint = () => window.print();

  const handleLogout = () => {
    setToken(null);
    navigate('/');
  };

  const renderEditableCell = (item, field) => {
    const isEditing = editingCell?.itemId === item.id && editingCell?.field === field;
    const value = item[field];

    return (
      <div className="editable-cell" onClick={() => !isEditing && handleCellClick(item.id, field, value)}>
        {isEditing ? (
          <input
            type="text"
            className="cell-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="cell-content">{value}</span>
        )}
      </div>
    );
  };

  const languageOptions = [
    { code: 'sv', name: 'Svenska', flag: 'https://storage.123fakturere.no/public/flags/SE.png' },
    { code: 'en', name: 'English', flag: 'https://storage.123fakturere.no/public/flags/GB.png' }
  ];

  const currentLang = languageOptions.find(l => l.code === language);

  const menuItems = [
    { icon: 'invoices', label: texts.invoices || 'Invoices', active: false },
    { icon: 'customers', label: texts.customers || 'Customers', active: false },
    { icon: 'business', label: texts.my_business || 'My Business', active: false },
    { icon: 'journal', label: texts.invoice_journal || 'Invoice Journal', active: false },
    { icon: 'pricelist', label: texts.price_list || 'Price List', active: true },
    { icon: 'multiple', label: texts.multiple_invoicing || 'Multiple Invoicing', active: false },
    { icon: 'unpaid', label: texts.unpaid_invoices || 'Unpaid Invoices', active: false },
    { icon: 'offer', label: texts.offer || 'Offer', active: false },
    { icon: 'inventory', label: texts.inventory_control || 'Inventory Control', active: false },
    { icon: 'member', label: texts.member_invoicing || 'Member Invoicing', active: false },
    { icon: 'import', label: texts.import_export || 'Import/Export', active: false },
  ];

  return (
    <div className="pricelist-wrapper">
      {showSuccess && <div className="success-toast">Updated successfully!</div>}

      <nav className="top-navbar no-print">
        <div className="user-section">
          <div className="user-avatar">
            <img src="https://ui-avatars.com/api/?name=John+Andre&background=2196f3&color=fff" alt="user" />
          </div>
          <div className="user-info">
            <div className="user-name">John Andre</div>
            <div className="user-company">Storfjord AS</div>
          </div>
        </div>

        <div className="nav-language">
          <button className="language-btn" onClick={() => setShowLangMenu(!showLangMenu)}>
            {currentLang.name}
            <img src={currentLang.flag} alt={currentLang.name} />
          </button>

          {showLangMenu && (
            <div className="language-dropdown">
              {languageOptions.map(lang => (
                <button key={lang.code} className="lang-option" onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}>
                  {lang.name}
                  <img src={lang.flag} alt={lang.name} />
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="pricelist-layout">
        <aside className="sidebar no-print">
          <div className="sidebar-title">{texts.menu_title || 'Menu'}</div>
          <div className="sidebar-menu">
            {menuItems.map((item, index) => (
              <button key={index} className={`menu-item ${item.active ? 'active' : ''}`}>
                <span className="menu-icon-svg">
                  <MenuIcon type={item.icon} />
                </span>
                {item.label}
              </button>
            ))}
            <button className="menu-item" onClick={handleLogout}>
              <span className="menu-icon-svg">
                <MenuIcon type="logout" />
              </span>
              {texts.log_out || 'Log out'}
            </button>
          </div>
        </aside>

        <div className="pricelist-main">
          <div className="pricelist-content">
            <div className="content-header-wrapper no-print">
              <div className="content-header">
                <div className="search-section">
                  <div className="search-box">
                    <input type="text" placeholder={texts.search_article || 'Search Article No...'} value={searchArticle} onChange={(e) => setSearchArticle(e.target.value)} />
                    <span className="search-icon">
                      <SearchIcon />
                    </span>
                  </div>
                  <div className="search-box">
                    <input type="text" placeholder={texts.search_product || 'Search Product...'} value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                    <span className="search-icon">
                      <SearchIcon />
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="action-btn">
                    <span className="btn-text">{texts.new_product || 'New Product'}</span>
                    <span className="btn-icon">
                      <PlusIcon />
                    </span>
                  </button>
                  <button className="action-btn" onClick={handlePrint}>
                    <span className="btn-text">{texts.print_list || 'Print List'}</span>
                    <span className="btn-icon">
                      <PrintIcon />
                    </span>
                  </button>
                  <button className="action-btn">
                    <span className="btn-text">{texts.advanced_mode || 'Advanced mode'}</span>
                    <span className="btn-icon">
                      <AdvancedIcon />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="scrollable-content">
              <div className="print-header">
                <h1>Price List - Storfjord AS</h1>
                <p>Generated: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="items-header">
                <div className="header-arrow"></div>
                <div className="header-content">
                  <div className="header-row">
                    <div className="header-field">
                      <span>{texts.article_no || 'Article No.'}</span>
                      <SortIcon color="#4FC3F7"/>
                    </div>

                    <div className="header-field">
                      <span>{texts.product_service || 'Product/Service'}</span>
                      <SortIcon color="#69F0AE"/> 
                    </div>

                    <div className="header-field hidden-mobile">
                      <span>{texts.in_price || 'In Price'}</span>
                    </div>

                    <div className="header-field">
                      <span>{texts.price || 'Price'}</span>
                    </div>

                    <div className="header-field hidden-tablet hidden-mobile">
                      <span>{texts.unit || 'Unit'}</span>
                    </div>

                    <div className="header-field hidden-tablet hidden-mobile">
                      <span>{texts.in_stock || 'In Stock'}</span>
                    </div>

                    <div className="header-field header-field-wide hidden-mobile">
                      <span>{texts.description || 'Description'}</span>
                    </div>
                  </div>
                </div>
                <div className="header-actions"></div>
              </div>

              <div className="items-list">
                {filteredItems.map((item) => (
                  <div key={item.id} className="item-card">
                    <div className="item-arrow no-print">
                      <ArrowIcon />
                    </div>

                    <div className="item-content">
                      <div className="item-row">
                        <div className="item-field">{renderEditableCell(item, 'article_no')}</div>
                        <div className="item-field">{renderEditableCell(item, 'product_service')}</div>
                        <div className="item-field hidden-mobile">{renderEditableCell(item, 'in_price')}</div>
                        <div className="item-field">{renderEditableCell(item, 'price')}</div>
                        <div className="item-field hidden-tablet hidden-mobile">{renderEditableCell(item, 'unit')}</div>
                        <div className="item-field hidden-tablet hidden-mobile">{renderEditableCell(item, 'in_stock')}</div>
                        <div className="item-field item-field-wide hidden-mobile">{renderEditableCell(item, 'description')}</div>
                      </div>
                    </div>

                    <div className="item-actions no-print">
                      <button className="action-menu-btn">
                        <MoreIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricelist;