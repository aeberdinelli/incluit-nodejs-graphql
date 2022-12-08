const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/products', (req, res) => {
    return res.send('List all products');
});

app.get('/products/:id', (req, res) => {
    return res.send(`Get product with id ${req.params.id}`);
});

app.post('/products', (req, res) => {
    return res.json(req.body);
});

app.put('/products/:id', (req, res) => {
    return res.send('Updating product with id: ' + req.params.id);
});

app.delete('/products/:id', (req, res) => {
    return res.send(`Deleting product with id ${req.params.id}`);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`))