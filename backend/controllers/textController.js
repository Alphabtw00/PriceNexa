const pool = require('../config/db');

const getTexts = async (req, res) => {
  const { page, language } = req.params;

  if (!page || !language) {
    return res.status(400).json({ error: 'page and language required' });
  }

  try {
    const result = await pool.query(
      'SELECT key, value FROM translations WHERE page = $1 AND language = $2',
      [page, language]
    );

    const texts = {};
    result.rows.forEach(row => {
      texts[row.key] = row.value;
    });

    res.json(texts);

  } catch (error) {
    console.error('fetch texts error:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { getTexts };