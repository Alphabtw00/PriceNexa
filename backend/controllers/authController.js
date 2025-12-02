const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  try {
    const result = await pool.query(
        // we use $1 to secure from sql injection attack
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    //node returns json rows instead of straight object so we use result.rows.[0]
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'no user with that username' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'wrong password' });
    }

    // we make token with 24 hour expire
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'login successful',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { login };