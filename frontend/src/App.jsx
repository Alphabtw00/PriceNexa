import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Terms from './components/Terms';
import Pricelist from './components/Pricelist';
import './styles/global.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/terms" element={<Terms />} />
        <Route 
          path="/pricelist" 
          element={<Pricelist token={token} setToken={setToken} />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;