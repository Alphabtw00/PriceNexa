const API_URL = '/api';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'login failed');
  }
  
  return response.json();
};


export const getTexts = async (page, language) => {
  const response = await fetch(`${API_URL}/texts/${page}/${language}`);
  
  if (!response.ok) {
    throw new Error('failed to fetch texts');
  }
  
  return response.json();
};


export const getPricelistItems = async (token) => {
  const response = await fetch(`${API_URL}/pricelist`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('failed to fetch items');
  }
  
  return response.json();
};


export const updatePricelistItem = async (token, id, data) => {
  const response = await fetch(`${API_URL}/pricelist/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('failed to update item');
  }
  
  return response.json();
};