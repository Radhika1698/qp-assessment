import express from 'express';
import bodyParser from 'body-parser';
import db from './common/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/**
 * Admin: Add a new grocery item into the system.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.post('/admin/grocery-items', (req, res) => {
    const { name, price, inventory } = req.body;
    const sql = 'INSERT INTO grocery_items (name, price, inventory) VALUES (?, ?, ?)';
    db.query(sql, [name, price, inventory], (err: any, result: { insertId: any; }) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Grocery item added successfully', id: result.insertId });
        }
    });
});

/**
 * Admin: View all the grocery items.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.get('/admin/grocery-items', (req, res) => {
    const sql = 'SELECT * FROM grocery_items';
    db.query(sql, (err: any, results: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

/**
 * Admin: Delete a grocery item.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.delete('/admin/grocery-items/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM grocery_items WHERE id = ?';
    db.query(sql, [id], (err: any, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.sendStatus(204);
        }
    });
});

/**
 * Admin: Update the details of a grocery item.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.put('/admin/grocery-items/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, inventory } = req.body;
    const sql = 'UPDATE grocery_items SET name = ?, price = ?, inventory = ? WHERE id = ?';
    db.query(sql, [name, price, inventory, id], (err: any, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.sendStatus(204);
        }
    });
});


/**
 * Admin: Increase the inventory level of a specific grocery item.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.put('/admin/grocery-items/:id/increase-inventory', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity provided' });
    }

    const sql = 'UPDATE grocery_items SET inventory = inventory + ? WHERE id = ?';
    db.query(sql, [quantity, id], (err: any, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.sendStatus(204);
        }
    });
});

/**
 * Admin: Decrease the inventory level of a specific grocery item.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.put('/user/grocery-items/:id/decrease-inventory', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity provided' });
    }

    const sql = 'UPDATE grocery_items SET inventory = inventory - ? WHERE id = ?';
    db.query(sql, [quantity, id], (err: any, result: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.sendStatus(204);
        }
    });
});


/**
 * User: View available grocery items.
 * Retrieves a list of available grocery items from the system.
 * @param req - The request object.
 * @param res - The response object.
 * @returns {void}
 */
app.get('/user/grocery-items', (req, res) => {
    const sql = 'SELECT * FROM grocery_items';
    db.query(sql, (err: any, results: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

/**
 * User: Book multiple grocery items in a single order.
 * Allows users to book multiple grocery items in a single order.
 * @param req - The request object containing the list of grocery items to book.
 * @param res - The response object.
 * @returns {void}
 */
app.post('/user/book-order', (req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid items provided' });
    }

    const placeholders = items.map(() => '(?,?,?)').join(',');
    const values = items.reduce((acc, item) => [...acc, item.id, item.quantity, item.price], []);
    const sql = `INSERT INTO orders (item_id, quantity, price) VALUES ${placeholders}`;

    db.query(sql, values, (err: any, result: { insertId: any; }) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Order booked successfully', orderId: result.insertId });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
