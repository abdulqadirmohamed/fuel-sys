const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());

// MySQL Database Connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fuel_management'
});

// Routes

// Item Routes
app.post('/items', async (req, res) => {
    const { item_name, item_description, open_meter_reading, close_meter_reading, volume, item_rate, evaporation_loss, receiving_tank, entry_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO items (item_name, item_description, open_meter_reading, close_meter_reading, volume, item_rate, evaporation_loss, receiving_tank, entry_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [item_name, item_description, open_meter_reading, close_meter_reading, volume, item_rate, evaporation_loss, receiving_tank, entry_date]);
        res.status(201).json({ id: result.insertId, item_name, item_description, open_meter_reading, close_meter_reading, volume, item_rate, evaporation_loss, receiving_tank, entry_date });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const [items] = await db.query('SELECT * FROM items');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Customer Routes
app.post('/customers', async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const [result] = await db.query('INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]);
        res.status(201).json({ id: result.insertId, name, email, phone, address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/customers', async (req, res) => {
    try {
        const [customers] = await db.query('SELECT * FROM customers');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Purchase Routes
app.post('/purchases', async (req, res) => {
    const { item_id, customer_id, purchase_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO purchases (item_id, customer_id, purchase_date) VALUES (?, ?, ?)', [item_id, customer_id, purchase_date]);
        res.status(201).json({ id: result.insertId, item_id, customer_id, purchase_date });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/purchases', async (req, res) => {
    try {
        const [purchases] = await db.query('SELECT * FROM purchases');
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Invoice Routes
app.post('/invoices', async (req, res) => {
    const { purchase_id, total_amount, paid_amount, due_amount, invoice_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO invoices (purchase_id, total_amount, paid_amount, due_amount, invoice_date) VALUES (?, ?, ?, ?, ?)', [purchase_id, total_amount, paid_amount, due_amount, invoice_date]);
        res.status(201).json({ id: result.insertId, purchase_id, total_amount, paid_amount, due_amount, invoice_date });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/invoices', async (req, res) => {
    try {
        const [invoices] = await db.query('SELECT * FROM invoices');
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cash Sales Routes
app.post('/cash_sales', async (req, res) => {
    const { item_id, volume_sold, rate, total_amount, sale_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO cash_sales (item_id, volume_sold, rate, total_amount, sale_date) VALUES (?, ?, ?, ?, ?)', [item_id, volume_sold, rate, total_amount, sale_date]);
        res.status(201).json({ id: result.insertId, item_id, volume_sold, rate, total_amount, sale_date });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/cash_sales', async (req, res) => {
    try {
        const [cash_sales] = await db.query('SELECT * FROM cash_sales');
        res.status(200).json(cash_sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server Listening
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
