const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const itemRoutes = require('./routes/itemRoutes');
const itemTypeRoutes = require('./routes/itemTypeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Inventory Management ');
});

app.use('/items', itemRoutes);
app.use('/item-types', itemTypeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

