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
  const { product_service, in_price, out_price, quantity, unit, discount, vat, total } = req.body;

  try {
    // added this cause user can change total, so recalcualte for protection (add )
    const computedTotal = (out_price * quantity) * (1 - discount / 100) * (1 + vat / 100);
    const result = await pool.query(
      `UPDATE pricelist_items 
       SET product_service = $1, in_price = $2, out_price = $3, 
           quantity = $4, unit = $5, discount = $6, vat = $7, total = $8
       WHERE id = $9
       RETURNING *`,
      [product_service, in_price, out_price, quantity, unit, discount, vat, computedTotal, id]
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

module.exports = { getAllItems, updateItem };