const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const textRoutes = require('./routes/textRoutes');
const pricelistRoutes = require('./routes/pricelistRoutes');

const app = express();
// default to 5000 if not custom provided
const PORT = process.env.PORT || 5000;

// let app use cors (all origins for now), if we make this bigger then we shall use custom origins only
app.use(cors());
// let app know req are json and to parse them auto (it does not do that by default)
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/texts', textRoutes);
app.use('/api/pricelist', pricelistRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'pricenexa backend running' });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});