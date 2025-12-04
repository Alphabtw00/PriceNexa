const pool = require('../config/db');

const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pricelist_items ORDER BY id'
    );

    res.json(result.rows);

  } catch (error) {
    console.error('fetch items error:', error);
    res.status(500).json({ error: 'server error' });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { article_no, product_service, in_price, price, unit, in_stock, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pricelist_items 
       SET article_no = $1, product_service = $2, in_price = $3, 
           price = $4, unit = $5, in_stock = $6, description = $7
       WHERE id = $8
       RETURNING *`,
      [article_no, product_service, in_price, price, unit, in_stock, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'item not found' });
    }

    res.json({
      message: 'item updated',
      item: result.rows[0]
    });

  } catch (error) {
    console.error('update item error:', error);
    res.status(500).json({ error: 'server error' });
  }
};

const searchItems = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM pricelist_items 
       WHERE article_no ILIKE $1 OR product_service ILIKE $1 
       ORDER BY id`,
      [`%${query}%`]
    );

    res.json(result.rows);

  } catch (error) {
    console.error('search error:', error);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { getAllItems, updateItem, searchItems };